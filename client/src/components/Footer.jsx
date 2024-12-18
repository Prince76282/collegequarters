import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/subscribe', { email: formData.email });
      if (response.status === 200) {
        setFormData({ email: '', message: 'Subscription successful! Thank you for subscribing.' });
      } else {
        setFormData({ ...formData, message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setFormData({ ...formData, message: 'Error occurred while subscribing. Please try again later.' });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-8">
      <div className="container mx-auto px-9 md:flex md:justify-between md:items-center text-sm">
        <div className="mb-6 md:mb-0 md:w-1/2">
          <h3 className="text-lg font-bold mb-2 text-xl text-center md:text-left">Stay Updated!</h3>
          <p className="text-white mb-4 text-lg text-center md:text-left">
            Subscribe to receive the latest rental properties and exclusive offers.
          </p>

          <form className="flex flex-col gap-2 items-center md:flex-row md:justify-start" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full md:w-auto px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black mb-2 md:mb-0 shadow-lg transition-all duration-200 ease-in-out"
              required
            />
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-transform duration-300 transform hover:scale-105 shadow-lg"
            >
              Subscribe
            </button>
          </form>
          {formData.message && <p className="text-center text-green-500 mt-2">{formData.message}</p>}
        </div>

        <div className="md:w-1/2 text-center md:text-right">
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <div className="flex flex-col items-center md:items-end mb-4 md:mb-0">
            <a href="/terms" className="text-gray-400 hover:text-white text-lg mb-1 transition duration-200 ease-in-out">Terms of Service</a>
            <a href="/privacy" className="text-gray-400 hover:text-white text-lg transition duration-200 ease-in-out">Privacy Policy</a>
          </div>

          <div className="flex justify-center md:justify-end space-x-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition duration-200 ease-in-out">
              <FaFacebookF size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition duration-200 ease-in-out">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
