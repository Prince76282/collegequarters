import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase.config'; 
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import logo from '../image/logo.png'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login'); 
  };

  const isProfilePage = location.pathname === '/profile';

  return (
    <nav className="bg-gray-500 text-white shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-18 w-24" /> {/* Adjust the height as needed */}
          </Link>
        </div>
        <div className="flex items-center  space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfile}
                className={`px-4 py-2 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-400 ${
                  isProfilePage ? 'opacity-50 cursor-default' : ''
                }`}
                disabled={isProfilePage}
              >
                <FaUser className="mr-2" />
                {user?.displayName || 'Profile'}
              </button>
            
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-400"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
