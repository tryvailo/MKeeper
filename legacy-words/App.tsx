import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import ProductDemo from './components/ProductDemo';
import SolutionSection from './components/SolutionSection';
import Testimonials from './components/Testimonials';
import FreeSection from './components/FreeSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  const handleLogin = () => {
    // In a real app, this would handle authentication
    setCurrentView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  if (currentView === 'dashboard') {
    return <DashboardLayout onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-blue selection:text-white">
      <Navbar onLogin={handleLogin} />
      <main>
        <Hero />
        <ProblemSection />
        <ProductDemo />
        <SolutionSection />
        <Testimonials />
        <FreeSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
