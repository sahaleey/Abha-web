// src/api.js
import axios from "axios";

export default axios.create({
  baseURL: "https://abha-web-1.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
