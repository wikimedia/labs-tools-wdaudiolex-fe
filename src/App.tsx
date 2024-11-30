import React from "react";
import Pagination from "./components/Pagination/Pagination";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MUIDemo from "./components/MUIDemo";
import Box from "@mui/material/Box";

const App = () => {
  const handlePageChange = ({ selected }: { selected: number }) => {
    console.log("hi");
  };

  return (
    <Box>
      <Navbar />
      <MUIDemo /> {/* New Material UI demo component */}
      <Pagination pageCount={4} onPageChange={handlePageChange} />
      <Footer />
    </Box>
  );
};

export default App;
