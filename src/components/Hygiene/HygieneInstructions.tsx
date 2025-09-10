import React from 'react';
import { 
  Droplets, 
  Trash2, 
  Shield, 
  Beaker,
  Hand,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const HygieneInstructions: React.FC = () => {
  const { t } = useLanguage();

  const sections = [
    {
      id: 'handwashing',
      title: t('handwashing'),
      icon: Hand,
      color: 'bg-blue-100 text-blue-600',
      steps: [
        { text: t('step1'), icon: Droplets },
        { text: t('step2'), icon: Hand },
        { text: t('step3'), icon: Hand },
        { text: t('step4'), icon: Droplets },
        { text: t('step5'), icon: CheckCircle },
      ],
    },
    {
      id: 'toiletCleanliness',
      title: t('toiletCleanliness'),
      icon: Shield,
      color: 'bg-green-100 text-green-600',
      steps: [
        { text: t('toiletStep1'), icon: Beaker },
        { text: t('toiletStep2'), icon: Shield },
        { text: t('toiletStep3'), icon: Trash2 },
        { text: t('toiletStep4'), icon: Hand },
      ],
    },
    {
      id: 'safeWater',
      title: t('safeWater'),
      icon: Droplets,
      color: 'bg-cyan-100 text-cyan-600',
      steps: [
        { text: t('waterStep1'), icon: Beaker },
        { text: t('waterStep2'), icon: Shield },
        { text: t('waterStep3'), icon: CheckCircle },
        { text: t('waterStep4'), icon: AlertTriangle },
      ],
    },
    {
      id: 'wasteDisposal',
      title: t('wasteDisposalTitle'),
      icon: Trash2,
      color: 'bg-orange-100 text-orange-600',
      steps: [
        { text: t('wasteStep1'), icon: Trash2 },
        { text: t('wasteStep2'), icon: Shield },
        { text: t('wasteStep3'), icon: CheckCircle },
        { text: t('wasteStep4'), icon: CheckCircle },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('hygieneTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow these essential hygiene practices to maintain health and prevent disease in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-full ${section.color}`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {section.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-sm font-semibold text-gray-700">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="text-gray-700">{step.text}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <step.icon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Important Reminders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Regular Practice</h3>
                  <p className="text-green-100">
                    Consistency is key - make these practices part of your daily routine.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Community Health</h3>
                  <p className="text-green-100">
                    When everyone follows these practices, the entire community benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">
              Emergency Health Concerns
            </h3>
          </div>
          <p className="text-red-700 mb-4">
            If you notice signs of waterborne illness or contamination in your area, 
            report it immediately through the complaint system or contact local health authorities.
          </p>
          <div className="flex space-x-4">
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Health Emergency</p>
              <p className="text-lg font-bold text-red-600">108</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Water Quality Issues</p>
              <p className="text-lg font-bold text-blue-600">1916</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HygieneInstructions;