import React, { useState } from "react";
import AppLogo from "../Common/AppLogo";
import { Link } from "react-router-dom";
import { updatePassword } from "../../utils/ApiRoutes";
import toast from "react-hot-toast";
// import { useUser } from "../AppContext/UserContext";
import { useParams } from "react-router-dom";

const UpdatePassword = () => {
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pass.trim()) {
      toast.error("Password cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await updatePassword(id, pass);

      if (response?.user) {
        toast.success(response.message || "Password updated successfully!");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Update Password Error:", error);
      toast.error(error.response?.data?.error || "Failed to update password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="flex flex-col justify-center items-center px-6 py-6 w-full md:w-[45%] shadow-lg rounded-xl bg-white">
        <AppLogo />
        <h2 className="text-2xl font-bold mt-1 text-blue-700">
          Update Password
        </h2>
        <p className="text-gray-500 text-sm">
          Enter a new password to update your account
        </p>

        {/* New Password Form */}
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <label className="block text-gray-700 text-sm mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your new password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
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
            {loading ? "Processing..." : "Update Password"}
          </button>
        </form>

        {/* Back to Sign In Link */}
        <p className="text-sm text-gray-500 mt-3">
          Back to{" "}
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

export default UpdatePassword;
