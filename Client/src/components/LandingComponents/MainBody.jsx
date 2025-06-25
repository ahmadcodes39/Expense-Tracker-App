import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const MainBody = () => {
    return (
      <div className="flex justify-between p-4 bg-gray-100 flex-1">
        <section className="flex flex-col gap-11 w-1/2">
          <h1 className="text-7xl lg:mt-5">
            Manage Your Expenses Easily With{" "}
            <span className="text-blue-800 font-bold">finTrack</span>
          </h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            ullam eum error enim molestiae nobis voluptas eos quasi at corrupti
            veniam ipsum qui explicabo delectus laboriosam velit aut doloribus
            expedita.
          </p>
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              to="/login"
              className="block px-8 py-4 text-md w-3/4 border border-blue-900 text-blue-900 rounded-md font-semibold text-center hover:bg-blue-800 hover:text-white transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </section>
        <section className="w-1/2">
          <img src="/Images/landingLogo.png" alt="" className="w-full" />
        </section>
      </div>
    );
  };

export default MainBody;
