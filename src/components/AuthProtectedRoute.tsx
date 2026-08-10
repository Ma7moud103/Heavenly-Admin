import { Navigate, Outlet } from 'react-router-dom';

interface IProps {
  isAuthenticated: boolean;
}

export function AuthProtectedRouteGuard({ isAuthenticated }: IProps) {
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
}
