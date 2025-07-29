import { Symptom, AssessmentResult, User } from '../types';

// Mock AI assessment logic - in production, this would call your AI/ML backend
export const assessSymptoms = async (symptoms: Symptom[], user: User): Promise<AssessmentResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const symptomTexts = symptoms.map(s => s.text.toLowerCase());
  
  // Simple rule-based assessment for demo
  let severity: 'low' | 'moderate' | 'high' = 'low';
  let confidence = 0.7;
  let condition = 'Minor Condition Identified';
  let emergency = false;
  let doctorSpecialization = 'General Practitioner';

  // Emergency symptoms
  const emergencySymptoms = [
    'chest pain', 'heart attack', 'stroke', 'severe bleeding', 'unconscious',
    'difficulty breathing', 'severe headache', 'high fever', 'severe pain'
  ];

  // Moderate symptoms
  const moderateSymptoms = [
    'fever', 'headache', 'nausea', 'fatigue', 'cough', 'sore throat',
    'body ache', 'dizziness', 'abdominal pain'
  ];

  // Check for emergency symptoms
  const hasEmergencySymptoms = symptomTexts.some(text => 
    emergencySymptoms.some(emergency => text.includes(emergency))
  );

  // Check for moderate symptoms
  const hasModerateSymptoms = symptomTexts.some(text => 
    moderateSymptoms.some(moderate => text.includes(moderate))
  );

  if (hasEmergencySymptoms) {
    severity = 'high';
    confidence = 0.9;
    condition = 'Serious Condition Detected';
    emergency = true;
    doctorSpecialization = 'Emergency Medicine';
  } else if (hasModerateSymptoms) {
    severity = 'moderate';
    confidence = 0.8;
    condition = 'Moderate Condition Identified';
    doctorSpecialization = 'General Practitioner';
  }

  // Age-based adjustments
  if (user.age < 18) {
    doctorSpecialization = 'Pediatrician';
  } else if (user.age > 65) {
    severity = severity === 'low' ? 'moderate' : severity;
    doctorSpecialization = 'Geriatrician';
  }

  const recommendations = generateRecommendations(severity, condition, user.age);

  return {
    id: `assessment_${Date.now()}`,
    userId: user.id,
    symptoms,
    severity,
    confidence,
    condition,
    recommendations,
    doctorSpecialization,
    emergency,
    createdAt: new Date(),
  };
};

const generateRecommendations = (severity: string, condition: string, age: number): string[] => {
  const baseRecommendations = [
    'Rest and stay hydrated',
    'Monitor symptoms for 24-48 hours',
    'Take over-the-counter medication if needed',
    'Contact doctor if symptoms worsen'
  ];

  if (severity === 'high') {
    return [
      'Seek immediate medical attention',
      'Call emergency services if symptoms are severe',
      'Do not drive yourself to the hospital',
      'Have someone stay with you'
    ];
  }

  if (severity === 'moderate') {
    return [
      'Schedule an appointment with your doctor',
      'Monitor symptoms closely',
      'Rest and avoid strenuous activities',
      'Stay hydrated and eat light meals'
    ];
  }

  if (age < 18) {
    return [
      'Ensure adequate rest and sleep',
      'Stay hydrated with water and clear fluids',
      'Consult pediatrician if symptoms persist',
      'Monitor temperature regularly'
    ];
  }

  return baseRecommendations;
};