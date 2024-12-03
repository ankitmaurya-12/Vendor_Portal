import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, ChevronDown, Search, ShieldCheckIcon } from 'lucide-react';

export const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: "New vendor application received", isNew: true },
    { id: 2, text: "Contract renewal due in 7 days", isNew: true },
    { id: 3, text: "Payment processed for Vendor #1234", isNew: false }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add your search logic here
  };

  // Click outside to close profile dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between fixed w-full top-0 z-10">
      <div className="flex items-center gap-x-4">
      <h1 className="flex items-center ml-0 text-2xl font-bold text-blue-600">
      <Link to="/dashboard" className="flex items-center">
        <ShieldCheckIcon className="w-7 h-7 text-blue-600 mr-2" />
        VendorHub
        </Link>
        </h1>

        
        <div className="relative ml-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search vendors..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        {/* Notifications */}
        <div className="relative group">
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
          {notifications.filter(n => n.isNew).length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {notifications.filter(n => n.isNew).length}
            </span>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative profile-dropdown">
          <div 
            className="flex items-center gap-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img
              src="/api/placeholder/40/40"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
          </div>
          
          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button 
                onClick={() => navigate('/profile')} 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Your Profile
              </button>
              <button 
                onClick={() => navigate('/settings')} 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Settings
              </button>
              <button 
                onClick={() => {
                  // Add your logout logic here
                  navigate('/login');
                }} 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// export default Header;