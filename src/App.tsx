import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AuthProvider from './context/AuthContext';  // ✅ Import correctly

function App() {
  return (
    <Router> {/* ✅ Wrap everything inside `<Router>` */}
      <AuthProvider>  {/* ✅ Now `useNavigate` works */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
