import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../util/firebase";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <nav>
      {/* <Link to="/app" style={{ color: "white" }}>
        {user ? user.displayName : "Not Logged In"}
      </Link> */}
      <img className="w-10 rounded-full" src={user?.photoURL} alt="" />
    </nav>
  );
};

export default TopNav;
