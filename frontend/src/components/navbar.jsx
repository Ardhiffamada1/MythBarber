import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ token, handleLogout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold">
            MythBarber
          </Link>
        </div>
        <ul className="flex space-x-6">
          {!token ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="flex items-center hover:text-teal-400"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center hover:text-teal-400"
                >
                  <FaUserPlus className="mr-2" /> Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center text-teal-400 hover:text-teal-600"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
