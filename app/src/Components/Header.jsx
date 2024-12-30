import { useState, useEffect } from 'react';
import { 
  Search,
  Menu,
  Bell,
  PlusCircle,
  ChevronDown,
  Settings,
  UserCircle,
  LogOut,
  Building,
  Shield,
  ClipboardCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NotificationPanel } from './NotificationPanel';
import { theme } from '../assets/theme';
import { useUser } from '../context/userContext';

export const Header = ({ toggleMobileMenu, isCollapsed }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useUser();
  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    setIsProfileOpen(false);
    console.log(`${user?.firstName} ${user?.lastName} has logged out`);
    logout();
    navigate('/login');
  };

  // Function to get the full name
  // Example of how to use the user data in your existing functions:
const getFullName = () => {
  if (!user) return 'Guest';
  return user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : 'Guest';
};

  // Function to get user identifier or company name
  const getUserIdentifier = () => {
    if (!user) return 'Guest';
    
    // Check if user has an _id
    if (!user?._id) {
      // Fallback to company name if available
      return user?.company || 'Pending';
    }

    // Return role-specific identifier
    switch (user.role) {
      case 'vendor':
        return `VID: ${user._id}`;
      case 'admin':
        return `AID: ${user._id}`;
      case 'approver':
        return `APID: ${user._id}`;
      default:
        return `UID: ${user._id}`;
    }
  };

  // Function to get role-specific action button
  const getActionButton = () => {
    if (!user) return null;

    const buttonProps = {
      vendor: {
        text: 'New Project',
        icon: <PlusCircle size={20} />,
        action: () => navigate('/new-project')
      },
      admin: {
        text: 'Manage Users',
        icon: <UserCircle size={20} />,
        action: () => navigate('/manage-users')
      },
      approver: {
        text: 'Review Requests',
        icon: <ClipboardCheck size={20} />,
        action: () => navigate('/review-requests')
      }
    }[user.role];

    if (!buttonProps) return null;

    return (
      <button
        onClick={buttonProps.action}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
        style={{ 
          background: theme.colors.primary,
          color: theme.colors.cardBg
        }}
      >
        {buttonProps.icon}
        <span>{buttonProps.text}</span>
      </button>
    );
  };

  // Get role-specific icon for the profile
  const getRoleIcon = () => {
    switch (user?.role) {
      case 'vendor':
        return <Building size={16} className="text-gray-500" />;
      case 'admin':
        return <Shield size={16} className="text-gray-500" />;
      case 'approver':
        return <ClipboardCheck size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 w-full border-b transition-all duration-300
                ${isCollapsed ? "lg:pl-16" : "lg:pl-72"}`}
      style={{ 
        background: theme.colors.cardBg,
        borderColor: theme.colors.border
      }}
    >
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-12 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: theme.colors.border,
                '--tw-ring-color': `${theme.colors.primary}20`
              }}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {getActionButton()}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <Bell size={24} className="text-gray-600" />
              <span
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs text-white flex items-center justify-center"
                style={{ background: theme.colors.accent }}
              >
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <NotificationPanel
                onClose={() => setIsNotificationsOpen(false)}
              />
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
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium" style={{ color: theme.colors.text }}>
                    {getFullName()}
                  </p>
                  {getRoleIcon()}
                </div>
                <p className="text-xs" style={{ color: theme.colors.textLight }}>
                  {getUserIdentifier()}
                </p>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isProfileOpen ? "transform rotate-180" : ""
                }`}
                style={{ color: theme.colors.textLight }}
              />
            </div>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10"
                   style={{ background: theme.colors.cardBg }}>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  style={{ color: theme.colors.text }}
                >
                  <UserCircle size={16} />
                  Your Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  style={{ color: theme.colors.text }}
                >
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  style={{ color: theme.colors.text }}
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;