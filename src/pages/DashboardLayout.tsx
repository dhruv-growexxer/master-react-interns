import { Outlet, Link } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
};
