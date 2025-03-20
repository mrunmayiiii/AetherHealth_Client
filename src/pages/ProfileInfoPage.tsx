import React, { useState } from 'react';
import { Save, Edit2 } from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

const ProfileInfoPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Demo User',
    email: 'demo@example.com',
    password: '********'
  });

  const [tempInfo, setTempInfo] = useState<UserInfo>(userInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setTempInfo(userInfo);
  };

  const handleSave = () => {
    setUserInfo(tempInfo);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={tempInfo.name}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-900">{userInfo.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={tempInfo.email}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-900">{userInfo.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            {isEditing ? (
              <input
                type="password"
                id="password"
                name="password"
                value={tempInfo.password}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            ) : (
              <p className="text-gray-900">{userInfo.password}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoPage;