import { Student, Session, Announcement } from '../types';

export const mockStudent: Student = {
  id: '1',
  name: 'Rohan Dobriyal',
  email: 'rohan.dobriyal@amity.edu',
  rollNumber: 'AU2024012'
};

export const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Advanced Data Structures',
    subject: 'Computer Science',
    datetime: '2025-01-18T09:00:00',
    location: 'Room 201, CS Building',
    type: 'lecture'
  },
  {
    id: '2',
    title: 'Database Systems Lab',
    subject: 'Computer Science',
    datetime: '2025-01-18T14:00:00',
    location: 'Lab 3, CS Building',
    type: 'lab'
  },
  {
    id: '3',
    title: 'Physics Tutorial',
    subject: 'Physics',
    datetime: '2025-01-19T10:30:00',
    location: 'Room 105, Science Block',
    type: 'tutorial'
  },
  {
    id: '4',
    title: 'Mathematics Final Exam',
    subject: 'Mathematics',
    datetime: '2025-01-20T09:00:00',
    location: 'Main Auditorium',
    type: 'exam'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Midterm Exam Schedule Released',
    description: 'The schedule for midterm examinations has been published. Please check your student portal for detailed timings and venues.',
    timestamp: '2025-01-17T14:30:00',
    priority: 'high',
    read: false
  },
  {
    id: '2',
    title: 'Library Hours Extended',
    description: 'The university library will now remain open until 11 PM on weekdays to support student research and study activities.',
    timestamp: '2025-01-17T10:15:00',
    priority: 'medium',
    read: false
  },
  {
    id: '3',
    title: 'New Course Registration Opens',
    description: 'Registration for next semester courses begins Monday. Early registration is recommended to secure your preferred slots.',
    timestamp: '2025-01-16T16:45:00',
    priority: 'medium',
    read: true
  },
  {
    id: '4',
    title: 'Campus WiFi Maintenance',
    description: 'Scheduled maintenance on campus WiFi infrastructure will occur this weekend. Temporary disruptions expected.',
    timestamp: '2025-01-16T09:20:00',
    priority: 'low',
    read: true
  },
  {
    id: '5',
    title: 'Student Council Elections',
    description: 'Nominations are now open for student council positions. Submit your applications by the end of this week.',
    timestamp: '2025-01-15T11:00:00',
    priority: 'medium',
    read: false
  }
];