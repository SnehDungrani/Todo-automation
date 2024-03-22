import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TaskContext } from "../store/task-context";
import Home from "../Component/Home";

const Protected = () => {
  const { logOut } = useContext(TaskContext);
  const token = localStorage?.getItem("token");
  return token ? <Home /> : <Navigate to="/login" replace /> || logOut;
};

export default Protected;
