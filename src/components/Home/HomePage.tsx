import React from 'react';
import { 
  FileText, 
  BookOpen, 
  BarChart3, 
  Users, 
  Shield, 
  Droplets,
  Heart,
  MapPin,
  UserPlus,
  User
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: FileText,
      title: t('raiseComplaint'),
      description: t('raiseComplaint'),
      color: 'text-blue-600 bg-blue-100',
      action: () => onPageChange('complaints'),
    },
    {
      icon: BookOpen,
      title: t('learnHygiene'),
      description: t('learnHygiene'),
      color: 'text-green-600 bg-green-100',
      action: () => onPageChange('hygiene'),
    },
    {
      icon: BarChart3,
      title: t('trackProgress'),
      description: t('trackProgress'),
      color: 'text-purple-600 bg-purple-100',
      action: () => onPageChange('dashboard'),
    },
  ];

  const stats = [
    { icon: Users, value: '50+', label: 'Villages Served' },
    { icon: FileText, value: '200+', label: 'Complaints Resolved' },
    { icon: Shield, value: '95%', label: 'Success Rate' },
    { icon: Heart, value: '1000+', label: 'Lives Improved' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen bg-gradient-to-br from-green-600/90 to-blue-600/90">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/WhatsApp Image 2025-07-04 at 11.40.54_af857008.jpg")',
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-blue-600/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center min-h-screen">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              {t('welcome')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 drop-shadow-md">
              {t('subtitle')}
            </p>
            <p className="text-lg mb-10 max-w-3xl mx-auto text-green-50 drop-shadow-md">
              {t('description')}
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onPageChange('login')}
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <User className="h-5 w-5" />
                  <span>{t('login')}</span>
                </button>
                <button
                  onClick={() => onPageChange('signup')}
                  className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>{t('joinUs')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('features')}
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-6`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of citizens working together for cleaner, healthier communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('complaints')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Report an Issue Today
            </button>
            {!isAuthenticated && (
              <button
                onClick={() => onPageChange('signup')}
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                {t('createAccount')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Real Impact, Real Results
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Coverage</h3>
                    <p className="text-gray-600">
                      Serving rural communities across multiple districts with comprehensive sanitation solutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Droplets className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Clean Water Access</h3>
                    <p className="text-gray-600">
                      Ensuring safe drinking water and proper sanitation facilities for all community members.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Health Improvements</h3>
                    <p className="text-gray-600">
                      Reducing waterborne diseases and improving overall community health outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-green-600 mb-4">
                  24/7
                </div>
                <p className="text-xl text-gray-800 mb-6">
                  Round-the-clock support for urgent sanitation issues
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">48hrs</div>
                    <div className="text-sm text-gray-600">Average Response Time</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-gray-600">Transparency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;