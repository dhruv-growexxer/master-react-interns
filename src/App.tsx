import './styles.css';
import Components from './components';
import { ThemeProvider } from './contexts';
import { ThemeSwitcher } from './components/Theme';
import { BrowserRouter as Router, Link, Route, Routes, NavLink } from 'react-router-dom';
import { Home, About, UserProfile, DashboardLayout, Dashboard, AdminRoute, Login } from './pages';
import Navigation from './components/Navigation';

export default function App() {
  //   return (
  //     <div className="App">
  //       <Components />
  //     </div>
  //   );
  //   return (
  //     <div className="App">
  //       <ThemeProvider>
  //         <Components />
  //         <ThemeSwitcher />
  //       </ThemeProvider>
  //     </div>
  //   );
  return (
    <Router>
      <Navigation />
      <Routes>
        {/* Normal Route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        {/* Dynamic Route */}
        <Route path="/user/:id" element={<UserProfile />} />
        {/* Navigate Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Nested Route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<>Hello this is my dashboard layout</>} />
          <Route path="settings" element={<>Hello this is my dashboard settings</>} />
        </Route>
        {/* Protected Route */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<>Hello this is my protected route</>} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}
