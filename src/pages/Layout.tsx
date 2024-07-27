import React from "react";
import Navbar from "../components/Navbar";
import Dropdown from "../components/dropdown";
import { Outlet } from "react-router-dom";
// import '../components/drodown.css';
import { language } from "../Utils/data";

const Layout = () => {
  
  return (
    <>
    <Dropdown placeholder='English' options={language} />
      {/* <Navbar /> */}
      {/* <Outlet /> */}
    </>
  );
};

export default Layout;