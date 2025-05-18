import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center flex-wrap">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-2xl mr-2 animate-bounce">🧠</div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
              AlgoInsight
            </h1>
          </div>
          <nav className="flex space-x-6">
            <a 
              href="https://github.com/Ujjwalkumar6200" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ujjwalkumar09/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a 
              href="https://twitter.com/yourhandle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a 
              href="https://instagram.com/yourhandle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
          </nav>
        </div>
        <p className="mt-2 text-sm md:text-base text-blue-100">
          Visualize how algorithms work step by step
        </p>
      </div>
    </header>
  );
};

export default Header;
