import React, { useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { PiMoonFill } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
const AppLogo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="flex items-center">
      <img
        src="/Images/logo.png"
        alt="Logo"
        className="rounded-full w-10 flex items-center justify-center"
      />
      <p className="text-2xl font-bold">finTrack</p>
      
      {isDarkMode ? (
        <IoSettingsOutline 
          className="ml-auto text-lg mr-0.5 cursor-pointer"
          onClick={toggleTheme}
        />
      ) : (
        <PiMoonFill
          className="ml-auto text-lg mr-0.5 cursor-pointer"
          onClick={toggleTheme}
        />
      )}
    </div>
  );
};

export default AppLogo;
