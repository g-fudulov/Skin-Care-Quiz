import React from 'react';
import '../styles/paginationcircles.css'; // Ensure you have the CSS in the same directory

const PaginationCircles = (props) => {
  const circles = [];
  for (let i = 1; i <= props.totalPages; i++) {
    circles.push(
      <div
        key={i}
        className={`circle ${i === props.currentPage ? 'active' : ''}`}
      ></div>
    );
  }

  return <div className="pagination-circles">{circles}</div>;
};

export default PaginationCircles;
