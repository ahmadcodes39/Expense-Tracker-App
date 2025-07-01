import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineSavings, MdOutlinePayments } from "react-icons/md";
import { FaDolly } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import SideBarItems from "./SideBarItems";
import { Link, useLocation } from "react-router-dom";
import AppLogo from "../Common/AppLogo";
import ProfilePic from "./ProfilePic";
import { useNavigate } from "react-router-dom";

const LeftPanel = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", title: "Dashboard", icon: LuLayoutDashboard },
    { path: "/budgets", title: "Budgets", icon: MdOutlineSavings },
    { path: "/expenses", title: "My Expenses", icon: FaDolly },
    { path: "/payments", title: "Bills & Payments", icon: MdOutlinePayments },
    { path: "/reports", title: "Reports", icon: TbBrandGoogleAnalytics },
  ];

  return (
    <div className="flex flex-col h-screen gap-8 px-1 py-6 bg-gray-100 border-r border-gray-300">
      <AppLogo />

      <div className="flex flex-col gap-2 w-full">
        <ProfilePic />
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path} className="w-full">
            <SideBarItems
              Icon={item.icon}
              title={item.title}
              isSelected={selectedItem === item.path}
              onClick={() => setSelectedItem(item.path)}
            />
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex justify-center items-center gap-3 px-4 py-2 rounded-lg bg-red-500 text-white 
        font-medium transition duration-300 hover:bg-red-600 shadow-md"
      >
        <BiLogOut className="text-lg" onClick={handleLogout} />
        Logout
      </button>
    </div>
  );
};

export default LeftPanel;
