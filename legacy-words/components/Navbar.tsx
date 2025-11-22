import React, { useState, useEffect } from 'react';
import { BookHeart, Menu, X } from 'lucide-react';

interface NavbarProps {
  onLogin?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Converted to anchor for keyboard accessibility */}
          <a 
            href="/" 
            className="flex items-center space-x-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-lg p-1"
            aria-label="Legacy Words Home"
          >
            <div className="bg-brand-blue p-2 rounded-lg text-white" aria-hidden="true">
              <BookHeart size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-brand-dark' : 'text-gray-900'}`}>
              Legacy Words
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-brand-blue focus:text-brand-blue font-medium transition-colors focus:outline-none focus:underline">How it works</a>
            <a href="#stories" className="text-gray-600 hover:text-brand-blue focus:text-brand-blue font-medium transition-colors focus:outline-none focus:underline">Stories</a>
            <a href="#faq" className="text-gray-600 hover:text-brand-blue focus:text-brand-blue font-medium transition-colors focus:outline-none focus:underline">FAQ</a>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={onLogin}
                className="text-brand-blue font-semibold hover:text-blue-800 px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-md"
              >
                Login
              </button>
              <button 
                onClick={onLogin}
                className="bg-brand-blue hover:bg-blue-800 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              >
                Start Remembering
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t border-gray-100"
          id="mobile-menu"
        >
          <div className="flex flex-col px-4 py-6 space-y-4">
            <a href="#how-it-works" className="text-lg text-gray-800 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>How it works</a>
            <a href="#stories" className="text-lg text-gray-800 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Stories</a>
            <a href="#faq" className="text-lg text-gray-800 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <hr className="border-gray-100" />
            <button onClick={onLogin} className="text-brand-blue font-semibold text-left text-lg py-2">Login</button>
            <button onClick={onLogin} className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold text-center">
              Start Remembering
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;