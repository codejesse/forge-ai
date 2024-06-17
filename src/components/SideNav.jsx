import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../util/firebase";
import { fetchAllSchedules } from "../services/FirestoreService";

const SideNav = () => {
  const [schedules, setSchedules] = useState([]);
  //   const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSchedules = await fetchAllSchedules();
      setSchedules(fetchedSchedules);
    };
    fetchData();
  }, [fetchAllSchedules]);
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
        <ul>
          {schedules.map((schedule) => (
            <li
              className="flex flex-row text-ellipsis overflow-hidden ..."
              key={schedule.id}
            >
              🤞🏾
              {schedule.scheduleTitle}
            </li>
          ))}
        </ul>
        <hr />
        <p onClick={logout} className="cursor-pointer">
          {" "}
          logout
        </p>
      </div>
    </div>
  );
};

export default SideNav;
