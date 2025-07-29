import React from 'react';
import { Star, Phone, MapPin, Clock, User, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { mockDoctors } from '../utils/mockData';

const DoctorRecommendations: React.FC = () => {
  const { user, currentAssessment, setCurrentPage } = useApp();

  if (!user) return null;

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentPage('results')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Results
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recommended Doctors
          </h1>
          <p className="text-gray-600">
            Based on your symptoms and assessment results
          </p>
        </div>

        {/* Specialization Note */}
        {currentAssessment && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <p className="text-blue-800">
                Recommended specialist: <span className="font-semibold">{currentAssessment.doctorSpecialization}</span>
              </p>
            </div>
          </div>
        )}

        {/* Doctor Cards */}
        <div className="space-y-4">
          {mockDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialization}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{doctor.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{doctor.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCall(doctor.phone)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </button>
                  <button
                    onClick={() => handleDirections(doctor.address)}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">{doctor.address}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Note */}
        {currentAssessment?.emergency && (
          <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-900">Emergency Care Needed</h3>
                <p className="text-red-700">
                  Your symptoms require immediate attention. Consider visiting an emergency room or calling emergency services.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('emergency')}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              View Emergency Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorRecommendations;