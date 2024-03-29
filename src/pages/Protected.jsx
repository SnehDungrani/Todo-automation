import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Home from "../Component/Home";
import TaskContext from "../store/task-context";

const Protected = () => {
  const { logOut } = useContext(TaskContext);
  const token = localStorage?.getItem("token");
  return token ? <Home /> : <Navigate to="/login" replace /> || logOut;
};

export default Protected;
