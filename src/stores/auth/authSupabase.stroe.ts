import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '@/services/supabase';

import type { NavigateFunction } from 'react-router-dom';
interface IPass {
  password: string;
  confirm_password: string;
}
interface IAuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isPasswordRecovery: boolean;

  initializeAuth: () => Promise<() => void>;
  handleLogout: (navigate: NavigateFunction) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: IPass) => Promise<void>;
}

export const useAuthSupabaseStore = create<IAuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  isPasswordRecovery: false,

  forgotPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      console.log('Forgot password failed:', error);
      throw error;
    }
  },
  resetPassword: async (data) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      console.error('Update password failed:', error);
      throw error;
    }
    set({
      isPasswordRecovery: false,
    });
  },

  handleLogout: async (navigate) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout failed:', error);
      return;
    }

    navigate('/login');

    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  initializeAuth: async () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AUTH EVENT:', event);

      if (event === 'PASSWORD_RECOVERY') {
        set({
          isPasswordRecovery: true,
          session,
          user: session?.user ?? null,
          isAuthenticated: !!session,
        });

        return;
      }
      set({
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session,
      });
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session?.user,
      isLoading: false,
    });

    return () => {
      subscription.unsubscribe();
    };
  },
}));
