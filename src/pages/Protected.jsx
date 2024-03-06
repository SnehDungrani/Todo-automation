import React from "react";
import { Navigate } from "react-router-dom";
import { Home } from "../Component/Home";

const Protected = () => {
  const token = localStorage?.getItem("token");
  return token ? <Home /> : <Navigate to="/login" />;
};

export default Protected;
