import React from "react";
import keyIcon from "../assets/Key.svg";
import { Link } from "react-router-dom";

const AddKeyBanner = () => {
  return (
    <div className="flex flex-row gap-4 bg-white p-4 h-[140px] rounded-[25px]">
      <div className="my-auto">
        <img className="w-14" src={keyIcon} alt="key-icon" />
      </div>
      <div className="flex flex-col my-auto">
        <h2 className="font-inter font-medium text-[30px]">Use your api key</h2>
        <p className="font-inter font-light text-[12px] text-[#92959E]">
          To continue using the application you can use your own api key from
          the gemini studio
        </p>
      </div>
      <div className="flex m-auto w-4/12 justify-end">
        <Link target="_blank" to="https://aistudio.google.com/app">
          <button className="bg-[#0B4AEB] font-inter text-white p-3 px-11 rounded-full">
            Get your own api key
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddKeyBanner;
