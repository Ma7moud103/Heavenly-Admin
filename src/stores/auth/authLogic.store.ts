import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '@/services/supabase';

export enum EAuthEvent {
  SIGNED_IN = 'SIGNED_IN',
  SIGNED_OUT = 'SIGNED_OUT',
  PASSWORD_RECOVERY = 'PASSWORD_RECOVERY',
  TOKEN_REFRESHED = 'TOKEN_REFRESHED',
  USER_UPDATED = 'USER_UPDATED',
  INITIAL_SESSION = 'INITIAL_SESSION',
}

export enum EAuthFlow {
  AUTHENTICATED = 'authenticated',
  RECOVERY = 'recovery',
}
export type AuthFlow = EAuthFlow | null;

interface IAuthState {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authFlow: AuthFlow;
  initializeAuth: () => Promise<() => void>;
  signOut: () => Promise<void>;
}

const toSessionState = (session: Session | null, authFlow: AuthFlow) => ({
  session,
  user: session?.user ?? null,
  isAuthenticated: Boolean(session),
  authFlow: session ? authFlow : null,
});

export const useAuth = create<IAuthState>()((set, get) => ({
  ...toSessionState(null, null),
  isLoading: true,
  initializeAuth: async () => {
    let isActive = true;
    let initialSessionEventReceived = false;
    let sessionCheckFinished = false;

    const finishInitialisation = () => {
      if (isActive && initialSessionEventReceived && sessionCheckFinished) {
        set({ isLoading: false });
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isActive) return;

      if (event === EAuthEvent.PASSWORD_RECOVERY) {
        set(toSessionState(session, EAuthFlow.RECOVERY));
        return;
      }

      if (event === EAuthEvent.SIGNED_OUT) {
        set(toSessionState(null, null));
        return;
      }

      if (event === EAuthEvent.SIGNED_IN) {
        const authFlow = get().authFlow === EAuthFlow.RECOVERY ? EAuthFlow.RECOVERY : EAuthFlow.AUTHENTICATED;
        set(toSessionState(session, authFlow));
        return;
      }

      if (event === EAuthEvent.TOKEN_REFRESHED || event === EAuthEvent.USER_UPDATED) {
        const authFlow = get().authFlow === EAuthFlow.RECOVERY ? EAuthFlow.RECOVERY : EAuthFlow.AUTHENTICATED;
        set(toSessionState(session, authFlow));
        return;
      }

      if (event === EAuthEvent.INITIAL_SESSION) {
        initialSessionEventReceived = true;
        const authFlow = get().authFlow === EAuthFlow.RECOVERY ? EAuthFlow.RECOVERY : session ? EAuthFlow.AUTHENTICATED : null;
        set(toSessionState(session, authFlow));
        finishInitialisation();
      }
    });

    const { data } = await supabase.auth.getSession();

    if (isActive) {
      if (get().authFlow !== EAuthFlow.RECOVERY) {
        set(toSessionState(data.session, data.session ? EAuthFlow.AUTHENTICATED : null));
      }
      sessionCheckFinished = true;
      finishInitialisation();
    }

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  },
}));
