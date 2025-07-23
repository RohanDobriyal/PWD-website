import React from 'react';
import { User, Mail, Hash, BookOpen, LogOut, Edit } from 'lucide-react';
import { Student } from '../../types';

interface ProfileProps {
  student: Student;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ student, onLogout }) => {
  const handleLogout = () => {
    // Clear any stored session data
    localStorage.removeItem('studentSession');
    localStorage.removeItem('notificationCount');
    onLogout();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 p-6 relative">
          <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-30">
              {student.profileImage ? (
                <img
                  src={student.profileImage}
                  alt={student.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-white">
                  {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              )}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="opacity-90">Amity University Student</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <User className="text-blue-500 mr-4" size={20} />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold text-gray-900">{student.name}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <Mail className="text-purple-500 mr-4" size={20} />
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-semibold text-gray-900">{student.email}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <Hash className="text-emerald-500 mr-4" size={20} />
              <div>
                <p className="text-sm text-gray-600">Roll Number</p>
                <p className="font-semibold text-gray-900">{student.rollNumber}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <BookOpen className="text-orange-500 mr-4" size={20} />
              <div>
                <p className="text-sm text-gray-600">University</p>
                <p className="font-semibold text-gray-900">Amity University</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
              <Edit size={20} className="mr-2" />
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              <LogOut size={20} className="mr-2" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};