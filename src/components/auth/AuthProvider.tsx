import { useEffect, type ReactNode } from 'react';
import { useAuth } from '../../stores/auth/authLogic.store';

interface IProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const initializeAuth = useAuth((state) => state.initializeAuth);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isMounted = true;

    initializeAuth().then((unsubscribe) => {
      if (isMounted) {
        cleanup = unsubscribe;
      } else {
        unsubscribe();
      }
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [initializeAuth]);

  return children;
};

export default AuthProvider;
