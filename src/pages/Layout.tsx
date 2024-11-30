import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination/Pagination";
import Navbar from "../components/navbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handlePageChange = ({ selected }: { selected: number }) => {
    console.log("hi");
  };

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        {/* Button to navigate to the Material UI Demo page */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/mui-demo")}
        >
          View Material UI Demo Page by Bovimaoco
        </Button>
      </Box>
      <Outlet />
      <Pagination pageCount={24} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
};

export default Layout;
