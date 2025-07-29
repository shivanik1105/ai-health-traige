import React from 'react';
import { Heart, Home, FileText, AlertTriangle, BarChart3, LogOut } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getTranslation } from '../utils/translations';

const Navigation: React.FC = () => {
  const { currentPage, setCurrentPage, user, clearSession } = useApp();
  
  if (!user) return null;

  const navItems = [
    { id: 'symptoms', icon: Home, label: getTranslation('home', user.language) },
    { id: 'results', icon: FileText, label: getTranslation('passport', user.language) },
    { id: 'emergency', icon: AlertTriangle, label: getTranslation('emergency', user.language) },
    { id: 'dashboard', icon: BarChart3, label: getTranslation('analytics', user.language) },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              {getTranslation('appName', user.language)}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as any)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4 mr-1" />
                {item.label}
              </button>
            ))}
            
            <button
              onClick={clearSession}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;