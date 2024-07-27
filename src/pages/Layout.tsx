import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import Footer from "../components/Footer";
import Button from "../components/button";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <SearchInput onSearch={''}/>
      <Footer />
      <Button label="Login" onClick={()=>{}} />
    </>
  );
};

export default Layout;
