import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { logout } from "../util/firebase";
import { fetchAllSchedules } from "../services/FirestoreService";

const SideNav = () => {
  const [schedules, setSchedules] = useState([]);

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
        <Link to="/app">
          <img className="w-25 h-fit ml-[-13px]" src={Logo} alt="forge-logo" />
        </Link>
      </div>
      {/* sidenav links */}
      <div className="mt-10">
        <h4 className="font-inter font-medium text-[#555555] text-[15px]">
          Schedules
        </h4>
        <ul>
          {schedules.map((schedule) => (
            <div className="hover:bg-[#f8f9fc] rounded-full">
              {/* {console.log(schedule.id)} */}
              <Link to={`/schedules/${schedule.id}`}>
                <li
                  key={schedule.id}
                  className="flex flex-row cursor-pointer text-ellipsis overflow-hidden ..."
                >
                  🤞🏾
                  {schedule.scheduleTitle}
                </li>
              </Link>
            </div>
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
