import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <p className="flex items-center">
              Made with <FaHeart className="mx-2 text-red-500" /> by Ujjwal Kumar
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-2">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} AlgoInsight by Ujjwal
            </p>
            <div className="flex space-x-4">
              <a 
                href="/privacy" 
                className="text-blue-300 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-blue-300 hover:text-white text-sm transition-colors"
              >
                Terms
              </a>
              <a 
                href="/contact" 
                className="text-blue-300 hover:text-white text-sm transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;