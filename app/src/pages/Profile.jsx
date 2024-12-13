// import { useState } from 'react';
import { Header } from '../Components/Header';
import { User, Mail, Phone, Building, Calendar, Settings, Edit2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Profile View Page
export const Profile = () => {
  const navigate = useNavigate();
  
  // Mock user data - replace with actual user data from your state management
  const user = {
    UserID: 12345,
    fname: "John",
    lname: "Doe",
    company: "Tech Corp",
    email: "john.doe@example.com",
    PhoneNumber: "1234567890",
    role: "Vendor",
    Status: "Active",
    CreatedAt: "2024-01-01",
    UpdatedAt: "2024-03-15"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <button
              onClick={() => navigate('/profile/edit')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{user.fname} {user.lname}</h2>
                    <p className="text-gray-500">{user.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.Status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.Status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{user.PhoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{user.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">{user.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">{new Date(user.CreatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Settings className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(user.UpdatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};