import React from "react";
import { Link } from "react-router-dom";

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
                <Link to="/login" className="hover:text-teal-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-teal-400">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-teal-400 hover:text-teal-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
