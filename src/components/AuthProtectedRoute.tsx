import { useAuthSupabaseStore } from '@/stores/auth/authSupabase.stroe';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthProtectedRouteGuard() {
  const isAuthenticated = useAuthSupabaseStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
