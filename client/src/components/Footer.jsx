import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
  return (
<footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-8">
  <div className="container mx-auto px-6 md:flex md:justify-between md:items-center text-sm">

    {/* Left section */}
    <div className="mb-6 md:mb-0 md:w-1/2">
      <h3 className="text-lg font-bold mb-2 text-center md:text-left">
        Stay Updated!
      </h3>
      <p className="text-gray-300 mb-4 text-center md:text-left">
        Subscribe to receive the latest rental properties and exclusive offers.
      </p>

      <form className="flex flex-col gap-2 items-center md:flex-row md:justify-start">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="w-full md:w-auto px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black mb-2 md:mb-0 shadow-lg transition-all duration-200 ease-in-out"
        />
        <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-transform duration-300 transform hover:scale-105 shadow-lg">
          Subscribe
        </button>
      </form>
    </div>

    {/* Right section */}
    <div className="md:w-1/2 text-center md:text-right">
      <h3 className="text-lg font-bold mb-2">Quick Links</h3>
      <div className="flex flex-col items-center md:items-end mb-4 md:mb-0">
        <a href="/terms" className="text-gray-400 hover:text-white text-xs mb-1 transition duration-200 ease-in-out">Terms of Service</a>
        <a href="/privacy" className="text-gray-400 hover:text-white text-xs transition duration-200 ease-in-out">Privacy Policy</a>
      </div>

      <div className="flex justify-center md:justify-end space-x-3 mt-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition duration-200 ease-in-out">
          <FaFacebookF size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition duration-200 ease-in-out">
          <FaInstagram size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition duration-200 ease-in-out">
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  </div>

  <div className="border-t border-gray-700 pt-4 mt-4">
    <p className="text-xs text-gray-500 text-center">
      &copy; 2024 Your HomeRent. All rights reserved.
    </p>
  </div>
</footer>
  );
};

export default Footer;
