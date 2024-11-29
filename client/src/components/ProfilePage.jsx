import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import axios from "axios";
import { API_URL } from "../utils/key";
import { FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const navigate = useNavigate();

  const [savedHomes, setSavedHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const loggedUser = {
          name: currentUser.displayName,
          email: currentUser.email,
        };

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        try {
          const response = await axios.get(
            `${API_URL}/users/${loggedUser.email}`
          );
          const userData = response.data;
          setUpdatedPhone(userData.phone || "Not available");
          setSavedHomes(userData.savedHomes || []);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSavedHomes = async () => {
      try {
        const response = await axios.get(`${API_URL}/favorites`); 
        setSavedHomes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved homes:', error);
        setLoading(false);
      }
    };

    fetchSavedHomes();
  }, []);

  
  const deleteFavorite = async (homeId) => {
    try {
      await axios.delete(`${API_URL}/favorites${homeId}`); 
      setSavedHomes(savedHomes.filter((home) => home.id !== homeId));
    } catch (error) {
      console.error('Error deleting favorite home:', error);
    }
  };


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (user) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: updatedName,
        });

        const userInfo = {
          name: updatedName,
          email: user.email,
          phone: updatedPhone || "Not available",
          image: user.photoURL,
        };

        localStorage.setItem("user", JSON.stringify(userInfo));

        await axios.put(`${API_URL}/users/${user.email}`, {
          name: updatedName,
          phone: updatedPhone,
        });
        setUser(userInfo);

        setIsEditing(false);
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedin");
    });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex flex-col justify-center items-center">
      <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </button>

        <h2 className="text-3xl font-bold mb-6 text-white border-b-2 border-blue-500 pb-2">
          Profile Information
        </h2>
        <div className="space-y-6 text-left">
          <div>
            <label className="block text-white font-semibold">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            ) : (
              <p className="text-white text-lg">{user.name}</p>
            )}
          </div>
          <div>
            <label className="block text-white font-semibold">Phone</label>
            {isEditing ? (
              <input
                type="text"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            ) : (
              <p className="text-white text-lg">{user.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-white font-semibold">Email</label>
            <p className="text-white text-lg">{user.email}</p>
          </div>
        </div>

        <div className="mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 hover:bg-green-600 transition duration-300"
            >
              <FaSave /> Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 hover:bg-blue-600 transition duration-300"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>







        <div>
      <h1 className="text-3xl font-bold mb-6 mt-8 text-white border-b-2 border-blue-500 pb-2">
        Your Favorites
      </h1>
      {loading ? (
        <p className="text-white text-lg">Loading...</p>
      ) : savedHomes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {savedHomes.map((home) => (
            <div key={home._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link
                to={`/home/${home._id}`}
                className="block cursor-pointer hover:bg-gray-100 rounded-md"
              >
                <img
                  src={home.imageUrl}
                  alt={home.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {home.email}
                </h2>
                <p className="text-gray-700">
                  <strong>Area:</strong> {home.area}
                </p>
                <p className="text-gray-700">
                  <strong>Price:</strong> ${home.price}
                </p>
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition duration-300"
                onClick={() => deleteFavorite(home.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-lg">No favorites yet.</p>
      )}
    </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 hover:bg-red-600 transition duration-300"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
