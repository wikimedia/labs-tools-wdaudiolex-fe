import React, {useEffect} from "react";
import Pagination from "./components/Pagination/Pagination";
import Footer from "./components/Footer";
import ItemCard from "./components/ItemCard";
import { itemData } from "./Utils/data";
import { ItemStore } from "../Zustand/ItemStore";

const App = () => {
  const { getItems, items, searchedItems } = ItemStore()
  const handlePageChange = ({ selected }: { selected: number }) => {
    console.log("hi");
  };

  useEffect(()=>{
    getItems(itemData)
  },[])
  const data = searchedItems.length > 0 ? searchedItems : items
  return (
    <>
      <div className=" grid md:grid-cols-2 gap-16 p-8">
        {data.map((item) => (
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
