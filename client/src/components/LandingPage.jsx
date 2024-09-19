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
        const title = home.title?.toLowerCase() || '';
        const area = home.area?.toLowerCase() || '';
        const homeType = home.homeType?.toLowerCase() || '';
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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Find Your Perfect Home</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search homes by title, area, or type..."
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Home Type</option>
            <option value="Independent">Independent</option>
            <option value="Dependent">Dependent</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHomes.length > 0 ? (
            filteredHomes.map((home) => (
              <div
                key={home._id}
                className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
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
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleViewDetails(home._id)}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
