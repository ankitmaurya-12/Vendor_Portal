import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  MessageCircle,
  ClipboardList,
  Calendar,
  Activity,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
  Sun,
  Moon,
  Percent,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { theme } from '../assets/theme';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = {
    overview: [
      { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { title: 'Discount', icon: Percent, path: '/sample' },
      { title: 'Products', icon: ShoppingBag, path: '/products' },
      { title: 'Messages', icon: MessageCircle, path: '/messages', badge: 2 },
      { title: 'Order', icon: ClipboardList, path: '/order' },
      { title: 'Calendar', icon: Calendar, path: '/calendar' },
      { title: 'Activity', icon: Activity, path: '/activity' },
      { title: 'Static', icon: BarChart2, path: '/static' },
    ],
    account: [
      { title: 'Chat', icon: MessageSquare, path: '/chat' },
      { title: 'Settings', icon: Settings, path: '/settings' },
      { title: 'Log out', icon: LogOut, path: '/login' },
    ],
  };

  const NavLink = ({ item }) => (
    <Link
      to={item.path}
      className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
    >
      <item.icon className="w-5 h-5" />
      {!isCollapsed && (
        <>
          <span className="text-sm">{item.title}</span>
          {item.badge && (
            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-100 
                 transform transition-all duration-300 lg:translate-x-0 flex flex-col
                 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
                 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="flex-shrink-0 px-4 py-5 border-b border-gray-100 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold" style={{ color: theme.colors.text }}>
                Inteliwaves
              </h1>
              <p className="text-xs" style={{ color: theme.colors.textLight }}>
                Technology
              </p>
            </div>
          </div>
        )}
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 hidden lg:block"
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-gray-500" />
          ) : (
            <ChevronLeft size={20} className="text-gray-500" />
          )}
        </button>
      </div>

     {/* Navigation Sections with Flexible Layout */}
     <div className="flex flex-col flex-1 min-h-0"> {/* Add min-h-0 to allow flex child to shrink */}
        {/* Overview Section - Scrollable */}
        <div className="flex-1 min-h-0 px-2 py-6"> {/* Add min-h-0 to allow scrolling */}
          {!isCollapsed && (
            <h2 className="px-2 mb-3 text-xs font-semibold uppercase sticky top-0 bg-white" style={{ color: theme.colors.textLight }}>
              Overview
            </h2>
          )}
          <nav className="space-y-1 overflow-y-auto h-full"> {/* Make nav scrollable */}
            {menuItems.overview.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </nav>
        </div>

        {/* Account Section - Fixed at bottom */}
        <div className="flex-shrink-0 px-2 py-6 border-t border-gray-100">
          {!isCollapsed && (
            <h2 className="px-2 mb-3 text-xs font-semibold uppercase" style={{ color: theme.colors.textLight }}>
              Account
            </h2>
          )}
          <nav className="space-y-1">
            {menuItems.account.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </nav>
        </div>
      </div>
      

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="p-4 border-t" style={{ borderColor: theme.colors.border }}>
          {/* Theme Toggle and User Profile remain the same... */}
        </div>
      )}
      
      {/* Mobile Close Button */}
      <button
        onClick={() => setIsMobileOpen(false)}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
      >
        <X size={20} className="text-gray-500" />
      </button>
    </aside>
  );
};
export default Sidebar;
