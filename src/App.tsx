import React from "react";
import Pagination from "./components/Pagination/Pagination";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ItemCard from "./components/ItemCard";
import { items } from "./Utils/data";

const App = () => {
  const handlePageChange = ({ selected }: { selected: number }) => {
    console.log("hi");
  };
  return (
    <>
      <div className=" grid md:grid-cols-2 gap-16 p-8">
        {items.map((item) => (
          <ItemCard
            id={item.id}
            totalFiles={item.totalFiles}
            foundedDate={item.foundedDate}
            imgUrl={item.imgUrl}
            label={item.label}
            description={item.description}
          />
        ))}
      </div>
      <Pagination pageCount={4} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
};
export default App;
