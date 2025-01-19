import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Set token untuk autentikasi API
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logged out successfully!");
  };

  return (
    <Router>
      <div className="App">
        <Navbar token={token} handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                  <h1 className="text-3xl font-semibold mb-6">
                    Welcome back to MythBarber!
                  </h1>
                  <p className="mb-4">You are logged in.</p>
                  <Link
                    to="/profile"
                    className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
                  >
                    Go to your Profile
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-screen">
                  <h1 className="text-3xl font-semibold mb-6">
                    Welcome to MythBarber!
                  </h1>
                  <p className="mb-4">
                    Please log in or register to get started.
                  </p>
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )
            }
          />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
