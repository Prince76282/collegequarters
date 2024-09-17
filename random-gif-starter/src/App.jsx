import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import LandingPage from './components/LandingPage'; 
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import HomeDetail from "./components/HomeDetail";
import TermsOfService from './components/TermsOfService'; // Import TermsOfService page
import PrivacyPolicy from './components/PrivacyPolicy'; // Import PrivacyPolicy page
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user } = useAuth0();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/home/:id" element={
              <ProtectedRoute>
                <HomeDetail />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
