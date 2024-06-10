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
import { KeyOutlined } from "@mui/icons-material";
import AddKeyBanner from "../components/AddKeyBanner";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/app");
    }

    if (!authToken) {
      navigate("/");
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
        navigate("/");
      }
    });

    const createUserDocument = async (uid, user) => {
      const userRef = doc(db, "users", uid);
      const userData = {
        uid,
        email: user.email,
        api_key: ""
      };
      await setDoc(userRef, userData);
    };
  }, []);
  return (
    <div className="ml-72 mr-10 mt-8">
      <div className="w-full">
        <main className="main flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0">
          <div className="p-3">
            <AddKeyBanner />
            <div className="bg-white mt-5 rounded-[30px]">
              <div className="p-10">
                <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-inter font-semibold text-[40px]">
                  Hello, {userName}
                </h1>
                <h1 className="font-inter font-medium text-[35px] text-[#C4C4C4]">
                  What are you scheduling today?
                </h1>
              </div>
              {/* Example prompts */}
              {/* CHORE: make this resuable and once clicked pushed to prompt-state allowing the user modify and send as prompt */}
              <div className="grid grid-cols-4 gap-4 p-8 m-auto">
                <div className="bg-[#F8F9FC] rounded-[15px] p-6 h-[240px]">
                  <p className="font-inter font-light text-[15px] w-full">
                    I have a test to prepare for next week Monday give me a
                    schedule with these courses and their intensity...
                  </p>
                </div>
                <div className="bg-[#F8F9FC] rounded-[15px] p-6 h-[240px]">
                  <p className="font-inter font-light text-[15px] w-full">
                    I have a test to prepare for next week Monday give me a
                    schedule with these courses and their intensity...
                  </p>
                </div>
                <div className="bg-[#F8F9FC] rounded-[15px] p-6 h-[240px]">
                  <p className="font-inter font-light text-[15px] w-full">
                    I have a test to prepare for next week Monday give me a
                    schedule with these courses and their intensity...
                  </p>
                </div>
                <div className="bg-[#F8F9FC] rounded-[15px] p-6 h-[240px]">
                  <p className="font-inter font-light text-[15px] w-full">
                    I have a test to prepare for next week Monday give me a
                    schedule with these courses and their intensity...
                  </p>
                </div>
              </div>
              {/* Input for prompting */}
              <div className="p-8 mt-[-20px]">
                <input
                  className="bg-[#F8F9FC] font-inter text-[14px] p-5 w-full rounded-full"
                  placeholder="Enter what needs to be scheduled"
                  type="text"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
