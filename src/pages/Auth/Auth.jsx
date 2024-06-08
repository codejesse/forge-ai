import React from "react";
import logo from "../../assets/logo.png";

const Auth = () => {
  return (
    <div className="flex justify-center m-auto h-screen">
      <div className="grid grid-cols-2 p-12 border m-auto bg-white w-fit rounded-[40px] bg-auth-bg bg-no-repeat bg-bottom-left h-[400px]">
        <div className="flex flex-col">
          <img className="w-40 ml-[-20px]" src={logo} alt="forge-logo" />
          <h2 className="font-inter font-medium text-[35px]">Sign in</h2>
          <p className="font-inter font-light text-[18px]">
            to get started with forge-scheduler
          </p>
        </div>
        <div>
          <button>Continue with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
