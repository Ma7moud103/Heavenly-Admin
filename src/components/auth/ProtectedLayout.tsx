import { Navigate, Outlet } from 'react-router-dom';
import { LoadingPage } from '@/pages/LoadingPage';
import { EAuthFlow, useAuth } from '@/stores/auth/authLogic.store';

export function ProtectedLayout() {
  const { isAuthenticated, isLoading, authFlow } = useAuth();

  if (isLoading) return <LoadingPage />;

  if (isAuthenticated && authFlow === EAuthFlow.AUTHENTICATED) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
