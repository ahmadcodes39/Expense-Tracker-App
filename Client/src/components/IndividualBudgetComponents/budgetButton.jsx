import React from "react";

const BudgetButton = ({ color, text, icon ,onClick}) => {
  return (
    <button
    onClick={onClick}
      className={`cursor-pointer flex items-center px-4 py-2 rounded-md text-white shadow-md hover:shadow-[0px_4px_15px_rgba(0,0,0,0.3)] hover:bg-opacity-90 transition-all duration-300 ${color}`}
    >
      {icon && <span className="mr-2">{icon}</span>} 
      <span>{text}</span>
    </button>
  );
};

export default BudgetButton;
