import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDlAf5RhYTjE7PvfBRfjFUD1nID-aC8ehs",
  authDomain: "login-ceed1.firebaseapp.com",
  projectId: "login-ceed1",
  storageBucket: "login-ceed1.appspot.com",
  messagingSenderId: "733091082397",
  appId: "1:733091082397:web:0bad1cd7d1b7456060e474",
  measurementId: "G-6L7MWHGDVC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 

export { auth, provider, signInWithPopup };

