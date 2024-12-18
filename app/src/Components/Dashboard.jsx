import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Boxes as BoxesIcon,
  FileText, 
  Settings, 
  Bell,
  ChevronDown,
  Search,
  PieChart,
  CreditCard,
  Activity,
  LayoutGrid,
  Briefcase,
  Truck
} from 'lucide-react';

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  
  const notifications = [
    { id: 1, text: "New vendor application received", isNew: true },
    { id: 2, text: "Contract renewal due in 7 days", isNew: true },
    { id: 3, text: "Payment processed for Vendor #1234", isNew: false }
  ];

  const stats = [
    { title: "Active Vendors", value: "234", change: "+12%", trend: "up" },
    { title: "Pending Approvals", value: "18", change: "-3%", trend: "down" },
    { title: "Total Contracts", value: "543", change: "+5%", trend: "up" },
    { title: "Monthly Spend", value: "$125K", change: "+8%", trend: "up" }
  ];

  const recentActivity = [
    {
      icon: <Activity className="text-blue-500" size={24} />,
      title: 'New Vendor Onboarded',
      description: 'Tech Innovations Inc. added to vendor list',
      time: '2 mins ago'
    },
    {
      icon: <PieChart className="text-orange-500" size={24} />,
      title: 'Contract Review',
      description: 'Annual contract with GlobalSupply reviewed',
      time: '1 hour ago'
    },
    {
      icon: <FileText className="text-green-500" size={24} />,
      title: 'Report Generated',
      description: 'Q2 Vendor Performance Report',
      time: '3 hours ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <h1 className="text-2xl font-bold text-blue-600">VendorHub</h1>

          {/* Search Bar */}
          <div className="relative ml-6">
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          {/* Notifications */}
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              2
            </span>
          </div>

          {/* Profile Section */}
          <div className="relative">
            <div
              className="flex items-center gap-x-3 cursor-pointer"
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
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    // Add your logout logic here
                    navigate("/login");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white h-screen shadow-sm pt-6">
          <nav className="space-y-1 px-3">
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-600"
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/people"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <Users className="mr-3 h-5 w-5" />
              People
            </Link>
            <Link
              to="/sample"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <Users className="mr-3 h-5 w-5" />
              Discount
            </Link>
            <Link
              to="/vendors"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <Users className="mr-3 h-5 w-5" />
              Vendors
            </Link>
            <Link
              to="/products"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <BoxesIcon className="mr-3 h-5 w-5" />
              Products
            </Link>
            <Link
              to="/contracts"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <FileText className="mr-3 h-5 w-5" />
              Contracts
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">
                  {stat.title}
                </h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <span
                    className={`ml-2 text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Notifications
              </h2>
              <div className="mt-6 flow-root">
                <ul className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.text}
                          </p>
                        </div>
                        {notification.isNew && (
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            {" "}
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>{" "}
            <div className="space-y-4">
              {" "}
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-b-0"
                >
                  {" "}
                  <div className="flex items-center space-x-4">
                    {" "}
                    {activity.icon}{" "}
                    <div>
                      {" "}
                      <div className="font-medium text-sm">
                        {activity.title}
                      </div>{" "}
                      <div className="text-xs text-gray-500">
                        {activity.description}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="text-xs text-gray-500">{activity.time}</div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
