import React, { useState } from "react";
import AppLogo from "../Common/AppLogo";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../utils/ApiRoutes";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email: ", email);
    if (!email.trim()) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting to send forgot password request...");
      const response = await forgotPassword(email);
      console.log("Response from API:", response);

      if (response?.message) {
        toast.success(response.message || "Check your email for reset link!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error(error.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="flex flex-col justify-center items-center px-6 py-6 w-full md:w-[45%] shadow-lg rounded-xl bg-white">
        <AppLogo />
        <h2 className="text-2xl font-bold mt-1 text-blue-700">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-sm">
          Enter your email to reset your password
        </p>

        {/* Email Reset Form */}
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <label className="block text-gray-700 text-sm mb-1">
            Email address
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
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
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Sign In Link */}
        <p className="text-sm text-gray-500 mt-3">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
