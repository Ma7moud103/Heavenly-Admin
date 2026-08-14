import { useEffect } from 'react';
import { useAuthSupabaseStore } from '@/stores/auth/authSupabase.stroe';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const initializeAuth = useAuthSupabaseStore((state) => state.initializeAuth);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    initializeAuth().then((cleanup) => {
      unsubscribe = cleanup;
    });

    return () => {
      unsubscribe?.();
    };
  }, [initializeAuth]);

  return children;
};

export default AuthProvider;
