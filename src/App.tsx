import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import BmiCalculator from './components/BmiCalculator';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorDashboard from './pages/DoctorDashboard';

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
                                <Dashboard showBmiCalculator={true} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/appointments"
                        element={
                            <ProtectedRoute>
                                <Dashboard showAppointments={true} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/medications"
                        element={
                            <ProtectedRoute>
                                <Dashboard showMedications={true} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile-info"
                        element={
                            <ProtectedRoute>
                                <Dashboard showProfileInfo={true} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/doctor-dashboard"
                        element={
                            <ProtectedRoute>
                                <DoctorDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;