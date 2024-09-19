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
    if (filters.beds) {
      filtered = filtered.filter(
        (home) => home.beds === parseInt(filters.beds, 10)
      );
    }
    if (filters.homeType) {
      filtered = filtered.filter(
        (home) => home.homeType === filters.homeType
      );
    }

    setFilteredHomes(filtered);
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
        email: "useremail.@has",
        homeId: home._id,
        imageUrl: home.imageUrl 
      });
  
      if (response.status === 200) {
        console.log('Home saved successfully:', response.data);
      }
    } catch (error) {
      console.error('Failed to save home:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto mt-24 p-6">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Home Listings</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search homes by title, area, or type..."
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          />

          <select
            name="forRent"
            value={filters.forRent}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <option value="">For Rent</option>
            <option value="true">For Rent</option>
            <option value="false">For Sale</option>
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <option value="">Price Range</option>
            <option value="0-1000">0 - 1000</option>
            <option value="1001-2000">1001 - 2000</option>
            <option value="2001-3000">2001 - 3000</option>
            <option value="3001-5000">3001 - 5000</option>
          </select>

          <select
            name="beds"
            value={filters.beds}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
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
            className="p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <option value="">Home Type</option>
            <option value="Independent">Independent</option>
            <option value="Dependent">Dependent</option>
          </select>
        </div>

        {/* Home Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHomes.length > 0 ? (
            filteredHomes.map((home) => (
              <div key={home._id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
                <Link to={`/home/${home._id}`} className="cursor-pointer block">
                  <div className="relative">
                    <img
                      src={home.imageUrl || 'https://via.placeholder.com/300'}
                      alt={home.title || 'No title available'}
                      className="w-full h-56 object-cover rounded-md mb-4"
                    />
                    <button
                      onClick={(e) => handleSave(home, e)}
                      className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-100 transition-colors duration-300"
                    >
                      <FaHeart className="text-xl" />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{home.title || 'No title available'}</h2> 
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                    <p>{home.area || 'No area available'}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaRupeeSign className="mr-2 text-green-600" />
                    <p>₹{home.price || 'No price available'}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaBed className="mr-2 text-yellow-600" />
                    <p>{home.beds || 'N/A'} Beds</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaBath className="mr-2 text-purple-600" />
                    <p>{home.baths || 'N/A'} Baths</p>
                  </div>
                  <p className="text-gray-600 mb-2"><strong>Home Type:</strong> {home.homeType || 'No type available'}</p>
                  <p className="text-gray-600 mb-2"><strong>Phone No:</strong> {home.phoneNo || 'No phone available'}</p>
                  {home.bargain && <p className="text-green-600 font-semibold">Negotiable</p>}
                </Link>
              </div>
            ))
          ) : (
            <>
              <CardSkeleton/>
              <CardSkeleton/>
              <CardSkeleton/>
              <CardSkeleton/>
              <CardSkeleton/>
              <CardSkeleton/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
