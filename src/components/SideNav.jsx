import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../util/firebase";
import { fetchAllSchedules } from "../services/FirestoreService";
import { LogoutRounded, ScheduleOutlined } from "@mui/icons-material";

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
        {/* allow schedules to be scrollable */}
        <div className="snap-y snap-mandatory overflow-y-scroll h-[150px]">
          <ul>
            {schedules.map((schedule) => (
              <div className="rounded-full">
                {/* {console.log(schedule.id)} */}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-inter active:bg-[#f8f9fc] text-black"
                      : "font-inter bg-none text-gray-500"
                  }
                  to={`/schedules/${schedule.id}`}
                >
                  <li
                    key={schedule.id}
                    className="flex flex-row cursor-pointer text-ellipsis overflow-hidden ..."
                  >
                    <ScheduleOutlined className="mr-2" />
                    {schedule.scheduleTitle}
                  </li>
                </NavLink>
              </div>
            ))}
          </ul>
        </div>
        <hr className="mt-10" />
        <p onClick={logout} className="cursor-pointer mt-4">
          {" "}
          <LogoutRounded className="mr-2" />
          logout
        </p>
      </div>
    </div>
  );
};

export default SideNav;
