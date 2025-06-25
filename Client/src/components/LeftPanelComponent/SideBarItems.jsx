import React from "react";

const SideBarItems = ({ Icon, title, isSelected, onClick }) => {
  return (
    <section
      className={`flex items-center gap-3 py-2 px-4 w-full rounded-lg cursor-pointer 
        transition-all duration-300 
        ${isSelected ? "bg-blue-700 text-white shadow-md" : "hover:bg-blue-100"} 
      `}
      onClick={onClick}
    >
      <Icon
        className={`text-lg transition-all duration-300 
          ${isSelected ? "text-white" : "text-blue-700 group-hover:text-blue-900"}
        `}
      />
      <p className={`text-base font-medium transition-all duration-300 
        ${isSelected ? "text-white" : "text-gray-700 group-hover:text-blue-900"}
      `}>
        {title}
      </p>
    </section>
  );
};

export default SideBarItems;
