import React, { useState } from 'react';
import { Activity, Heart, TrendingUp, LogOut, User, Pill, History, FileText, Settings, Bell, Calendar, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import BmiCalculator from '../components/BmiCalculator';
import AppointmentsPage from './Appointmentspage';
import MedicationsPage from './MedicationsPage';
import ProfileInfoPage from './ProfileInfoPage';

const mockData = {
  vitals: [
    { date: 'Jan', bloodPressure: 120, bloodSugar: 95 },
    { date: 'Feb', bloodPressure: 118, bloodSugar: 92 },
    { date: 'Mar', bloodPressure: 122, bloodSugar: 98 },
    { date: 'Apr', bloodPressure: 119, bloodSugar: 94 },
    { date: 'May', bloodPressure: 117, bloodSugar: 90 },
    { date: 'Jun', bloodPressure: 121, bloodSugar: 93 },
  ],
  upcomingAppointments: [
    { id: 1, title: 'Dr. Smith - Checkup', date: 'Mar 25, 2025', time: '10:00 AM' },
    { id: 2, title: 'Lab Work', date: 'Apr 02, 2025', time: '9:30 AM' },
  ],
  medications: [
    { id: 1, name: 'Metformin', dosage: '500mg', schedule: 'Twice daily' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily' },
  ]
};

interface DashboardProps {
  showBmiCalculator?: boolean;
  showAppointments?: boolean;
  showMedications?: boolean;
  showProfileInfo?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  showBmiCalculator = false, 
  showAppointments = false,
  showMedications = false,
  showProfileInfo = false
}) => {
  const [user] = useState({ fullName: 'Demo User' });
  const navigate = useNavigate();
  
  const logout = () => {
    console.log('Logging out');
    // Add logout functionality here
  };

  const renderMainContent = () => {
    if (showBmiCalculator) {
      return (
        <div className="max-w-7xl mx-auto p-6">
          <BmiCalculator />
        </div>
      );
    }

    if (showAppointments) {
      return (
        <div className="max-w-7xl mx-auto p-6">
          <AppointmentsPage />
        </div>
      );
    }

    if (showMedications) {
      return <MedicationsPage />;
    }

    if (showProfileInfo) {
      return <ProfileInfoPage />;
    }

    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg mb-6 overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white">Welcome back, {user.fullName}</h2>
            <p className="mt-2 text-blue-100">Your health journey is on track. Keep up the good work!</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: 'Blood Pressure', value: '122/80', unit: 'mmHg', change: '-2%', icon: Heart, color: 'text-blue-600' },
            { label: 'Heart Rate', value: '98', unit: 'mg/dL', change: '+3%', icon: Activity, color: 'text-purple-600' },
            { label: 'Weight', value: '165', unit: 'lbs', change: '-1.2%', icon: TrendingUp, color: 'text-green-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="ml-2 text-sm text-gray-600">{stat.unit}</p>
                  </div>
                  <div className="mt-1 flex items-center">
                    <span className={`text-xs font-medium ${stat.change.startsWith('-') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last reading
                    </span>
                  </div>
                </div>
                <div className={`bg-gray-100 rounded-full p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Health Trends</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">6 Months</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">1 Year</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.vitals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="bloodPressure" 
                    stroke="#2563EB" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Blood Pressure" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bloodSugar" 
                    stroke="#7C3AED" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Blood Sugar" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const navigationItems = [
    { 
      icon: Activity, 
      label: 'Dashboard', 
      path: '/dashboard',
      active: !showBmiCalculator && !showAppointments && !showMedications && !showProfileInfo
    },
    { 
      icon: Calendar, 
      label: 'Appointments', 
      path: '/appointments',
      active: showAppointments
    },
    { 
      icon: Pill, 
      label: 'Medications', 
      path: '/medications',
      active: showMedications
    },
    
    { 
      icon: Heart, 
      label: 'My Profile', 
      path: '/profile-info',
      active: showProfileInfo
    },
    { icon: User, label: 'Personel Info', path: '/personalinfoy' },
    { icon: History, label: 'Health History', path: '/history' },
    { icon: FileText, label: 'AI recommendations', path: '/recommendations' },
    { 
      icon: Calculator, 
      label: 'BMI Calculator', 
      path: '/bmi',
      active: showBmiCalculator
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md min-h-screen">
        <div className="h-full flex flex-col">
          {/* User info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {user.fullName[0]}
              </div>
              <div>

                <p className="font-medium text-gray-900">{user.fullName}</p>
                <p className="text-sm text-gray-500">Patient</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {navigationItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium ${
                  item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="flex items-center space-x-3 text-red-600 hover:bg-red-50 w-full p-3 rounded-lg font-medium"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-bold text-gray-900">
                {showBmiCalculator ? 'BMI Calculator' : 
                 showAppointments ? 'Appointments' : 
                 showMedications ? 'Medications' :
                 showProfileInfo ? 'Personal Information' : 'Dashboard'}
              </h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Dashboard;