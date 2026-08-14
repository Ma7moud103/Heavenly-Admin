import { useAuthSupabaseStore } from '@/stores/auth/authSupabase.stroe';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedLayout() {
  const isAuthenticated = useAuthSupabaseStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
