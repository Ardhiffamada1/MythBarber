import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Register
export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Login
export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};
