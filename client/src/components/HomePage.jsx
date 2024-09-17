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
        home.title.toLowerCase().includes(term) ||
        home.area.toLowerCase().includes(term) ||
        home.homeType.toLowerCase().includes(term)
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
    e.stopPropagation(); 
    const user = JSON.parse(localStorage.getItem('user')); // Assuming the user's info is stored in localStorage
    if (!user) {
      alert('Please login to save favorites');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/favorites`
      
      
      
      , {
        email: user.email,
        homeId: home._id,
      });
      if (response.status === 200) {
        console.log('Home saved to favorites');
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#333333]">Home Listings</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search homes by title, area, or type..."
            className="flex-grow p-3 border border-[#DDDDDD] rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-[#E0F2F1]"
          />

          <select
            name="forRent"
            value={filters.forRent}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">For Rent</option>
            <option value="true">For Rent</option>
            <option value="false">For Sale</option>
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="p-3 border border-[#DDDDDD] rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-[#E0F2F1]"
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
            className="p-3 border border-[#DDDDDD] rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-[#E0F2F1]"
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
            className="p-3 border border-[#DDDDDD] rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-[#E0F2F1]"
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
              <div key={home._id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link to={`/home/${home._id}`} className="cursor-pointer">
                  <div className="relative">
                    <img
                      src={home.imageUrl}
                      alt={home.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <button
                      onClick={(e) => handleSave(home, e)}
                      className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-100 transition-colors duration-300"
                    >
                      <FaHeart className="text-xl" />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold text-[#333333] mb-2">{home.title}</h2> 
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                    <p>{home.area}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaRupeeSign className="mr-2 text-green-600" />
                    <p>₹{home.price}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaBed className="mr-2 text-yellow-600" />
                    <p>{home.beds} Beds</p>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaBath className="mr-2 text-purple-600" />
                    <p>{home.baths} Baths</p>
                  </div>
                  <p className="text-gray-600 mb-2"><strong>Home Type:</strong> {home.homeType}</p>
                  <p className="text-gray-600 mb-2"><strong>Phone No:</strong> {home.phoneNo}</p>
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
            {/* <p className="text-center text-gray-600">No listings available</p> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
