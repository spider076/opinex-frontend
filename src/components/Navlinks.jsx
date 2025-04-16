import React from "react";
import { Link } from "react-router-dom";

const Navlinks = () => {
  return (
    <nav className="flex items-center w-full gap-x-6 bg-gray-100 p-4 rounded-md shadow-sm bg-black">
      <Link
        to="/questions"
        className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-colors duration-200"
      >
        Questions
      </Link>
      <Link
        to="/profile"
        className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-colors duration-200"
      >
        Profile
      </Link>
      <Link
        to="/trades"
        className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-colors duration-200"
      >
        Your Trades
      </Link>
    </nav>
  );
};

export default Navlinks;
