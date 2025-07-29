export interface User {
  id: string;
  name: string;
  age: number;
  language: 'english' | 'hindi' | 'marathi';
  inputMode: 'text' | 'voice' | 'upload';
  createdAt: Date;
}

export interface Symptom {
  id: string;
  text: string;
  inputType: 'text' | 'voice';
  timestamp: Date;
  severity?: 'low' | 'moderate' | 'high';
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  extractedText?: string;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  symptoms: Symptom[];
  severity: 'low' | 'moderate' | 'high';
  confidence: number;
  condition: string;
  recommendations: string[];
  doctorSpecialization?: string;
  emergency: boolean;
  createdAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  distance: string;
  availability: string;
  phone: string;
  address: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  rating: number;
  emergency: boolean;
  specialties: string[];
}

export type Page = 'setup' | 'symptoms' | 'results' | 'dashboard' | 'emergency' | 'doctors';