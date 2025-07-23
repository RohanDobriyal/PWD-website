import { useState, useEffect } from 'react';
import { NotificationState } from '../types';

export const useNotifications = () => {
  const [notificationState, setNotificationState] = useState<NotificationState>({
    permission: 'default',
    supported: false,
    count: 0
  });

  useEffect(() => {
    // Check if notifications are supported
    const supported = 'Notification' in window;
    setNotificationState(prev => ({
      ...prev,
      supported,
      permission: supported ? Notification.permission : 'denied'
    }));

    // Load notification count from localStorage
    const savedCount = localStorage.getItem('notificationCount');
    if (savedCount) {
      setNotificationState(prev => ({
        ...prev,
        count: parseInt(savedCount, 10)
      }));
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!notificationState.supported) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationState(prev => ({ ...prev, permission }));
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (notificationState.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        ...options
      });

      // Update count
      const newCount = notificationState.count + 1;
      setNotificationState(prev => ({ ...prev, count: newCount }));
      localStorage.setItem('notificationCount', newCount.toString());

      return notification;
    }
    return null;
  };

  const clearNotificationCount = () => {
    setNotificationState(prev => ({ ...prev, count: 0 }));
    localStorage.setItem('notificationCount', '0');
  };

  return {
    ...notificationState,
    requestPermission,
    sendNotification,
    clearNotificationCount
  };
};