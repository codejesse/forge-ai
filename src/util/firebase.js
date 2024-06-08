// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
​​import {
    ​​  GoogleAuthProvider,
    ​​  getAuth,
    ​​  signInWithPopup,
    ​​  signInWithEmailAndPassword,
    ​​  createUserWithEmailAndPassword,
    ​​  sendPasswordResetEmail,
    ​​  signOut,
    ​​} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnqrs-r6CdWVaUYCbNL9oOP07WMfpCENQ",
  authDomain: "forge-ai-d8df1.firebaseapp.com",
  projectId: "forge-ai-d8df1",
  storageBucket: "forge-ai-d8df1.appspot.com",
  messagingSenderId: "271498666029",
  appId: "1:271498666029:web:4f5aea93cb0253324058a4",
  measurementId: "G-8JXBW4DPJ0",
};

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// function for logging users out
const logout = () => {
    signOut(auth);
  };

export {
    auth,
    db,
    signInWithGoogle,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
