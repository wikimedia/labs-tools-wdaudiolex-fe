import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import Footer from "../components/Footer";
import Button from "../components/button";
import Pagination from "../components/Pagination/Pagination";

const Layout: React.FC = () => {
      const handlePageChange = ({ selected }: { selected: number }) => {
        console.log("hi");
      };
  return (
    <>
      <Navbar />
      <Outlet />
      <SearchInput onSearch={''}/>
      <Footer />
      <Button label="Login" onClick={()=>{}} />
      <Pagination pageCount={24} onPageChange={handlePageChange} />
    </>
  );
};

export default Layout;
