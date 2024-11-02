import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';  
import { Link } from 'react-router-dom';
import { FaHeart, FaRupeeSign, FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa'; 
import { API_URL } from '../utils/key';
import CardSkeleton from './CardSkeleton';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [filters, setFilters] = useState({
    forRent: '',
    priceRange: '',
    beds: '',
    homeType: '',
  });
  const [visibleHomes, setVisibleHomes] = useState(10); // Track the number of visible cards

  useEffect(() => {
    fetchHomeListings();
  }, []);

  const fetchHomeListings = async () => {
    try {
      const response = await axios.get(`${API_URL}/homeListings`);
      setHomes(response.data); 
      setFilteredHomes(response.data); // Initial load of all homes
    } catch (error) {
      console.error('Error fetching home listings:', error);
    }
  };

  const applyFilters = useCallback((term, filters) => {
    let filtered = homes;

    filtered = filtered.filter(
      (home) =>
        (home.title && home.title.toLowerCase().includes(term)) ||
        (home.area && home.area.toLowerCase().includes(term)) ||
        (home.homeType && home.homeType.toLowerCase().includes(term))
    );

    if (filters.forRent !== '') {
      filtered = filtered.filter(
        (home) => home.forRent === (filters.forRent === 'true')
      );
    }
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(
        (home) => home.price >= minPrice && home.price <= maxPrice
      );
    }

    if (filters.bhk) {
      filtered = filtered.filter((home) => home.bhk === parseInt(filters.bhk));
    }

    if (filters.homeType) {
      filtered = filtered.filter(
        (home) => home.homeType === filters.homeType
      );
    }

    setFilteredHomes(filtered);
    setVisibleHomes(9); // Reset visible homes when filters change
  }, [homes]);

  useEffect(() => {
    applyFilters(searchTerm, filters);
  }, [searchTerm, filters, applyFilters]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSave = async (home, e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_URL}/favorites`, {
        email: "useremail@example.com", // Update with actual user email
        homeId: home._id,
        imageUrl: home.imageUrl,
        homeType: home.homeType,
        area: home.area,
        beds: home.beds,
        baths: home.baths,
        price: home.price,
      });
  
      if (response.status === 200) {
        console.log('Home saved successfully:', response.data);
      }
    } catch (error) {
      console.error('Failed to save home:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-gray-400 py-10">
    
      <div className="container mx-auto px-4 lg:px-12 mt-20">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 drop-shadow-lg">Explore Homes</h1>


        <div className="flex flex-wrap items-center justify-center gap-6 mb-16 p-6 bg-gradient-to-r from-gray-900 to-gray-800  rounded-xl shadow-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Search homes by title, area, or type..."
            className="flex-grow p-2 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          />
          <select
            name="forRent"
            value={filters.forRent}
            onChange={handleFilterChange}
            className="p-2 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          >
            <option value="">PG</option>
            <option value="true">Boy's</option>
            <option value="false">Girl's</option>
          </select>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="p-2 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          >
            <option value="">Price Range</option>
            <option value="0-1000">0 - 1000</option>
            <option value="1001-2000">1001 - 2000</option>
            <option value="2001-3000">2001 - 3000</option>
            <option value="18001-19000">18001 - 19000</option>
          </select>
          <select
            name="beds" // Changed from "bhk" to "beds" to match filter state
            value={filters.beds}
            onChange={handleFilterChange}
            className="p-2 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          >
            <option value="">BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
          </select>
          <select
            name="homeType"
            value={filters.homeType}
            onChange={handleFilterChange}
            className="p-2 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          >
            <option value="">Home Type</option>
            <option value="Independent">Independent</option>
            <option value="Dependent">Dependent</option>
          </select>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHomes.length > 0 ? (
            filteredHomes.slice(0, visibleHomes).map((home) => (
              <div key={home._id} className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
                <Link to={`/home/${home._id}`} className="cursor-pointer block">
                  <div className="relative">
                    <img
                      src={home.imageUrl || 'https://via.placeholder.com/300'}
                      alt={home.title || 'No title available'}
                      className="w-full h-64 object-cover rounded-md mb-4"
                    />
                    <button
                      onClick={(e) => handleSave(home, e)}
                      className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-100 transition-colors duration-300"
                    >
                      <FaHeart className="text-xl" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">{home.title || 'No title available'}</h2> 
                  <div className="flex items-center text-white mb-2">
                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                    <p>{home.area || 'No area available'}</p>
                  </div>
                  <div className="flex items-center text-white mb-2">
                    <FaRupeeSign className="mr-2  text-blue-500" />
                    <p>₹{home.price || 'No price available'}</p>
                  </div>
                  <div className="flex items-center text-white mb-2">
                    <FaBed className="mr-2  text-blue-500" />
                    <p>{home.beds || 'N/A'} Beds</p>
                  </div>
                  <div className="flex items-center text-white mb-2">
                    <FaBath className="mr-2 text-blue-500" />
                    <p>{home.baths || 'N/A'} Baths</p>
                  </div>
                  <p className="text-white mb-2"><strong>Home Type:</strong> {home.homeType || 'No type available'}</p>
                  <p className="text-white mb-2"><strong>Phone No:</strong> {home.phoneNo || 'No phone available'}</p>
                  {home.bargain && <p className="text-green-500 font-semibold">Bargain Available</p>}
                </Link>
              </div>
            ))
          ) : (
            <CardSkeleton /> // Fallback when no homes or loading
          )}
        </div>

        {/* "View More" Button */}
        {visibleHomes < filteredHomes.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleHomes((prev) => prev + 10)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default HomePage;
