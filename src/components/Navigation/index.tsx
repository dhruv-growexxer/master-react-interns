import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from './constants';

function Navigation() {
  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav>
      {NAV_ITEMS.map(({ path, label }) => (
        <NavLink key={path} to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
