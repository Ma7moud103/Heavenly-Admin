import { Navigate, Outlet } from 'react-router-dom';
import { LoadingPage } from '@/pages/LoadingPage';
import { EAuthFlow, useAuth } from '@/stores/auth/authLogic.store';

export function AuthProtectedRouteGuard() {
  const { isAuthenticated, isLoading, authFlow } = useAuth();

  if (isLoading) return <LoadingPage />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (authFlow === EAuthFlow.RECOVERY) {
    return <Navigate to="/reset-password" replace />;
  }

  return <Outlet />;
}
