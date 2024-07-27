import React from "react";
import ReactPaginate from "react-paginate";
import './pagination.css'
interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <div className=" mx-auto w-fit">
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        pageClassName='container'
        activeClassName='active'
        className="flex items-center gap-8 text-xl font-semibold my-12"   
      />
    </div>
  );
};

export default Pagination;