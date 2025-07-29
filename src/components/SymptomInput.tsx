import React, { useState } from 'react';
import { ArrowLeft, Plus, Mic, MicOff, Type, Upload, Activity, FileText } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { Symptom, FileAttachment } from '../types';
import { getTranslation } from '../utils/translations';
import FileUpload from './FileUpload';

const SymptomInput: React.FC = () => {
  const { user, symptoms, addSymptom, setCurrentPage } = useApp();
  const [textInput, setTextInput] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'upload'>('text');
  const [uploadedFiles, setUploadedFiles] = useState<FileAttachment[]>([]);
  
  const { isRecording, transcript, startRecording, stopRecording, clearTranscript } = useVoiceRecognition(
    user?.language === 'hindi' ? 'hi-IN' : user?.language === 'marathi' ? 'mr-IN' : 'en-US'
  );

  if (!user) return null;

  const handleAddSymptom = () => {
    const symptomText = inputMode === 'text' ? textInput : transcript;
    if (symptomText.trim() || uploadedFiles.length > 0) {
      let finalText = symptomText.trim();
      
      // Add extracted text from uploaded files
      if (uploadedFiles.length > 0) {
        const extractedTexts = uploadedFiles
          .filter(file => file.extractedText)
          .map(file => file.extractedText)
          .join('. ');
        
        finalText = finalText 
          ? `${finalText}. Additional information from uploaded files: ${extractedTexts}`
          : `Information from uploaded files: ${extractedTexts}`;
      }

      const symptom: Symptom = {
        id: `symptom_${Date.now()}`,
        text: finalText,
        inputType: inputMode,
        timestamp: new Date(),
        attachments: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
      };
      addSymptom(symptom);
      setTextInput('');
      clearTranscript();
      setUploadedFiles([]);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleAnalyze = () => {
    if (symptoms.length > 0) {
      setCurrentPage('results');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentPage('setup')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {getTranslation('backToHome', user.language)}
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setInputMode('text')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inputMode === 'text'
                    ? 'bg-blue-100 text-blue-600 border border-blue-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Type className="w-4 h-4 mr-1" />
                {getTranslation('textInput', user.language)}
              </button>
              <button
                onClick={() => setInputMode('voice')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inputMode === 'voice'
                    ? 'bg-blue-100 text-blue-600 border border-blue-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Mic className="w-4 h-4 mr-1" />
                {getTranslation('voiceInput', user.language)}
              </button>
              <button
                onClick={() => setInputMode('upload')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inputMode === 'upload'
                     ? 'bg-blue-100 text-blue-600 border border-blue-200'
                     : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Upload className="w-4 h-4 mr-1" />
                {getTranslation('uploadReport', user.language)}
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getTranslation('symptomsTitle', user.language)}
            </h1>
            <p className="text-gray-600">
              {getTranslation('symptomsSubtitle', user.language)}
            </p>
          </div>

          {inputMode === 'text' ? (
            <div className="space-y-4 mb-8">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Describe your symptoms in detail... (e.g., 'I have a severe headache that started this morning along with nausea and sensitivity to light')"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-h-[120px] resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {textInput.length}/200
                </span>
                <button
                  onClick={handleAddSymptom}
                  disabled={!textInput.trim()}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {getTranslation('addSymptom', user.language)}
                </button>
              </div>
            </div>
          ) : inputMode === 'voice' ? (
            <div className="space-y-6 mb-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={handleVoiceToggle}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 animate-pulse'
                      : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-12 h-12 text-white" />
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </button>
                <p className="text-gray-600 mt-4 text-center">
                  {isRecording
                    ? getTranslation('recording', user.language)
                    : getTranslation('tapToRecord', user.language)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Voice input supports multiple languages
                </p>
              </div>

              {transcript && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-800">{transcript}</p>
                  <button
                    onClick={handleAddSymptom}
                    className="mt-3 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {getTranslation('addSymptom', user.language)}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 mb-8">
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Medical Reports</h3>
                <p className="text-gray-600 mb-6">
                  Upload your medical reports, test results, or prescription images for analysis
                </p>
              </div>
              
              <FileUpload 
                onFilesUploaded={setUploadedFiles}
                maxFiles={5}
                acceptedTypes={['image/*', '.pdf', '.jpg', '.jpeg', '.png']}
              />
              
              {uploadedFiles.length > 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={handleAddSymptom}
                    className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medical Information
                  </button>
                </div>
              )}
            </div>
          )}

          {symptoms.length > 0 && (
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-lg font-semibold text-gray-800">
                <Activity className="w-5 h-5 mr-2" />
                {getTranslation('recordSymptoms', user.language)} ({symptoms.length})
              </div>
              
              <div className="space-y-3">
                {symptoms.map((symptom) => (
                  <div
                    key={symptom.id}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {symptom.inputType === 'voice' ? (
                          <Mic className="w-4 h-4 text-green-600 mr-2" />
                        ) : symptom.inputType === 'upload' ? (
                          <Upload className="w-4 h-4 text-purple-600 mr-2" />
                        ) : (
                          <Type className="w-4 h-4 text-blue-600 mr-2" />
                        )}
                        <span className="text-sm text-gray-500">
                          Added {new Date(symptom.timestamp).toLocaleTimeString()} • 
                          {symptom.inputType === 'voice' ? ' Voice' : 
                           symptom.inputType === 'upload' ? ' File Upload' : ' Text'} input
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-800 mt-2">{symptom.text}</p>
                    {symptom.attachments && symptom.attachments.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {symptom.attachments.map((file) => (
                          <div key={file.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={symptoms.length === 0}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              <Activity className="w-5 h-5 mr-2" />
              {getTranslation('analyzeSymptoms', user.language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;