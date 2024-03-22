import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RootLayout from "./pages/Root";
import Protected from "./pages/Protected";
import WelcomePage from "./pages/WelcomePage";
import Home from "./Component/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: "/",
        element: <Protected />,
        children: [{ path: "/home", index: true, element: <Home /> }],
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
