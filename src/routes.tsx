import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ContributionsPage from "./pages/ContributionsPage";
import HelpPage from "./pages/HelpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "contributions", element: <ContributionsPage /> },
      { path: "help", element: <HelpPage /> }
    ]
  }
]);

export default router;
