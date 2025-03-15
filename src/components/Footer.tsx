
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Smooth scroll to top function
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't prevent default for external links
    if (e.currentTarget.getAttribute('href')?.startsWith('http') || 
        e.currentTarget.getAttribute('href')?.startsWith('mailto')) {
      return;
    }
    
    // For internal links, smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">Annaseva</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Connecting restaurants with surplus food to NGOs who can distribute it to those in need.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                <Instagram size={20} />
              </a>
              <a href="mailto:contact@annaseva.org" className="text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" onClick={handleLinkClick}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Subscribe</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Stay updated with our latest news and impact stories.
            </p>
            <div className="flex items-center">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 py-2 px-3 rounded-l-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
              />
              <button className="bg-brand-600 hover:bg-brand-700 text-white py-2 px-4 rounded-r-lg text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} Annaseva. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm transition-colors" onClick={handleLinkClick}>
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm transition-colors" onClick={handleLinkClick}>
              Terms of Service
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for a better world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
