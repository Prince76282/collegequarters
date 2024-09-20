import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase.config";
import { FaUser, FaSignInAlt, FaHeart } from "react-icons/fa";
import logo from "../image/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
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

  const handleMenuItemClick = (path) => {
    setIsMobileMenuOpen(false); 
    navigate(path);
  };

  const isProfilePage = location.pathname === "/profile";
  const isHomePage = location.pathname === "/";
  const isServicePage = location.pathname === "/service";
  const isFavoritesPage = location.pathname === "/favorites";

  return (
    <nav className="bg-gray-500 text-white shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-18 w-24" />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/home" className={`px-4 py-2 rounded-lg ${isHomePage ? "bg-blue-600 text-white" : "bg-gray-300 text-black hover:bg-blue-400 hover:text-white"}`}>Home</Link>
          <Link to="/service" className={`px-4 py-2 rounded-lg ${isServicePage ? "bg-blue-600 text-white" : "bg-gray-300 text-black hover:bg-blue-400 hover:text-white"}`}>Services</Link>
          
          {loading ? (
            <div className="w-28 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
          ) : isLoggedIn ? (
            <button onClick={() => handleMenuItemClick("/profile")} className={`px-4 py-2 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-400 ${isProfilePage ? "opacity-50 cursor-default" : ""}`} disabled={isProfilePage}>
              <FaUser className="mr-2" /> {user?.displayName || "Profile"}
            </button>
          ) : (
            <button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-400">
              <FaSignInAlt className="mr-2" /> Login
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
            {isMobileMenuOpen ? '✖️' : '☰'}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-600 p-4">
          <Link to="/home" className={`block px-4 py-2 rounded-lg ${isHomePage ? "bg-blue-600 text-white" : "hover:bg-blue-400 hover:text-white"}`} onClick={() => handleMenuItemClick("/")}>Home</Link>
          <Link to="/service" className={`block px-4 py-2 rounded-lg ${isServicePage ? "bg-blue-600 text-white" : "hover:bg-blue-400 hover:text-white"}`} onClick={() => handleMenuItemClick("/service")}>Services</Link>
          
          {loading ? (
            <div className="w-28 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
          ) : isLoggedIn ? (
            <button onClick={() => handleMenuItemClick("/profile")} className="block w-full text-left px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400">
              <FaUser className="mr-2" /> {user?.displayName || "Profile"}
            </button>
          ) : (
            <button onClick={() => navigate("/login")} className="block w-full text-left px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
              <FaSignInAlt className="mr-2" /> Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
