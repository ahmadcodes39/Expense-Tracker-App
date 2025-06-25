import React from "react";
import { FaUtensils, FaHome, FaCar } from "react-icons/fa";
import { MdOutlineEmojiEvents } from "react-icons/md";

const dummyTopCategories = [
  {
    name: "Food & Dining",
    icon: <FaUtensils />,
    total: 480,
    badge: "Overspent",
  },
  {
    name: "Home Utilities",
    icon: <FaHome />,
    total: 320,
    badge: "Under Control",
  },
  {
    name: "Transport",
    icon: <FaCar />,
    total: 270,
    badge: "Under Control",
  },
];

const TopExpenseCategory = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <MdOutlineEmojiEvents className="text-yellow-500 text-2xl" />
          Top Categories
        </h2>
      </div>

      <div className="space-y-4">
        {dummyTopCategories.map((category, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className="text-blue-600 text-xl">{category.icon}</div>
              <div>
                <h4 className="font-medium text-gray-800">{category.name}</h4>
                <p className="text-sm text-gray-500">${category.total} spent</p>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                category.badge === "Overspent"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {category.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopExpenseCategory;
