import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HeaderAnt from "./Component/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RootLayout from "./pages/Root";
import { Home } from "./Component/Home";
import Protected from "./Component/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "/",
        element: <Protected />,
        children: [{ path: "/home", index: true, element: <Home /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
