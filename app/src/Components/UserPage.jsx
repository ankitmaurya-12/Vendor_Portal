import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import { theme } from '../assets/theme';
import { Camera, Save } from 'lucide-react';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch user details from the backend API
    axios.get('/api/user').then(response => {
      setUser(response.data);
      setFormData(response.data);
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save changes to backend
    axios.put('/api/users', formData)
      .then(() => {
        setUser(formData);
        setIsEditing(false);
      })
      .catch(error => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        setIsMobileOpen={setIsMobileMenuOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <Header 
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isCollapsed={isCollapsed}
      />

      {/* Main Content */}
      <main className={`pt-24 p-6 transition-all duration-300
                     ${isCollapsed ? 'lg:pl-16' : 'lg:pl-72'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Profile Settings</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-[#059B9A] hover:text-[#048887]"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {user ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Picture Section */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <img
                        src={user.profilePic || "/api/placeholder/96/96"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 p-2 bg-[#059B9A] rounded-full text-white cursor-pointer hover:bg-[#048887] transition-colors">
                          <Camera size={16} />
                          <input type="file" className="hidden" />
                        </label>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{`${user.fname} ${user.lname}`}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-[#059B9A]/20 
                                focus:border-[#059B9A] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-[#059B9A]/20 
                                focus:border-[#059B9A] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-[#059B9A]/20 
                                focus:border-[#059B9A] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-[#059B9A]/20 
                                focus:border-[#059B9A] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-[#059B9A]/20 
                                focus:border-[#059B9A] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-[#059B9A]/20 
                                focus:border-[#059B9A] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    {isEditing && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Change Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                  focus:outline-none focus:ring-2 focus:ring-[#059B9A]/20 
                                  focus:border-[#059B9A]"
                        />
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-6">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#059B9A] 
                                text-white rounded-xl hover:bg-[#048887] transition-colors"
                      >
                        <Save size={20} />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#059B9A]"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPage;