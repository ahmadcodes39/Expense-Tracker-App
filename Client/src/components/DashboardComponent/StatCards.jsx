import React from "react";
import { motion } from "framer-motion";

const StatCards = ({ title, amount, icon }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        y: -5,
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 200 }}
      className="flex flex-col justify-between p-6 bg-white border-[1px] border-gray-300 rounded-xl cursor-default shadow-md"
    >
      <h2 className="text-md font-medium text-gray-600">{title}</h2>

      <div className="flex justify-between items-center mt-2">
        <h1 className="text-2xl font-bold text-gray-800">{amount}</h1>
        <div className="p-3 rounded-full bg-blue-700 text-white text-xl shadow-lg">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCards;
