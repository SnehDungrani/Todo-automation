import axios from "axios";
import { getAuthToken } from "./authStorage";

const Services = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL ?? "https://todo-6-4clg.onrender.com/api/v1",
  // timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export default Services;
