import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import MUIDemo from "./components/MUIDemo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/mui-demo",
    element: <MUIDemo />,
  },
]);

export default router;
