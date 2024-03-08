import axios from "axios";
import { getAuthToken } from "./authStorage";
const Services = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export default Services;
