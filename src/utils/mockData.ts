import { Doctor, Hospital } from '../types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Practitioner',
    rating: 4.8,
    distance: '0.5 km',
    availability: 'Available Now',
    phone: '+1-555-0123',
    address: '123 Main St, City Center',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Pediatrician',
    rating: 4.9,
    distance: '1.2 km',
    availability: 'Available in 30 min',
    phone: '+1-555-0456',
    address: '456 Oak Ave, Medical District',
  },
  {
    id: '3',
    name: 'Dr. Priya Patel',
    specialization: 'Cardiologist',
    rating: 4.7,
    distance: '2.1 km',
    availability: 'Available Tomorrow',
    phone: '+1-555-0789',
    address: '789 Pine Blvd, Heart Center',
  },
];

export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    address: '123 Main Street',
    phone: '+1-555-0100',
    distance: '0.8 km',
    rating: 4.5,
    emergency: true,
    specialties: ['Emergency Room', 'Cardiology', 'Orthopedics'],
  },
  {
    id: '2',
    name: 'Community Health Center',
    address: '456 Oak Avenue',
    phone: '+1-555-0200',
    distance: '1.5 km',
    rating: 4.3,
    emergency: false,
    specialties: ['Primary Care', 'Pediatrics', 'Mental Health'],
  },
  {
    id: '3',
    name: 'Regional Medical Center',
    address: '789 Pine Boulevard',
    phone: '+1-555-0300',
    distance: '2.3 km',
    rating: 4.7,
    emergency: true,
    specialties: ['Emergency Room', 'ICU', 'Surgery', 'Oncology'],
  },
];

export const mockAnalytics = {
  totalAssessments: 1247,
  minorCases: 892,
  seriousCases: 355,
  accuracyRate: 94.2,
  monthlyChange: {
    totalAssessments: 12.5,
    minorCases: 8.3,
    seriousCases: -2.1,
    accuracyRate: 1.8,
  },
  commonSymptoms: [
    { name: 'Headache', count: 156 },
    { name: 'Fever', count: 134 },
    { name: 'Cough', count: 98 },
    { name: 'Fatigue', count: 87 },
    { name: 'Nausea', count: 65 },
  ],
  recentFeedback: [
    {
      id: '1',
      rating: 5,
      comment: 'Very helpful and accurate assessment. Saved me a trip to the ER and gave me peace of mind.',
      timeAgo: '2 hours ago',
    },
    {
      id: '2',
      rating: 5,
      comment: 'Easy to use interface. The voice input feature works perfectly and understands my accent!',
      timeAgo: '5 hours ago',
    },
    {
      id: '3',
      rating: 4,
      comment: 'Quick and reliable. Helped me decide when to see a doctor. The recommendations were spot on.',
      timeAgo: '1 day ago',
    },
    {
      id: '4',
      rating: 5,
      comment: 'Great app for initial health screening. The AI seems very knowledgeable and thorough.',
      timeAgo: '2 days ago',
    },
  ],
};