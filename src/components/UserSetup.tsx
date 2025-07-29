import React, { useState } from 'react';
import { Heart, User, Calendar, Globe, MessageSquare } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { User as UserType } from '../types';
import { getTranslation } from '../utils/translations';

const UserSetup: React.FC = () => {
  const { setUser, setCurrentPage } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    language: 'english',
    inputMode: 'text',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age) {
      const user: UserType = {
        id: `user_${Date.now()}`,
        name: formData.name,
        age: parseInt(formData.age),
        language: formData.language as 'english' | 'hindi' | 'marathi',
        inputMode: formData.inputMode as 'text' | 'voice' | 'upload',
        createdAt: new Date(),
      };
      setUser(user);
      setCurrentPage('symptoms');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getTranslation('welcome', formData.language)}
          </h1>
          <p className="text-lg font-semibold text-gray-800 mb-1">
            {getTranslation('setupTitle', formData.language)}
          </p>
          <p className="text-sm text-gray-600">
            {getTranslation('setupSubtitle', formData.language)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                {getTranslation('name', formData.language)}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {getTranslation('age', formData.language)}
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your age"
                min="1"
                max="120"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 mr-2" />
                {getTranslation('language', formData.language)}
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="english">English</option>
                <option value="hindi">हिंदी</option>
                <option value="marathi">मराठी</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                {getTranslation('inputMode', formData.language)}
              </label>
              <select
                value={formData.inputMode}
                onChange={(e) => setFormData({ ...formData, inputMode: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="text">{getTranslation('textInput', formData.language)}</option>
                <option value="voice">{getTranslation('voiceInput', formData.language)}</option>
                <option value="upload">{getTranslation('uploadReport', formData.language)}</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {getTranslation('continueBtn', formData.language)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSetup;