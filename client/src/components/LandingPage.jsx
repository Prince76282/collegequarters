import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRupeeSign, FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { API_URL } from "../utils/key";
import CardSkeleton from "./CardSkeleton";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [filters, setFilters] = useState({
    forRent: "",
    priceRange: "",
    beds: "",
    homeType: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleHomesCount, setVisibleHomesCount] = useState(9); // To track how many homes to display initially
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get(`${API_URL}/homeListings`);
        setHomes(response.data);
        setFilteredHomes(response.data);
      } catch (error) {
        setError("Error fetching homes.");
        console.error("Error fetching homes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, homes]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const applyFilters = () => {
    let filtered = [...homes];

    if (searchTerm) {
      filtered = filtered.filter((home) => {
        const title = home.title?.toLowerCase() || "";
        const area = home.area?.toLowerCase() || "";
        const homeType = home.homeType?.toLowerCase() || "";
        return title.includes(searchTerm) || area.includes(searchTerm) || homeType.includes(searchTerm);
      });
    }

    if (filters.forRent) {
      filtered = filtered.filter((home) => home.forRent === (filters.forRent === "true"));
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((home) => home.price >= minPrice && home.price <= maxPrice);
    }

    if (filters.beds) {
      filtered = filtered.filter((home) => home.beds === parseInt(filters.beds));
    }

    if (filters.homeType) {
      filtered = filtered.filter((home) => home.homeType === filters.homeType);
    }

    setFilteredHomes(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleViewDetails = (homeId) => {
    if (isLoggedIn) {
      navigate(`/home/${homeId}`);
    } else {
      navigate("/login", { state: { homeId } });
    }
  };

  // Handle 'View More' click to show additional homes
  const handleViewMore = () => {
    setVisibleHomesCount((prevCount) => prevCount + 9);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Find Your Perfect Home</h1>

        {/* Search and Filter UI */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Search homes by title, area, or type..."
            className="flex-grow p-4 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          />

          <select
            name="forRent"
            value={filters.forRent}
            onChange={handleFilterChange}
            className="p-4 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          >
            <option value="">PG</option>
            <option value="true">Boy's</option>
            <option value="false">Girl's</option>
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="p-4 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          >
            <option value="">Price Range</option>
            <option value="0-1000">0 - 1000</option>
            <option value="1001-2000">1001 - 2000</option>
            <option value="2001-3000">2001 - 3000</option>
            <option value="18001-19000">18001-19000</option>
          </select>

          <select
            name="bhk"
            value={filters.bhk}
            onChange={handleFilterChange}
            className="p-4 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
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
            className="p-4 border border-blue-200 rounded-lg shadow-md bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-blue-400"
          >
            <option value="">Home Type</option>
            <option value="Independent">Independent</option>
            <option value="Dependent">Dependent</option>
          </select>
        </div>

        {/* Homes List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHomes.length > 0 ? (
            filteredHomes.slice(0, visibleHomesCount).map((home) => (
              <div
                key={home._id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
              >
                <img
                  src={home.imageUrl}
                  alt={home.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">{home.title}</h2>
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
                <p className="text-gray-600 mb-2">
                  <strong>Home Type:</strong> {home.homeType}
                </p>
                <button
                  onClick={() => handleViewDetails(home._id)}
                  className="mt-4 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <CardSkeleton/>
          )}
        </div>

        {/* "View More" Button */}
        {filteredHomes.length > visibleHomesCount && (
          <div className="text-center mt-8">
            <button
              onClick={handleViewMore}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
