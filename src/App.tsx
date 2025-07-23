import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Layout/Navigation';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Announcements } from './components/Announcements/Announcements';
import { Profile } from './components/Profile/Profile';
import { Toast } from './components/Layout/Toast';
import { useNotifications } from './hooks/useNotifications';
import { useServiceWorker } from './hooks/useServiceWorker';
import { mockStudent, mockSessions, mockAnnouncements } from './data/mockData';
import { Announcement } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const {
    permission,
    supported,
    count,
    requestPermission,
    sendNotification,
    clearNotificationCount
  } = useNotifications();

  useServiceWorker();

  // Update page title
  useEffect(() => {
    const titles = {
      dashboard: 'Dashboard - EduConnect',
      announcements: 'Announcements - EduConnect',
      profile: 'Profile - EduConnect'
    };
    document.title = titles[currentPage as keyof typeof titles] || 'EduConnect';
  }, [currentPage]);

  // Clear notification count when viewing announcements
  useEffect(() => {
    if (currentPage === 'announcements') {
      clearNotificationCount();
    }
  }, [currentPage, clearNotificationCount]);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleNotifyMe = async () => {
    if (!supported) {
      showToast('Notifications are not supported in your browser', 'error');
      return;
    }

    if (permission === 'denied') {
      showToast('Notifications are blocked. Please enable them in your browser settings.', 'error');
      return;
    }

    if (permission === 'default') {
      const granted = await requestPermission();
      if (!granted) {
        showToast('Notification permission was denied', 'error');
        return;
      }
    }

    // Send notification
    const notification = sendNotification('EduConnect Notification', {
      body: 'This is a demo notification from your Student Portal!',
      tag: 'demo-notification'
    });

    if (notification) {
      showToast('Notification sent successfully!', 'success');
    } else {
      showToast('Failed to send notification', 'error');
    }
  };

  const handleMarkAsRead = (id: string) => {
    setAnnouncements(prev =>
      prev.map(announcement =>
        announcement.id === id
          ? { ...announcement, read: true }
          : announcement
      )
    );
  };

  const handleLogout = () => {
    showToast('You have been logged out successfully', 'info');
    // In a real app, this would redirect to login
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const unreadCount = announcements.filter(a => !a.read).length;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'announcements':
        return (
          <Announcements
            announcements={announcements}
            onMarkAsRead={handleMarkAsRead}
          />
        );
      case 'profile':
        return (
          <Profile
            student={mockStudent}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <Dashboard
            student={mockStudent}
            sessions={mockSessions}
            onNotifyMe={handleNotifyMe}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:flex">
        <Navigation
          currentPage={currentPage}
          onPageChange={handlePageChange}
          notificationCount={unreadCount}
          isMenuOpen={isMenuOpen}
          onMenuToggle={handleMenuToggle}
        />
        
        <main className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8 max-w-6xl mx-auto">
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {renderCurrentPage()}
            </div>
          </div>
        </main>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;