import React from "react";
import Header from "./layout/Header";
import Pagination from "./components/Pagination/Pagination";

const App = () => {
    const handlePageChange = ({ selected }: { selected: number }) => {
      // dispatch(updateListingQueryParams({ page: selected + 1 }));
      // dispatch(getListingsThunk());
      console.log('hi');
      
    };
  return (
    <>
      <Header />
      <Pagination
        pageCount={24}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default App;
