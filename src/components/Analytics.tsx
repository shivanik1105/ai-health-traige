import React from 'react';
import { BarChart3, TrendingUp, Users, Activity, Star, Filter, Download } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { mockAnalytics } from '../utils/mockData';
import { getTranslation } from '../utils/translations';

const Analytics: React.FC = () => {
  const { user } = useApp();

  if (!user) return null;

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? '↗' : '↘';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getTranslation('analyticsDashboard', user.language)}
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive health triage insights and performance metrics
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              {getTranslation('filter', user.language)}
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              {getTranslation('export', user.language)}
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getTranslation('totalAssessments', user.language)}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAnalytics.totalAssessments.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${getChangeColor(mockAnalytics.monthlyChange.totalAssessments)}`}>
                {getChangeIcon(mockAnalytics.monthlyChange.totalAssessments)}
                {Math.abs(mockAnalytics.monthlyChange.totalAssessments)}% from last month
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getTranslation('minorCases', user.language)}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAnalytics.minorCases.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${getChangeColor(mockAnalytics.monthlyChange.minorCases)}`}>
                {getChangeIcon(mockAnalytics.monthlyChange.minorCases)}
                {Math.abs(mockAnalytics.monthlyChange.minorCases)}% from last month
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getTranslation('seriousCases', user.language)}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAnalytics.seriousCases.toLocaleString()}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${getChangeColor(mockAnalytics.monthlyChange.seriousCases)}`}>
                {getChangeIcon(mockAnalytics.monthlyChange.seriousCases)}
                {Math.abs(mockAnalytics.monthlyChange.seriousCases)}% from last month
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getTranslation('accuracyRate', user.language)}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAnalytics.accuracyRate}%
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${getChangeColor(mockAnalytics.monthlyChange.accuracyRate)}`}>
                {getChangeIcon(mockAnalytics.monthlyChange.accuracyRate)}
                {Math.abs(mockAnalytics.monthlyChange.accuracyRate)}% from last month
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Common Symptoms Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                <BarChart3 className="w-5 h-5 inline mr-2" />
                {getTranslation('commonSymptoms', user.language)}
              </h3>
            </div>
            <div className="space-y-4">
              {mockAnalytics.commonSymptoms.map((symptom, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-sm text-gray-600">{symptom.name}</div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(symptom.count / mockAnalytics.commonSymptoms[0].count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 w-8 text-right">
                    {symptom.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                <Star className="w-5 h-5 inline mr-2" />
                {getTranslation('recentFeedback', user.language)}
              </h3>
            </div>
            <div className="space-y-4">
              {mockAnalytics.recentFeedback.map((feedback) => (
                <div key={feedback.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm font-medium">A</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{feedback.timeAgo}</span>
                  </div>
                  <p className="text-sm text-gray-700">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;