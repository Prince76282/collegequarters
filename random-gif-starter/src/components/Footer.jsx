import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-6 ">
      <div className="container mx-auto md:flex-row justify-between items-center text-center md:text-left flex">
        
        <div className=" space-x-4 mb-4 md:mb-0 ">
          <p className="text-gray-300 text-sm leading-relaxed">
             We offer a variety of rental properties to suit your needs and lifestyle.
          </p>

          <div>
          <p className="text-gray-300 mb-2 text-sm">Stay updated with the latest listings:</p>
          <form className="flex justify-center">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-3 py-1 rounded-l-md focus:outline-none text-sm text-black"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-r-md text-sm transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </div>

          
        </div>

        <div >

          <div className="flex flex-col    mb-4 md:mb-0">

            <a href="/terms" className="text-gray-400 hover:text-white text-xs transition-colors duration-300">Terms of Service</a>
             <a href="/privacy" className="text-gray-400 hover:text-white text-xs transition-colors duration-300">Privacy Policy</a>
 
          </div>
          
            <div className='flex space-x-4 mt-2'>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
            <FaFacebookF size={18} /></a>
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
            <FaInstagram size={18} />
          </a></div>

        </div>
       
  
        
      </div>

      <div className="border-t border-gray-700 pt-3 mt-4">
        <p className="text-xs text-gray-500 text-center">
          &copy; 2024 Your HomeRent. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
