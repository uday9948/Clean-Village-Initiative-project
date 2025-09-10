import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'te';
  setLanguage: (lang: 'en' | 'te') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    complaints: 'Raise Complaint',
    hygiene: 'Hygiene Instructions',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    signup: 'Sign Up',
    
    // Home Page
    welcome: 'Welcome to Clean Village Initiative',
    subtitle: 'Enhancing Sanitation and Hygiene in Rural Areas',
    description: 'Our initiative focuses on improving sanitation facilities and promoting hygiene practices in rural communities. Together, we can build healthier villages.',
    userLogin: 'User Login',
    officialLogin: 'Official Login',
    createAccount: 'Create Account',
    joinUs: 'Join Us Today',
    features: 'Key Features',
    raiseComplaint: 'Report sanitation issues in your area',
    learnHygiene: 'Learn proper hygiene practices',
    trackProgress: 'Track complaint resolution progress',
    
    // Authentication
    loginTitle: 'Login to Your Account',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginButton: 'Login',
    loginAs: 'Login as',
    user: 'User',
    official: 'Official',
    fullName: 'Full Name',
    email: 'Email Address',
    phoneNumber: 'Phone Number',
    district: 'District',
    village: 'Village/Town',
    selectRole: 'Select Your Role',
    alreadyHaveAccount: 'Already have an account?',
    loginHere: 'Login here',
    dontHaveAccount: 'Don\'t have an account?',
    signupHere: 'Sign up here',
    registrationSuccess: 'Registration Successful!',
    loginNow: 'Login Now',
    backToHome: 'Back to Home',
    creating: 'Creating Account...',
    
    // Complaint Form
    complaintTitle: 'Raise a Sanitation Complaint',
    name: 'Full Name',
    complaintType: 'Type of Complaint',
    description: 'Description',
    uploadImage: 'Upload Image (Optional)',
    submit: 'Submit Complaint',
    complaintSubmitted: 'Complaint submitted successfully!',
    
    // Complaint Types
    overflowingDrains: 'Overflowing Drains',
    lackOfToilets: 'Lack of Public Toilets',
    wasteDisposal: 'Poor Waste Disposal',
    waterContamination: 'Water Contamination',
    brokenSewage: 'Broken Sewage System',
    other: 'Other',
    
    // Hygiene Instructions
    hygieneTitle: 'Hygiene Instructions',
    handwashing: 'Proper Handwashing',
    toiletCleanliness: 'Toilet Cleanliness',
    safeWater: 'Safe Drinking Water',
    wasteDisposalTitle: 'Waste Disposal',
    
    // Handwashing steps
    handwashingSteps: 'Follow these steps for effective handwashing:',
    step1: 'Wet hands with clean water',
    step2: 'Apply soap and lather for 20 seconds',
    step3: 'Scrub between fingers and under nails',
    step4: 'Rinse thoroughly with clean water',
    step5: 'Dry with clean towel or air dry',
    
    // Toilet cleanliness
    toiletSteps: 'Maintain toilet cleanliness:',
    toiletStep1: 'Clean toilet bowl regularly with disinfectant',
    toiletStep2: 'Keep toilet area dry and ventilated',
    toiletStep3: 'Dispose of waste properly',
    toiletStep4: 'Wash hands after use',
    
    // Safe water
    waterSteps: 'Ensure safe drinking water:',
    waterStep1: 'Boil water for at least 1 minute',
    waterStep2: 'Store in clean, covered containers',
    waterStep3: 'Use clean cups and utensils',
    waterStep4: 'Avoid contaminated water sources',
    
    // Waste disposal
    wasteSteps: 'Proper waste disposal:',
    wasteStep1: 'Separate organic and inorganic waste',
    wasteStep2: 'Use designated waste collection areas',
    wasteStep3: 'Compost organic waste when possible',
    wasteStep4: 'Recycle materials when available',
    
    // Dashboard
    dashboardTitle: 'Dashboard',
    totalComplaints: 'Total Complaints',
    pendingComplaints: 'Pending Complaints',
    resolvedComplaints: 'Resolved Complaints',
    overdueComplaints: 'Overdue Complaints',
    complaintId: 'Complaint ID',
    complainantName: 'Complainant Name',
    location: 'Location',
    type: 'Type',
    status: 'Status',
    dateSubmitted: 'Date Submitted',
    actions: 'Actions',
    resolve: 'Resolve',
    pending: 'Pending',
    resolved: 'Resolved',
    overdue: 'Overdue',
    
    // Common
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  te: {
    // Navigation
    home: 'హోమ్',
    complaints: 'ఫిర్యాదు చేయండి',
    hygiene: 'పరిశుభ్రత సూచనలు',
    login: 'లాగిన్',
    logout: 'లాగౌట్',
    dashboard: 'డాష్‌బోర్డ్',
    signup: 'సైన్ అప్',
    
    // Home Page
    welcome: 'క్లీన్ విలేజ్ చొరవకు స్వాగతం',
    subtitle: 'గ్రామీణ ప్రాంతాల్లో పరిశుభ్రత మరియు పరిచ్ఛన్నత వృద్ధి',
    description: 'మా చొరవ గ్రామీణ సమాజాలలో పరిశుభ్రత సౌకర్యాలను మెరుగుపరచడం మరియు పరిచ్ఛన్నత అభ్యాసాలను ప్రోత్సహించడంపై దృష్టి పెట్టుతుంది. కలిసి, మేము ఆరోగ్యకరమైన గ్రామాలను నిర్మించగలము.',
    userLogin: 'వినియోగదారు లాగిన్',
    officialLogin: 'అధికారి లాగిన్',
    createAccount: 'ఖాతా సృష్టించండి',
    joinUs: 'ఈరోజే మాతో చేరండి',
    features: 'ముఖ్య లక్షణాలు',
    raiseComplaint: 'మీ ప్రాంతంలో పరిశుభ్రత సమస్యలను నివేదించండి',
    learnHygiene: 'సరైన పరిచ్ఛన్నత అభ్యాసాలను నేర్చుకోండి',
    trackProgress: 'ఫిర్యాదు పరిష్కార పురోగతిని ట్రాక్ చేయండి',
    
    // Authentication
    loginTitle: 'మీ ఖాతాకు లాగిన్ అవండి',
    username: 'వినియోగదారు పేరు',
    password: 'పాస్‌వర్డ్',
    confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    loginButton: 'లాగిన్',
    loginAs: 'లాగిన్ రూపంలో',
    user: 'వినియోగదారు',
    official: 'అధికారి',
    fullName: 'పూర్తి పేరు',
    email: 'ఇమెయిల్ చిరునామా',
    phoneNumber: 'ఫోన్ నంబర్',
    district: 'జిల్లా',
    village: 'గ్రామం/పట్టణం',
    selectRole: 'మీ పాత్రను ఎంచుకోండి',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    loginHere: 'ఇక్కడ లాగిన్ చేయండి',
    dontHaveAccount: 'ఖాతా లేదా?',
    signupHere: 'ఇక్కడ సైన్ అప్ చేయండి',
    registrationSuccess: 'నమోదు విజయవంతం!',
    loginNow: 'ఇప్పుడు లాగిన్ చేయండి',
    backToHome: 'హోమ్‌కు తిరిగి వెళ్లండి',
    creating: 'ఖాతా సృష్టిస్తోంది...',
    
    // Complaint Form
    complaintTitle: 'పరిశుభ్రత ఫిర్యాదు చేయండి',
    name: 'పూర్తి పేరు',
    complaintType: 'ఫిర్యాదు రకం',
    description: 'వివరణ',
    uploadImage: 'చిత్రం అప్‌లోడ్ చేయండి (ఐచ్ఛికం)',
    submit: 'ఫిర్యాదు సమర్పించండి',
    complaintSubmitted: 'ఫిర్యాదు విజయవంతంగా సమర్పించబడింది!',
    
    // Complaint Types
    overflowingDrains: 'పొంగిపోతున్న కాలువలు',
    lackOfToilets: 'పబ్లిక్ టాయిలెట్‌ల లేకపోవడం',
    wasteDisposal: 'చెడు వ్యర్థ పదార్థాల పారవేయడం',
    waterContamination: 'నీటి కలుషణ',
    brokenSewage: 'విరిగిన మురుగు వ్యవస్థ',
    other: 'ఇతర',
    
    // Hygiene Instructions
    hygieneTitle: 'పరిచ్ఛన్నత సూచనలు',
    handwashing: 'సరైన చేతుల కడుక్కోవడం',
    toiletCleanliness: 'టాయిలెట్ పరిశుభ్రత',
    safeWater: 'సురక్షితమైన తాగునీరు',
    wasteDisposalTitle: 'వ్యర్థ పదార్థాల పారవేయడం',
    
    // Handwashing steps
    handwashingSteps: 'ప్రభావకరమైన చేతుల కడుక్కోవడం కోసం ఈ దశలను అనుసరించండి:',
    step1: 'శుభ్రమైన నీటితో చేతులను తడిపించండి',
    step2: 'సబ్బు వేసి 20 సెకన్లపాటు రుద్దండి',
    step3: 'వేళ్లమధ్య మరియు గోళ్లకింద రుద్దండి',
    step4: 'శుభ్రమైన నీటితో పూర్తిగా కడుక్కోండి',
    step5: 'శుభ్రమైన టవల్‌తో లేదా గాలితో ఆరబెట్టండి',
    
    // Toilet cleanliness
    toiletSteps: 'టాయిలెట్ పరిశుభ్రతను నిర్వహించండి:',
    toiletStep1: 'క్రమం తప్పకుండా టాయిలెట్ బౌల్‌ను క్రిమిసంహారకంతో శుభ్రం చేయండి',
    toiletStep2: 'టాయిలెట్ ప్రాంతాన్ని పొడిగా మరియు గాలివేయనివ్వండి',
    toiletStep3: 'వ్యర్థ పదార్థాలను సరిగ్గా పారవేయండి',
    toiletStep4: 'ఉపయోగం తరువాత చేతులు కడుక్కోండి',
    
    // Safe water
    waterSteps: 'సురక్షితమైన తాగునీరును నిర్ధారించండి:',
    waterStep1: 'కనీసం 1 నిమిషం పాటు నీటిని కొట్టండి',
    waterStep2: 'శుభ్రమైన, కప్పబడిన కంటైనర్లలో నిల్వ చేయండి',
    waterStep3: 'శుభ్రమైన కప్పులు మరియు పాత్రలను ఉపయోగించండి',
    waterStep4: 'కలుషితమైన నీటి వనరులను తప్పించండి',
    
    // Waste disposal
    wasteSteps: 'సరైన వ్యర్థ పదార్థాల పారవేయడం:',
    wasteStep1: 'సేంద్రీయ మరియు అసేంద్రీయ వ్యర్థ పదార్థాలను వేరు చేయండి',
    wasteStep2: 'నియమిత వ్యర్థ పదార్థాల సేకరణ ప్రాంతాలను ఉపయోగించండి',
    wasteStep3: 'వీలైనప్పుడు సేంద్రీయ వ్యర్థాలను కంపోస్ట్ చేయండి',
    wasteStep4: 'అందుబాటులో ఉన్నప్పుడు పదార్థాలను రీసైకిల్ చేయండి',
    
    // Dashboard
    dashboardTitle: 'డాష్‌బోర్డ్',
    totalComplaints: 'మొత్తం ఫిర్యాదులు',
    pendingComplaints: 'పెండింగ్ ఫిర్యాదులు',
    resolvedComplaints: 'పరిష్కరించబడిన ఫిర్యాదులు',
    overdueComplaints: 'మీరిన ఫిర్యాదులు',
    complaintId: 'ఫిర్యాదు ID',
    complainantName: 'ఫిర్యాదుదారు పేరు',
    location: 'స్థానం',
    type: 'రకం',
    status: 'స్థితి',
    dateSubmitted: 'సమర్పించిన తేదీ',
    actions: 'చర్యలు',
    resolve: 'పరిష్కరించు',
    pending: 'పెండింగ్',
    resolved: 'పరిష్కరించబడింది',
    overdue: 'మీరిన',
    
    // Common
    close: 'మూసివేయి',
    cancel: 'రద్దు చేయి',
    save: 'సేవ్ చేయి',
    edit: 'సవరించు',
    delete: 'తొలగించు',
    view: 'చూడు',
    back: 'వెనుక',
    next: 'తరువాత',
    previous: 'గత',
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    success: 'విజయం',
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'te'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};