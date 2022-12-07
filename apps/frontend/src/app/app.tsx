import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const ScreenHome = React.lazy(() => import('@wkwkbudgetapp/screens/home'));

const ScreenDashboard = React.lazy(
  () => import('@wkwkbudgetapp/screens/dashboard')
);

const ScreenAuthLogin = React.lazy(
  () => import('@wkwkbudgetapp/screens/auth-login')
);

const ScreenAuthRegister = React.lazy(
  () => import('@wkwkbudgetapp/screens/auth-register')
);

export function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Masuk</Link>
        <Link to="/register">Daftar</Link>
        <button>Logout</button>
      </div>

      <React.Suspense fallback={<div>Tunggu ya...</div>}>
        <Routes>
          <Route path="/" element={<ScreenHome />} />
          <Route path="/dashboard" element={<ScreenDashboard />} />
          <Route path="/login" element={<ScreenAuthLogin />} />
          <Route path="/register" element={<ScreenAuthRegister />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
