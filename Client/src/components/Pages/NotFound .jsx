import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mt-2">Oops! The page you're looking for does not exist.</p>
      <Link to="/dashboard" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
