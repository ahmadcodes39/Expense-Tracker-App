import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      className="flex justify-between items-center p-4 bg-white shadow-lg sticky top-0 rounded-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <section className="flex items-center">
        <motion.img
          src="/Images/logo.png"
          alt="logo"
          className="rounded-full w-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.h1
          className="text-2xl font-semibold text-blue-800"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 font-bold">fin</span>Track
        </motion.h1>
      </section>

      <section className="flex gap-6 text-md">
        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link className="text-gray-600 hover:text-blue-800 font-semibold transition-colors">
            Dashboard
          </Link>
          <Link className="text-gray-600 hover:text-blue-800 font-semibold transition-colors">
            Budgets
          </Link>
          <Link className="text-gray-600 hover:text-blue-800 font-semibold transition-colors">
            Expenses
          </Link>
          <Link className="text-gray-600 hover:text-blue-800 font-semibold transition-colors">
            Bills & Payment
          </Link>
          <Link className="text-gray-600 hover:text-blue-800 font-semibold transition-colors">
            Analytics
          </Link>
        </motion.div>
      </section>

      <section className="flex">
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            to="/login"
            className="px-3 py-1 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md font-medium hover:bg-blue-500 hover:text-white transition-colors"
          >
            Sign Up
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Header;
