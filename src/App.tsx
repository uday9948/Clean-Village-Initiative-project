import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import ComplaintForm from './components/Complaints/ComplaintForm';
import HygieneInstructions from './components/Hygiene/HygieneInstructions';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'signup':
        return <SignupPage onPageChange={setCurrentPage} />;
      case 'complaints':
        return <ComplaintForm onPageChange={setCurrentPage} />;
      case 'hygiene':
        return <HygieneInstructions />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          <main>
            {renderCurrentPage()}
          </main>
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;