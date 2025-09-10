import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface VoiceAssistantProps {
  onVoiceInput: (field: string, value: string) => void;
  currentField: string;
  isActive: boolean;
  onToggle: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  onVoiceInput,
  currentField,
  isActive,
  onToggle,
}) => {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const steps = [
    { field: 'name', prompt: language === 'en' ? 'Please say your full name' : 'దయచేసి మీ పూర్తి పేరు చెప్పండి' },
    { field: 'village', prompt: language === 'en' ? 'Please say your village or town name' : 'దయచేసి మీ గ్రామం లేదా పట్టణం పేరు చెప్పండి' },
    { field: 'type', prompt: language === 'en' ? 'What type of sanitation issue? Say: drains, toilets, waste, water, sewage, or other' : 'ఎలాంటి పరిశుభ్రత సమస్య? చెప్పండి: కాలువలు, టాయిలెట్లు, వ్యర్థాలు, నీరు, మురుగు, లేదా ఇతర' },
    { field: 'description', prompt: language === 'en' ? 'Please describe the problem in detail' : 'దయచేసి సమస్యను వివరంగా వర్ణించండి' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'en' ? 'en-US' : 'te-IN';

      recognitionRef.current.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        handleVoiceResult(result);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [language]);

  const handleVoiceResult = (result: string) => {
    const currentStepData = steps[currentStep];
    
    if (currentStepData.field === 'type') {
      // Map voice input to complaint types
      const typeMapping: { [key: string]: string } = {
        'drains': 'overflowingDrains',
        'కాలువలు': 'overflowingDrains',
        'toilets': 'lackOfToilets',
        'టాయిలెట్లు': 'lackOfToilets',
        'waste': 'wasteDisposal',
        'వ్యర్థాలు': 'wasteDisposal',
        'water': 'waterContamination',
        'నీరు': 'waterContamination',
        'sewage': 'brokenSewage',
        'మురుగు': 'brokenSewage',
        'other': 'other',
        'ఇతర': 'other',
      };

      const lowerResult = result.toLowerCase();
      let mappedType = 'other';
      
      for (const [key, value] of Object.entries(typeMapping)) {
        if (lowerResult.includes(key.toLowerCase())) {
          mappedType = value;
          break;
        }
      }
      
      onVoiceInput(currentStepData.field, mappedType);
    } else {
      onVoiceInput(currentStepData.field, result);
    }

    // Move to next step
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        speakPrompt(steps[currentStep + 1].prompt);
      }, 1000);
    } else {
      // Completed all steps
      const completionMessage = language === 'en' 
        ? 'Voice input completed. Please review and submit your complaint.'
        : 'వాయిస్ ఇన్‌పుట్ పూర్తయింది. దయచేసి మీ ఫిర్యాదును సమీక్షించి సమర్పించండి.';
      speakPrompt(completionMessage);
      setTimeout(() => {
        onToggle();
      }, 3000);
    }
  };

  const speakPrompt = (text: string) => {
    if (synthRef.current && isActive) {
      synthRef.current.cancel();
      setIsSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'te-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
        // Auto-start listening after prompt
        setTimeout(startListening, 500);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.lang = language === 'en' ? 'en-US' : 'te-IN';
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const restartVoiceAssistant = () => {
    setCurrentStep(0);
    setTranscript('');
    stopListening();
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
    setTimeout(() => {
      speakPrompt(steps[0].prompt);
    }, 500);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
    } else {
      speakPrompt(steps[currentStep].prompt);
    }
  };

  useEffect(() => {
    if (isActive && currentStep === 0) {
      // Start voice assistant
      setTimeout(() => {
        const welcomeMessage = language === 'en' 
          ? 'Welcome to voice complaint registration. I will guide you through the process.'
          : 'వాయిస్ ఫిర్యాదు నమోదుకు స్వాగతం. నేను మిమ్మల్ని ప్రక్రియ ద్వారా మార్గనిర్దేశం చేస్తాను.';
        speakPrompt(welcomeMessage);
        setTimeout(() => {
          speakPrompt(steps[0].prompt);
        }, 3000);
      }, 500);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <Mic className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Voice Assistant' : 'వాయిస్ అసిస్టెంట్'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? `Step ${currentStep + 1} of ${steps.length}` 
              : `దశ ${currentStep + 1} / ${steps.length}`}
          </p>
        </div>

        {/* Current Prompt */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-800 text-center font-medium">
            {steps[currentStep].prompt}
          </p>
        </div>

        {/* Voice Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking}
            className={`p-4 rounded-full transition-all duration-200 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-green-500 hover:bg-green-600'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>

          <button
            onClick={toggleSpeech}
            className={`p-4 rounded-full transition-all duration-200 ${
              isSpeaking
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isSpeaking ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>

          <button
            onClick={restartVoiceAssistant}
            className="p-4 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200"
          >
            <RotateCcw className="h-6 w-6" />
          </button>
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          {isListening && (
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-medium">
                {language === 'en' ? 'Listening...' : 'వింటోంది...'}
              </span>
            </div>
          )}
          {isSpeaking && (
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium">
                {language === 'en' ? 'Speaking...' : 'మాట్లాడుతోంది...'}
              </span>
            </div>
          )}
          {!isListening && !isSpeaking && (
            <span className="text-gray-500">
              {language === 'en' ? 'Ready to listen' : 'వినడానికి సిద్ధం'}
            </span>
          )}
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-600 mb-1">
              {language === 'en' ? 'You said:' : 'మీరు చెప్పినది:'}
            </p>
            <p className="text-green-800 font-medium">{transcript}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-gray-500 mb-6">
          <p>
            {language === 'en' 
              ? 'Click the microphone to start speaking. The assistant will guide you through each step.'
              : 'మాట్లాడటం ప్రారంభించడానికి మైక్రోఫోన్‌ను క్లిక్ చేయండి. అసిస్టెంట్ ప్రతి దశలో మిమ్మల్ని మార్గనిర్దేశం చేస్తుంది.'}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onToggle}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          {language === 'en' ? 'Close Voice Assistant' : 'వాయిస్ అసిస్టెంట్ మూసివేయండి'}
        </button>
      </div>
    </div>
  );
};

export default VoiceAssistant;