<<<<<<< HEAD
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LandingPage from './pages/LandingPage'; 
import Dashboard from './pages/Dashboard'; 
import BmiCalculator from './components/BmiCalculator'; 
import AuthProvider from './contexts/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute';  

function App() {   
  return (     
    <Router>       
      <AuthProvider>         
        <Routes>           
          <Route path="/" element={<LandingPage />} />           
          <Route             
            path="/dashboard"             
            element={               
              <ProtectedRoute>                 
                <Dashboard />               
              </ProtectedRoute>             
            }           
          />           
          <Route             
            path="/bmi"             
            element={               
              <ProtectedRoute>                 
                <div className="min-h-screen bg-gray-50">                   
                  <Dashboard showBmiCalculator={true} />                 
                </div>               
              </ProtectedRoute>             
            }           
          />           
          <Route             
            path="/appointments"             
            element={               
              <ProtectedRoute>                 
                <div className="min-h-screen bg-gray-50">                   
                  <Dashboard showAppointments={true} />                 
                </div>               
              </ProtectedRoute>             
            }           
          />           
          <Route             
            path="/medications"             
            element={               
              <ProtectedRoute>                 
                <div className="min-h-screen bg-gray-50">                   
                  <Dashboard showMedications={true} />                 
                </div>               
              </ProtectedRoute>             
            }           
          />           
          <Route             
            path="/profile-info"             
            element={               
              <ProtectedRoute>                 
                <div className="min-h-screen bg-gray-50">                   
                  <Dashboard showProfileInfo={true} />                 
                </div>               
              </ProtectedRoute>             
            }           
          />         
        </Routes>       
      </AuthProvider>     
    </Router>   
  ); 
}  
=======
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
>>>>>>> b175b5a407da7504707b85a39083805c77658183

export default App;
