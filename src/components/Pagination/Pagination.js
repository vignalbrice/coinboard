import React from "react";

const Pagination = ({ pageNumbers, handleClick }) => {
  return (
    <div>
      <ul id="page-numbers">
        {pageNumbers.map((number) => (
          <li key={number} id={number} onClick={handleClick}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
