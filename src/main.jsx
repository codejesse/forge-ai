import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SideNav from "./components/SideNav.jsx";
import TopNav from "./components/TopNav.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/app",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="flex flex-row">
      <SideNav />
      <TopNav />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
