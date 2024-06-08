// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "forge-ai-d8df1.firebaseapp.com",
  projectId: "forge-ai-d8df1",
  storageBucket: "forge-ai-d8df1.appspot.com",
  messagingSenderId: "271498666029",
  appId: "1:271498666029:web:4f5aea93cb0253324058a4",
  measurementId: "G-8JXBW4DPJ0",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account",
});

const signInWithGoogle = () => signInWithPopup(auth, provider);

// function for logging users out
const logout = () => {
  signOut(auth);
};

export { auth, signInWithGoogle, db, logout };

// Initialize Firebase
const analytics = getAnalytics(app);
