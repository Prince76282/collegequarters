import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [savedHomes, setSavedHomes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const loggedUser = {
          name: currentUser.displayName,
          email: currentUser.email,
          phone: currentUser.phoneNumber || 'Not available',
        };
        setUser(loggedUser);
        setUpdatedName(loggedUser.name);
        setUpdatedPhone(loggedUser.phone);

        axios.get(`http://localhost:5000/api/users/${loggedUser.email}`)
          .then(response => {
            setSavedHomes(response.data.savedHomes || []);
          })
          .catch(error => {
            console.error('Error fetching saved homes:', error.message);
          });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteFavorite = async (homeId) => {
    try {
      await axios.delete('http://localhost:5000/api/favorites/remove', {
        data: { email: user.email, homeId },
      });

      const updatedHomes = savedHomes.filter((home) => home.id !== homeId);
      setSavedHomes(updatedHomes);
      localStorage.setItem('savedHomes', JSON.stringify(updatedHomes));
    } catch (error) {
      console.error('Error deleting favorite:', error.message);
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
          phoneNumber: updatedPhone,
        });

        await axios.put(`http://localhost:5000/api/users/${user.email}`, {
          name: updatedName,
          phone: updatedPhone,
        });

        setUser({ ...user, name: updatedName, phone: updatedPhone });
        setIsEditing(false);
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error.message);
      }
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <button
          onClick={() => navigate('/home')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded mb-4"
        >
          Back to Home
        </button>

        <h2 className="text-2xl font-bold mb-4 text-left">Profile Information</h2>
        <div className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 font-bold">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-600">{user.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Phone</label>
            {isEditing ? (
              <input
                type="text"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-600">{user.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Email</label>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit
          </button>
        )}

        <h1 className="text-4xl font-bold mb-6 text-left mt-8">Your Favorites</h1>
        {savedHomes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {savedHomes.map((home) => (
              <div key={home.id} className="bg-white p-4 rounded-lg shadow-md">
                <Link to={`/home/${home.id}`} className="cursor-pointer hover:bg-gray-200">
                  <div className="relative">
                    <img
                      src={home.imageUrls}
                      alt={home.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-left">{home.title}</h2>
                  <p className="text-left"><strong>Area:</strong> {home.area}</p>
                  <p className="text-left"><strong>Price:</strong> ${home.price}</p>
                </Link>
                <div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    onClick={() => deleteFavorite(home.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-left">No favorites yet.</p>
        )}

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
