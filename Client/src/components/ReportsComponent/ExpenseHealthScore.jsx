import React from "react";
import { FaDollarSign, FaChartLine, FaTags, FaPiggyBank, FaHeartbeat } from "react-icons/fa";
import { motion } from "framer-motion";

const ExpenseHealthScore = () => {
  // Dummy data
  const totalExpensesToday = 135.75;
  const transactionCount = 7;
  const topCategory = "Groceries";
  const savingsRatio = 26;
  const habitScore = 82; // Out of 100
  const recommendation = "You're doing great! Just watch your food delivery spending.";

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
    <div className="space-y-6">
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

      {/* Expense Health Score */}
      <motion.div
        className="p-6 bg-gradient-to-br from-pink-100 to-white rounded-2xl shadow-md"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="flex items-center gap-4 mb-3">
          <FaHeartbeat className="text-pink-600 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Expense Health Score</h3>
            <p className="text-sm text-gray-600">Spending Habit Analysis</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold text-pink-700">{habitScore}/100</p>
          <div className="w-3/5">
            <p className="text-sm text-gray-700">{recommendation}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpenseHealthScore;
