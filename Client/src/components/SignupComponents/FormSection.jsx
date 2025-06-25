import React, { useState } from "react";
import AppLogo from "../Common/AppLogo";
import SociaSignin from "../Common/SociaSignin";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../utils/ApiRoutes";
import toast from "react-hot-toast";

const FormSection = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await signupUser(userData);

      if (response?.newUser) {
        toast.success(response.message || "Registered successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
      console.error("Registration Failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start px-5 py-5 w-full md:w-[45%] shadow-lg rounded-xl bg-white">
      <AppLogo />
      <h2 className="text-xl font-bold mt-1 text-blue-700">Sign Up</h2>
      <p className="text-gray-500 text-sm">Create an account to get started</p>

      {/* Social Sign-in Buttons */}
      <div className="flex flex-col gap-2 w-full mt-3">
        <SociaSignin Icon={FcGoogle} Title={"Continue with Google"} />
        <SociaSignin Icon={FaFacebook} Title={"Continue with Facebook"} />
      </div>

      {/* OR Separator */}
      <div className="flex items-center w-full my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-xs">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="w-full">
        <label className="block text-gray-700 text-sm">Full Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Enter full name"
          onChange={handleUserData}
          value={userData.name}
          name="name"
          required
        />

        <label className="block text-gray-700 text-sm mt-2">
          Email Address
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Enter email"
          onChange={handleUserData}
          value={userData.email}
          name="email"
          required
        />

        <label className="block text-gray-700 text-sm mt-2">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Enter password"
          onChange={handleUserData}
          value={userData.password}
          name="password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-md mt-3 text-sm transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="text-xs text-gray-500 mt-2">
        Already have an account?{" "}
        <Link
          className="text-blue-600 cursor-pointer hover:underline"
          to={"/login"}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default FormSection;
