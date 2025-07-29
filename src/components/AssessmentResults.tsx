import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, AlertCircle, Plus, Eye, Loader2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { assessSymptoms } from '../utils/aiAssessment';
import { getTranslation } from '../utils/translations';

const AssessmentResults: React.FC = () => {
  const { user, symptoms, currentAssessment, setCurrentAssessment, setCurrentPage } = useApp();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (symptoms.length > 0 && user && !currentAssessment) {
      performAssessment();
    }
  }, [symptoms, user, currentAssessment]);

  const performAssessment = async () => {
    if (!user || symptoms.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      const result = await assessSymptoms(symptoms, user);
      setCurrentAssessment(result);
    } catch (error) {
      console.error('Assessment failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!user) return null;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'moderate':
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
      case 'high':
        return <AlertCircle className="w-8 h-8 text-red-500" />;
      default:
        return <CheckCircle className="w-8 h-8 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-50 border-green-200';
      case 'moderate':
        return 'bg-yellow-50 border-yellow-200';
      case 'high':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getConditionText = (severity: string) => {
    switch (severity) {
      case 'low':
        return getTranslation('minorCondition', user.language);
      case 'moderate':
        return getTranslation('moderateCondition', user.language);
      case 'high':
        return getTranslation('seriousCondition', user.language);
      default:
        return getTranslation('minorCondition', user.language);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-800">Analyzing your symptoms...</p>
          <p className="text-gray-600 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentPage('symptoms')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="text-sm text-gray-500">
              {getTranslation('aiResults', user.language)}
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {getTranslation('aiResults', user.language)}
            </h1>
            <p className="text-gray-600">Based on advanced symptom analysis</p>
          </div>

          {currentAssessment && (
            <div className="space-y-6">
              {/* Main Result Card */}
              <div className={`p-6 rounded-xl border-2 ${getSeverityColor(currentAssessment.severity)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getSeverityIcon(currentAssessment.severity)}
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getConditionText(currentAssessment.severity)}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span>{getTranslation('confidence', user.language)}: {Math.round(currentAssessment.confidence * 100)}%</span>
                        <span className="mx-2">•</span>
                        <span>{getTranslation('analysisComplete', user.language)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  {currentAssessment.severity === 'low' 
                    ? 'Symptoms appear to be minor and manageable with home care'
                    : currentAssessment.severity === 'moderate'
                    ? 'Symptoms suggest a moderate condition that may require medical attention'
                    : 'Symptoms indicate a serious condition requiring immediate medical attention'
                  }
                </p>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <Eye className="w-5 h-5 mr-2" />
                  {getTranslation('recommendations', user.language)}
                </h3>
                
                <div className="space-y-3">
                  {currentAssessment.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Alert */}
              {currentAssessment.emergency && (
                <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl">
                  <div className="flex items-center">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-900">Emergency Alert</h3>
                      <p className="text-red-700 mt-1">
                        Your symptoms require immediate medical attention. Please seek emergency care.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentPage('emergency')}
                    className="mt-4 w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    View Emergency Services
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setCurrentPage('symptoms')}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {getTranslation('addMoreSymptoms', user.language)}
                </button>
                
                <button
                  onClick={() => setCurrentPage('doctors')}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {getTranslation('viewDetailed', user.language)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;