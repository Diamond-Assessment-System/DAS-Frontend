import React from "react";
import ReactPaginate from "react-paginate";
import '../Paginate/Pagination.css'; 

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      pageClassName={"page"}
      activeClassName={"active"}
      previousClassName={"page"}
      nextClassName={"page"}
      disabledClassName={"disabled"}
    />
  );
};

export default Pagination;
