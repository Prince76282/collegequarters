// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase.config';

export const useAuth = () => {
  const { setUser } = useContext(AuthContext);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser({
        email: user.email,
        username: user.displayName || 'No username',
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error; 
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        email: user.email,
        username: user.displayName || 'No username',
      });
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  return { login, loginWithGoogle };
};
