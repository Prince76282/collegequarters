import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white pb-4">
      <div className="container mx-auto px-6 md:flex md:justify-between md:items-center text-sm">
        {/* Left section */}
        <div className="mb-2 md:mb-0 md:w-1/2 mt-4">
          <p className="text-gray-300 mb-4  text-xl text-center md:text-left">
            Subscribe to receive the latest rental properties and exclusive
            offers.
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
        <div className="md:w-1/2 mt-4 text-center md:text-right mb-4">
          <div className="flex flex-col items-center md:items-end mb-4 md:mb-0">
            <a
              href="/terms"
              className="text-gray-400 hover:text-white  mb-1 transition duration-200 ease-in-out text-xl ">
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white text-xl transition duration-200 ease-in-out"
            >
              Privacy Policy
            </a>
          </div>

          <div className="flex justify-center md:justify-end space-x-3 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=61565371378900&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-200 ease-in-out"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com/collegequaters.in/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition duration-200 ease-in-out"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
