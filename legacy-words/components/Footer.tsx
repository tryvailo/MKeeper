import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legacy Words</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Legacy Words helps dementia families preserve what matters before memories fade. Free, private, forever.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-brand-blue hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-sm px-1 -ml-1">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-sm px-1 -ml-1">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-sm px-1 -ml-1">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-brand-blue hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-sm px-1 -ml-1">Dementia Awareness</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-sm px-1 -ml-1">Alzheimer's Society</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-sm px-1 -ml-1">Family Support Groups</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Get tips for dementia conversations and memory preservation.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Email address" 
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                required
              />
              <button className="bg-brand-blue text-white text-sm font-semibold py-2 rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">© 2025 Legacy Words. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;