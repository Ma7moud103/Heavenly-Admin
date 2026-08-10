import { Navigate, Outlet } from 'react-router-dom';

interface IProps {
  isAuthenticated: boolean;
}

export function ProtectedLayout({ isAuthenticated }: IProps) {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
