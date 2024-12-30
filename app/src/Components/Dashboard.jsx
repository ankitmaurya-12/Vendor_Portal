import { useState } from 'react';
import { 
  PieChart, 
  Activity, 
  ArrowUp, 
  ArrowDown, 
  Users, 
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Header from './Header';
import Sidebar from './SideBar';
import { theme } from '../assets/theme';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$54,239',
      change: '+14.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Users',
      value: '2,435',
      change: '+5.4%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Conversion Rate',
      value: '4.3%',
      change: '-2.1%',
      trend: 'down',
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg. Order Value',
      value: '$89.54',
      change: '+8.7%',
      trend: 'up',
      icon: PieChart,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      name: 'Sarah Johnson',
      amount: '$234.50',
      status: 'completed',
      date: '2 min ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      amount: '$890.00',
      status: 'pending',
      date: '15 min ago'
    },
    {
      id: 3,
      name: 'Emily Parker',
      amount: '$125.99',
      status: 'completed',
      date: '1 hour ago'
    },
    {
      id: 4,
      name: 'David Wilson',
      amount: '$567.80',
      status: 'failed',
      date: '2 hours ago'
    }
  ];

  const topProducts = [
    {
      id: 1,
      name: 'Wireless Earbuds',
      sales: 892,
      revenue: '$23,456',
      growth: '+12.5%'
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      sales: 645,
      revenue: '$18,902',
      growth: '+8.3%'
    },
    {
      id: 3,
      name: 'Laptop Stand',
      sales: 421,
      revenue: '$12,345',
      growth: '+15.7%'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                <button className="text-sm text-[#059B9A] hover:text-[#048887]">View All</button>
              </div>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {transaction.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : transaction.status === 'pending' ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{transaction.name}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{transaction.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
                <button className="text-sm text-[#059B9A] hover:text-[#048887]">View Report</button>
              </div>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-[#059B9A]/10 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-[#059B9A]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{product.revenue}</p>
                      <p className="text-xs text-green-500">{product.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Activity Timeline</h2>
            <button className="text-sm text-[#059B9A] hover:text-[#048887]">View All Activity</button>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative pl-10">
                  <div className="absolute left-0 top-2 h-8 w-8 rounded-full bg-[#059B9A]/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-[#059B9A]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">New milestone reached</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      The project "Mobile App Redesign" has reached its first milestone.
                    </p>
                    <span className="text-xs text-gray-400 mt-2 block">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;