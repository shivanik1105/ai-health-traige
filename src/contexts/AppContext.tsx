import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Symptom, AssessmentResult, Page } from '../types';

interface AppContextType {
  user: User | null;
  symptoms: Symptom[];
  currentPage: Page;
  currentAssessment: AssessmentResult | null;
  isRecording: boolean;
  setUser: (user: User | null) => void;
  setSymptoms: (symptoms: Symptom[]) => void;
  addSymptom: (symptom: Symptom) => void;
  setCurrentPage: (page: Page) => void;
  setCurrentAssessment: (assessment: AssessmentResult | null) => void;
  setIsRecording: (recording: boolean) => void;
  clearSession: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('setup');
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('healthTriage_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('symptoms');
    }
  }, []);

  // Save user data to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('healthTriage_user', JSON.stringify(user));
    }
  }, [user]);

  const addSymptom = (symptom: Symptom) => {
    setSymptoms(prev => [...prev, symptom]);
  };

  const clearSession = () => {
    setUser(null);
    setSymptoms([]);
    setCurrentAssessment(null);
    setCurrentPage('setup');
    localStorage.removeItem('healthTriage_user');
  };

  const value = {
    user,
    symptoms,
    currentPage,
    currentAssessment,
    isRecording,
    setUser,
    setSymptoms,
    addSymptom,
    setCurrentPage,
    setCurrentAssessment,
    setIsRecording,
    clearSession,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};