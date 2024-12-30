import { Bell, X, Check, Clock, AlertCircle } from 'lucide-react';

export const NotificationPanel = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Project Approved',
      message: 'Your project "Website Redesign" has been approved',
      time: '2 min ago',
      icon: Check,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'pending',
      title: 'Meeting Reminder',
      message: 'Team meeting starts in 30 minutes',
      time: '30 min ago',
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      id: 3,
      type: 'alert',
      title: 'System Update',
      message: 'Important security update required',
      time: '1 hour ago',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex gap-4">
              <div className={`p-2 rounded-xl ${notification.bgColor}`}>
                <notification.icon size={20} className={notification.color} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {notification.message}
                </p>
                <span className="text-xs text-gray-400 mt-2 block">
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 text-center border-t border-gray-200">
        <button className="text-sm text-[#059B9A] hover:text-[#048887] font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );
};