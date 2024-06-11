import React from "react";
import Logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { logout } from "../util/firebase";

const SideNav = () => {
  //   const { pathname } = useLocation();
  return (
    // <div className={`fixed bg-white flex flex-col w-[250px] p-8 h-screen ${pathname === '/' ? "hidden" : "flex"}`}>
    <div className={`fixed bg-white flex flex-col w-[250px] p-8 h-screen`}>
      <div className="h-fit mx-left">
        <img className="w-25 h-fit ml-[-13px]" src={Logo} alt="forge-logo" />
      </div>
      {/* sidenav links */}
      <div className="mt-10">
        <h4 className="font-inter font-medium text-[#555555] text-[15px]">
          Schedules
        </h4>
        <p onClick={logout} className="cursor-pointer"> logout</p>
      </div>
    </div>
  );
};

export default SideNav;
