import React from "react";
import { motion } from "framer-motion";

const CategoryItem = ({ emoji, category, items, amount, spent }) => {
  const remaining = amount - spent;
  const progress = (spent / amount) * 100; 

  return (
    <motion.div
      initial={{ scale: 1, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-gray-50 p-4 rounded-2xl shadow-lg border-[1px] border-gray-300"
    >
      <div className="flex items-center gap-3">
        <span className="bg-gray-200 rounded-full flex items-center justify-center w-10 h-10 text-xl">
          {emoji}
        </span>
        <div>
          <h3 className="font-bold">{category}</h3>
          <p className="text-gray-500 text-sm">
            {items} Item{items > 1 && "s"}
          </p>
        </div>
        <div className="ml-auto font-bold text-blue-600 text-lg">${amount}</div>
      </div>

      <div className="flex justify-between text-gray-500 text-sm mt-3">
        <span>${spent} Spent</span>
        <span>${remaining} Remaining</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default CategoryItem;
