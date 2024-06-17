import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../util/firebase";
import { Link } from "react-router-dom";
import { KeyOutlined } from "@mui/icons-material";
import AddKeyModal from "./AddKeyModal";

const TopNav = ({ scheduleTitle }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="pt-8 ml-72 mr-10">
      <div className="bg-none">
        <div className="flex-col flex">
          <div className="w-full">
            <div className="bg-none h-16 justify-between items-center mx-auto px-4 flex">
              <div className="flex flex-col">
                <h2 className="font-inter font-regular text-[35px]">
                  {scheduleTitle || "Dashboard"}
                </h2>
                <p className="font-inter font-light text-[15px] text-[#92959E]">
                  Lets get started with your new schedule
                </p>
              </div>
              <div className="lg:block mr-auto ml-40 hidden relative max-w-xs"></div>
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <div className="justify-center items-center flex relative">
                  <div className="mr-8">
                    <AddKeyModal />
                  </div>
                  <img
                    className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300"
                    src={user?.photoURL}
                    alt="user-image"
                  />
                  <p className="hidden font-semibold text-sm">
                    {user?.displayName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
