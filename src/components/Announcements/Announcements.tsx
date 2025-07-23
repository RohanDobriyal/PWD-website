import React from 'react';
import { AlertCircle, Info, CheckCircle, Clock } from 'lucide-react';
import { Announcement } from '../../types';

interface AnnouncementsProps {
  announcements: Announcement[];
  onMarkAsRead: (id: string) => void;
}

export const Announcements: React.FC<AnnouncementsProps> = ({ announcements, onMarkAsRead }) => {
  const getPriorityIcon = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'medium':
        return <Info className="text-orange-500" size={20} />;
      default:
        return <CheckCircle className="text-green-500" size={20} />;
    }
  };

  const getPriorityStyles = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-green-500 bg-green-50';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertCircle className="mr-3 text-blue-500" size={28} />
          Announcements
        </h2>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`
                p-4 border-l-4 rounded-r-xl transition-all duration-200 cursor-pointer
                hover:shadow-md hover:scale-[1.01]
                ${getPriorityStyles(announcement.priority)}
                ${announcement.read ? 'opacity-60' : ''}
              `}
              onClick={() => !announcement.read && onMarkAsRead(announcement.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getPriorityIcon(announcement.priority)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className={`font-semibold ${announcement.read ? 'text-gray-600' : 'text-gray-900'}`}>
                        {announcement.title}
                      </h3>
                      {!announcement.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${announcement.read ? 'text-gray-500' : 'text-gray-700'}`}>
                      {announcement.description}
                    </p>
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {formatTimestamp(announcement.timestamp)}
                    </div>
                  </div>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium capitalize
                  ${announcement.priority === 'high' ? 'bg-red-100 text-red-700' :
                    announcement.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'}
                `}>
                  {announcement.priority}
                </span>
              </div>
            </div>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No announcements at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};