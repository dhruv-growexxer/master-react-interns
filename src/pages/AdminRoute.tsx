import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute = () => {
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
