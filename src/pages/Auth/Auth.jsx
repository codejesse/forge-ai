import React from "react";
import logo from "../../assets/logo.png";
import googleIcon from "../../assets/Google.svg";
import { signInWithGoogle } from "../../util/firebase";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

const Auth = () => {
  const navigate = useNavigate();

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGoogle();
      <Alert severity="success">
        <AlertTitle>Login success</AlertTitle>
        welcome to forge scheduler.
      </Alert>;
      navigate("/app");
      //set setisLoading with a timer of 5 secs
      sessionStorage.setItem(
        "Auth Token",
        response._tokenResponse.refreshToken
      );
    } catch (error) {
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error Alert with a scary title.
      </Alert>;
    }
  };
  return (
    <div className="flex justify-center m-auto h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 p-12 border m-auto bg-white w-fit rounded-[40px] bg-auth-bg bg-no-repeat bg-bottom-left h-[400px]">
        <div className="flex flex-col">
          <img className="w-40 ml-[-20px]" src={logo} alt="forge-logo" />
          <h2 className="font-inter font-medium text-[35px]">Sign in</h2>
          <p className="font-inter font-light text-[18px]">
            to get started with forge-scheduler
          </p>
        </div>
        <div className="m-auto">
          <button
            onClick={logGoogleUser}
            className="flex flex-row gap-3 m-auto border p-2 px-14 rounded-xl font-inter"
          >
            <img src={googleIcon} alt="google-icon" />
            <p className="m-auto"> Continue with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
