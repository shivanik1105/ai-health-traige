import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Navigation from './components/Navigation';
import UserSetup from './components/UserSetup';
import SymptomInput from './components/SymptomInput';
import AssessmentResults from './components/AssessmentResults';
import EmergencyServices from './components/EmergencyServices';
import Analytics from './components/Analytics';
import DoctorRecommendations from './components/DoctorRecommendations';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'setup':
        return <UserSetup />;
      case 'symptoms':
        return <SymptomInput />;
      case 'results':
        return <AssessmentResults />;
      case 'emergency':
        return <EmergencyServices />;
      case 'dashboard':
        return <Analytics />;
      case 'doctors':
        return <DoctorRecommendations />;
      default:
        return <UserSetup />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderCurrentPage()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;