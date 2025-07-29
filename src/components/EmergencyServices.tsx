import React from 'react';
import { Phone, MapPin, Clock, AlertTriangle, Navigation } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { mockHospitals } from '../utils/mockData';
import { getTranslation } from '../utils/translations';

const EmergencyServices: React.FC = () => {
  const { user } = useApp();

  if (!user) return null;

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const emergencyTips = [
    'Stay calm and remain with the patient',
    'Do not move the person unless absolutely necessary',
    'Keep emergency contact information ready',
    'Monitor breathing and consciousness levels',
    'Be prepared to provide CPR if trained and needed',
    'Note the time when symptoms started',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getTranslation('emergencyServices', user.language)}
          </h1>
          <p className="text-gray-600">
            Get immediate medical help when you need it most
          </p>
        </div>

        {/* Emergency Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-500 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 mr-3" />
              <div>
                <h3 className="text-xl font-bold">
                  {getTranslation('emergencyHotline', user.language)}
                </h3>
                <p className="text-red-100">
                  Call for immediate emergency assistance
                </p>
              </div>
            </div>
            <button
              onClick={() => handleCall('911')}
              className="w-full bg-white text-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              {getTranslation('callNow', user.language)} - 911
            </button>
          </div>

          <div className="bg-blue-500 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <MapPin className="w-8 h-8 mr-3" />
              <div>
                <h3 className="text-xl font-bold">
                  {getTranslation('nearestHospital', user.language)}
                </h3>
                <p className="text-blue-100">
                  Find the closest emergency room
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDirections('nearest emergency room')}
              className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {getTranslation('findHospitals', user.language)}
            </button>
          </div>
        </div>

        {/* While You Wait */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">
            <Clock className="w-5 h-5 inline mr-2" />
            {getTranslation('whileYouWait', user.language)}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyTips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-yellow-800 text-sm font-medium">{index + 1}</span>
                </div>
                <p className="text-yellow-800 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Hospitals */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            <MapPin className="w-5 h-5 inline mr-2" />
            {getTranslation('primaryHealthCenters', user.language)}
          </h3>
          
          <div className="space-y-4">
            {mockHospitals.map((hospital) => (
              <div key={hospital.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                      <p className="text-sm text-gray-600">{hospital.address}</p>
                      <p className="text-sm text-gray-500">
                        {hospital.distance} • {hospital.rating}★ • {hospital.emergency ? 'Emergency Room' : 'Urgent Care'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCall(hospital.phone)}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      {getTranslation('call', user.language)}
                    </button>
                    <button
                      onClick={() => handleDirections(hospital.address)}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      {getTranslation('directions', user.language)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;