import React from 'react';
import { Calendar, Clock, MapPin, BookOpen, Bell } from 'lucide-react';
import { Student, Session } from '../../types';

interface DashboardProps {
  student: Student;
  sessions: Session[];
  onNotifyMe: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ student, sessions, onNotifyMe }) => {
  const getSessionIcon = (type: Session['type']) => {
    switch (type) {
      case 'lecture':
        return <BookOpen className="text-blue-500" size={20} />;
      case 'lab':
        return <Clock className="text-green-500" size={20} />;
      case 'tutorial':
        return <Calendar className="text-orange-500" size={20} />;
      case 'exam':
        return <Bell className="text-red-500" size={20} />;
      default:
        return <BookOpen className="text-blue-500" size={20} />;
    }
  };

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold">
                {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {student.name.split(' ')[0]}!</h2>
              <p className="opacity-90">Amity University Student</p>
            </div>
          </div>
          
          {/* Notify Me Button */}
          <button
            onClick={onNotifyMe}
            className="mt-6 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
          >
            <Bell size={20} />
            <span>Notify Me</span>
          </button>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="mr-3 text-blue-500" size={24} />
          Upcoming Sessions
        </h3>
        
        <div className="space-y-4">
          {sessions.map((session) => {
            const { date, time } = formatDateTime(session.datetime);
            
            return (
              <div
                key={session.id}
                className="p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-200 transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getSessionIcon(session.type)}
                    <div>
                      <h4 className="font-semibold text-gray-900">{session.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{session.subject}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {date}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {time}
                        </span>
                        <span className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {session.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium capitalize
                    ${session.type === 'exam' ? 'bg-red-100 text-red-700' :
                      session.type === 'lab' ? 'bg-green-100 text-green-700' :
                      session.type === 'tutorial' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'}
                  `}>
                    {session.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};