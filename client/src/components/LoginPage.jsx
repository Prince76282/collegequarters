import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { API_URL } from "../utils/key";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);

      const userInfo = {
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber || 'Not available',
        image: user.photoURL,
      };

      // Save user information to backend
      await axios.post(`${API_URL}/users`, userInfo);

      localStorage.setItem("user", JSON.stringify(userInfo));
      navigate("/home");
    } catch (error) {
      console.error("Error during sign-in: ", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      console.log("User signed out successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error during sign-out: ", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-sm mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <p className="text-gray-600 mb-8">
          Sign in to access your account and explore the best homes.
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center mx-auto"
        >
          <span className="material-icons mr-3">account_circle</span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
