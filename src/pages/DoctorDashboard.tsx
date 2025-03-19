import React, { useState } from 'react';
import { Search, Home, Calendar, FileText, Users, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import router for navigation

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize router
  
  // Sample doctor data
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  };
  
  // Sample patient data
  const patients = [
    { id: 1, name: "John Smith", diagnosis: "Hypertension", lastVisit: "2025-03-15" },
    { id: 2, name: "Emily Davis", diagnosis: "Diabetes Type 2", lastVisit: "2025-03-12" },
    { id: 3, name: "Michael Brown", diagnosis: "Coronary Artery Disease", lastVisit: "2025-03-10" },
    { id: 4, name: "Jessica Wilson", diagnosis: "Arrhythmia", lastVisit: "2025-03-08" },
    { id: 5, name: "David Martinez", diagnosis: "Heart Failure", lastVisit: "2025-03-05" },
    { id: 6, name: "Sarah Thompson", diagnosis: "Hyperlipidemia", lastVisit: "2025-03-01" },
    { id: 7, name: "Robert Garcia", diagnosis: "Valve Disease", lastVisit: "2025-02-27" },
    { id: 8, name: "Lisa Anderson", diagnosis: "Cardiomyopathy", lastVisit: "2025-02-25" }
  ];
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigation items - Settings removed as requested
  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} /> },
    { name: 'View Appointments', icon: <Calendar size={20} /> },
    { name: 'View & Edit Prescriptions', icon: <FileText size={20} /> },
    { name: 'View All Patients', icon: <Users size={20} /> }
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear auth tokens or cookies here
    navigate('/'); // Redirect to landing page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} transition-all duration-300 fixed md:relative z-30 h-full`}>
        {/* Mobile sidebar toggle */}
        <div className="md:hidden absolute right-0 top-0 p-4">
          {isSidebarOpen && <X onClick={toggleSidebar} className="cursor-pointer" />}
        </div>
        
        {/* Sidebar content */}
        <div className="flex flex-col h-full">
          {/* Doctor info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {doctor.name.charAt(0)}
              </div>
              {isSidebarOpen && (
                <div className="flex-1 overflow-hidden">
                  <h2 className="text-lg font-semibold truncate">{doctor.name}</h2>
                  <p className="text-sm text-gray-500 truncate">{doctor.specialty}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    className={`flex items-center w-full px-4 py-3 ${activeTab === item.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab(item.name)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isSidebarOpen && <span>{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button 
              className="flex items-center text-red-500 w-full px-4 py-2 hover:bg-red-50 rounded"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4">
          <button onClick={toggleSidebar} className="mr-4 md:hidden">
            <Menu size={24} />
          </button>
          
          {/* Layout with three sections: left, center (search), right (profile) */}
          <div className="flex-1 flex items-center justify-between">
            {/* Left section - empty for balance */}
            <div className="w-1/4"></div>
            
            {/* Center section - search bar */}
            <div className="w-2/4 flex justify-center">
              <div className="w-full max-w-md relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            {/* Right section - profile only (notification bell removed) */}
            <div className="w-1/4 flex items-center justify-end">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img src="/api/placeholder/40/40" alt="Doctor profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'Dashboard' ? 'Dashboard' : activeTab}
            </h1>
            <p className="text-gray-500">Welcome back, Dr. Johnson</p>
          </div>
          
          {/* Render different content based on active tab */}
          {activeTab === 'Dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Only showing two boxes now (removed Pending Reports) */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-700">Today's Appointments</h3>
                <p className="text-3xl font-bold">5</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-700">Total Patients</h3>
                <p className="text-3xl font-bold">{patients.length}</p>
              </div>
            </div>
          )}
          
          {/* Patients list */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Patients</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{patient.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {patient.diagnosis}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No patients found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;