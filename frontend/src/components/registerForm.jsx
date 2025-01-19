import React, { useState } from "react";
import { register } from "../auth";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    register(formData)
      .then((response) => {
        setSuccessMessage("Registration successful! Please log in.");
      })
      .catch((error) => {
        setError(error.response.data.errors);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-teal-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700   border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {Object.keys(error).map((key) => (
              <div key={key}>
                <strong>{key}:</strong> {error[key][0]}
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {error?.name && (
          <div className="text-red-600 mb-2">{error.name[0]}</div>
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <button
          type="submit"
          className="p-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
