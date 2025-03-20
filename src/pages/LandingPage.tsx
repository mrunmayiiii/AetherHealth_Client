import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import { useNavigate } from 'react-router-dom'; // Import router for navigation

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate(); // Initialize router

  // Function to handle successful authentication
  const handleAuthSuccess = (userType: string) => {
    setShowAuthModal(false);
    
    // Redirect to appropriate dashboard based on user type
    if (userType === 'doctor') {
      navigate('/doctor-dashboard');
    } else {
      navigate('/dashboard'); // For future implementation
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-900">AETHER HEALTH</span>
            </div>
            <div className="hidden md:flex space-x-1 text-xlg">
              {[ 'About Us', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition duration-150"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="px-4 py-2 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition duration-150"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-150"
              >
                Sign Up
              </button>
            </div>
            <div className="md:hidden">
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/new.png')",
            backgroundPosition: "center",
            filter: "brightness(0.6)"
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-3/5">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Take Control of Your Health Journey
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Monitor, manage, and improve your health outcomes with personalized tracking and insights.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-150"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5 transition duration-150"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose HealthTrack</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Evidence-based resources and tools to help you understand and manage chronic conditions effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition duration-300">
            <div className="h-48 overflow-hidden">
              <img
                src="/api/placeholder/800/400"
                alt="Doctor with stethoscope"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
                EDUCATION
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Understanding Chronic Health Conditions
              </h3>
              <p className="text-gray-600 mb-4">
                Learn about common chronic diseases, risk factors, and treatment approaches backed by scientific research.
              </p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition duration-300">
            <div className="h-48 overflow-hidden">
              <img
                src="/api/placeholder/800/400"
                alt="Medical equipment"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
                IMPACT
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Health and Economic Insights
              </h3>
              <p className="text-gray-600 mb-4">
                Explore the economic impact of chronic diseases and learn how preventive care can reduce healthcare costs.
              </p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition duration-300">
            <div className="h-48 overflow-hidden">
              <img
                src="/api/placeholder/800/400"
                alt="Data analytics"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
                DATA
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Personal Health Analytics
              </h3>
              <p className="text-gray-600 mb-4">
                Track your health metrics over time with intuitive visualizations and receive personalized insights.
              </p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">
                  "HealthTrack has transformed how I manage my diabetes. The tracking features and reminders have helped me maintain better control of my blood sugar levels."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">User {i}</p>
                    <p className="text-sm text-gray-500">HealthTrack member</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitch={(mode: "login" | "signup") => setAuthMode(mode)}
          onSuccess={handleAuthSuccess}
        />      
      )}
    </div>
  );
};

export default LandingPage;