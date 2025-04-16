import React from "react";
import { Link } from "react-router-dom";

const Navlinks = () => {
  return (
    <nav className="flex items-center w-full gap-x-6 rounded-md shadow-sm border-y border-gray-700">
      <Link
        to="/"
        className="ml-10 !text-gray-300 hover:!text-gray-100 font-medium px-3 py-2 rounded-md transition-colors duration-200"
      >
        Active Question
      </Link>
      <Link
        to="/questions"
        className=" !text-gray-300 hover:!text-gray-100 font-medium px-3 py-2 rounded-md transition-colors duration-200"
      >
        Questions
      </Link>
      <Link
        to="/trades"
        className="!text-gray-300 hover:!text-gray-100 font-medium px-3 py-2 rounded-md transition-colors duration-200"
      >
        Your Trades
      </Link>
    </nav>
  );
};

export default Navlinks;
