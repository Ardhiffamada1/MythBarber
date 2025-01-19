import React, { useState } from "react";
import { login } from "../auth";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    login(credentials)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token); // Token akan otomatis tersimpan pada localstorage
        setToken(token);
        setSuccessMessage("Login successful! Redirecting to homepage...");
        setTimeout(() => {
          navigate("/"); // Redirect after a short delay
        }, 2000);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-teal-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {error?.email && (
          <div className="text-red-600 mb-2">{error.email[0]}</div>
        )}

        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {error?.password && (
          <div className="text-red-600 mb-2">{error.password[0]}</div>
        )}

        <button
          type="submit"
          className="p-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
