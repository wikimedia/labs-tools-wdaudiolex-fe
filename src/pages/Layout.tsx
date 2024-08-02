import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination/Pagination";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      
    </>
  );
};

export default Layout;
