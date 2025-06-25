import React, { useState } from "react";
import AppLogo from "../Common/AppLogo";
import SociaSignin from "../Common/SociaSignin";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useUser } from "../AppContext/UserContext";

const FormSection = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

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
      const response = await loginUser(userData);

      if (response?.user) {
        toast.success(response.message || "Login successful!");

        const userInfo = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
        };

        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(userInfo)
        setUser(userInfo);

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(response.message || "Login failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
      console.error("Login Failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start px-5 py-5 w-[45%] max-w-md shadow-2xl rounded-lg bg-white">
      <AppLogo />
      <h2 className="text-xl font-bold mt-1 text-blue-700">Sign In</h2>
      <p className="text-gray-500 text-xs">to continue to Expense Tracker</p>

      {/* Social Sign-in Buttons */}
      <div className="flex flex-col gap-2 w-full mt-3">
        <SociaSignin Icon={FcGoogle} Title="Continue with Google" />
        <SociaSignin Icon={FaFacebook} Title="Continue with Facebook" />
      </div>

      {/* OR Separator */}
      <div className="flex items-center w-full my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-xs">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Email Login Form */}
      <form onSubmit={handleSubmit} className="w-full">
        <label className="block text-gray-700 text-xs mb-1">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Enter your email"
          value={userData.email}
          onChange={handleUserData}
          disabled={loading}
          required
        />

        <label className="block text-gray-700 text-xs mb-1 mt-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Enter your password"
          value={userData.password}
          disabled={loading}
          onChange={handleUserData}
          required
        />

        {/* Forgot Password Link */}
        <div className="text-right mt-1">
          <Link
            to="/forgot-password"
            className="text-blue-600 text-xs hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-md mt-3 text-sm transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {loading ? "Processing..." : "Sign In"}
        </button>
      </form>

      {/* Signup Link */}
      <p className="text-xs text-gray-500 mt-2">
        No account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default FormSection;
