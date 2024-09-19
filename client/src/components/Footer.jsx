import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-4">
      <div className="container mx-auto px-4 md:flex md:justify-between md:items-center text-sm">
        
        {/* Left section */}
        <div className="mb-4 md:mb-0 md:w-1/2">
          <p className="text-gray-300 mb-2 text-center md:text-left">
            We offer a variety of rental properties to suit your needs and lifestyle.
          </p>

          <form className="flex flex-col items-center md:flex-row md:justify-start">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full md:w-auto px-3 py-1 rounded-l-md focus:outline-none text-sm text-black mb-2 md:mb-0"
            />
            <button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-300 md:rounded-l-none">
              Subscribe
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="md:w-1/2 text-center md:text-right">
          <div className="flex flex-col items-center md:items-end mb-2 md:mb-0">
            <a href="/terms" className="text-gray-400 hover:text-white text-xs mb-1">Terms of Service</a>
            <a href="/privacy" className="text-gray-400 hover:text-white text-xs">Privacy Policy</a>
          </div>

          <div className="flex justify-center md:justify-end space-x-3 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
              <FaFacebookF size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400">
              <FaInstagram size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-3 mt-3">
        <p className="text-xs text-gray-500 text-center">
          &copy; 2024 Your HomeRent. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
