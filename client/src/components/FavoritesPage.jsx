import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRupeeSign, FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { API_URL } from "../utils/key";
import CardSkeleton from "./CardSkeleton";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_URL}/favorites`); 
        setFavorites(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4 lg:p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Your Favorites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (favorites.length === 0) return <p className="text-center text-gray-600">Please add your favorites.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 lg:p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Your Favorites</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((home) => (
            <div key={home._id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={home.imageUrls[0]}
                alt={`Favorite Home ${home._id}`}
                className="w-full h-40 object-cover rounded-lg mb-4"
                style={{ maxHeight: "200px" }}
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{home.title}</h4>
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
              <a href={`/home/${home._id}`} className="text-blue-500 hover:underline">View Details</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
