import './styles.css';
import TodoList from './components/Todo/TodoList';
import { ConfigProvider } from 'antd';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4361ee',
          borderRadius: 8,
        },
      }}
    >
      <TodoList />
    </ConfigProvider>
  );
}

// import React, { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
// // import { About, Home } from './pages';

// const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
// const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));

// const App = () => {
//   return (
//     <>
//       <Router>
//         <nav>
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/about">About</NavLink>
//         </nav>
//         <Suspense fallback={<div>Loading page...</div>}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//           </Routes>
//         </Suspense>
//       </Router>
//     </>
//   );
// };

// export default App;
