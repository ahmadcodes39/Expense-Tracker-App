import React from "react";
import { FaDollarSign, FaChartLine, FaTags, FaPiggyBank } from "react-icons/fa";
import { motion } from "framer-motion";

const ReportsSummary = () => {
  // Dummy data
  const totalExpensesToday = 135.75;
  const transactionCount = 7;
  const topCategory = "Groceries";
  const savingsRatio = 26; // percent

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const summaryData = [
    {
      label: "Spent Today",
      value: `$${totalExpensesToday}`,
      icon: <FaDollarSign className="text-blue-600 text-2xl" />,
      bg: "from-blue-100 to-white",
    },
    {
      label: "Transactions",
      value: transactionCount,
      icon: <FaChartLine className="text-indigo-500 text-2xl" />,
      bg: "from-indigo-100 to-white",
    },
    {
      label: "Top Category",
      value: topCategory,
      icon: <FaTags className="text-orange-400 text-2xl" />,
      bg: "from-orange-100 to-white",
    },
    {
      label: "Savings vs Budget",
      value: `${savingsRatio}%`,
      icon: <FaPiggyBank className="text-green-500 text-2xl" />,
      bg: "from-green-100 to-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
          className={`p-5 rounded-2xl shadow-md bg-gradient-to-br ${item.bg}`}
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
            <div>{item.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReportsSummary;
