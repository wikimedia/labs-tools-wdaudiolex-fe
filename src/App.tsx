import React from "react";
import Pagination from "./components/Pagination/Pagination";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
    const handlePageChange = ({ selected }: { selected: number }) => {
      console.log('hi');
    };
  return (
    <>
      <Navbar />
      <Pagination
        pageCount={4}
        onPageChange={handlePageChange}
      />
    <Footer/>
    </>
  )
}
export default App;
