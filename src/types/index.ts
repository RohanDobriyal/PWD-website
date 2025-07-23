export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  profileImage?: string;
}

export interface Session {
  id: string;
  title: string;
  subject: string;
  datetime: string;
  location: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'exam';
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
}

export interface NotificationState {
  permission: NotificationPermission;
  supported: boolean;
  count: number;
}