import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../util/firebase";
import { db } from "../util/firebase";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/app");
    }

    if (!authToken) {
      navigate("/signin");
      //   message("Please login");
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userName = user.displayName.split(" ")[0];
        createUserDocument(uid, user);
        setUserName(userName);
      } else {
        console.log("user is logged out");
        navigate("/signin");
      }
    });

    const createUserDocument = async (uid, user) => {
      const userRef = doc(db, "users", uid);
      const userData = {
        uid,
        email: user.email,
      };
      await setDoc(userRef, userData);
    };
  }, []);
  return (
    <div className="ml-80">
      <div className="border w-full">
        <main className="main flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0">
          <div className="p-3">
            <div className="bg-white w-full">testing...</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
