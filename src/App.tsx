import React from "react";
import Header from "./layout/Header";
import Pagination from "./components/Pagination/Pagination";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
    const handlePageChange = ({ selected }: { selected: number }) => {
      console.log('hi');
    };
  return (
    <>
      <Header />
      <Navbar />
      <Pagination
        pageCount={24}
        onPageChange={handlePageChange}
      />
    <Header />
    <Footer/>
    </>
  )
}
export default App;
