import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchProducts from '../api';
import { useAnswers } from '../context/AnswersContext';
import Product from "./Product";

function ResultPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // track current page
  const productsPerPage = 5;
  const navigate = useNavigate();
  const { answers } = useAnswers();

  useEffect(() => {
      fetchProducts()
      .then(result => {
        setProducts(filterProducts(result));
      })
    },
    []
  );
  const totalPages = Math.ceil(products.length / productsPerPage); // products must be fetched first

  const filterProducts = (allProducts) => {
    let filtered =  allProducts.filter(product => {
      const productText = `${product.title} ${product.body_html} ${product.tags.join(' ')}`.toLowerCase(); // include all the search attrs
      return Object.values(answers).some(answer => // search for every answer
        productText.includes(answer.toLowerCase())
      );
    });
    return filtered;
  };
  

  function getCurrentPageProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className='top-result-container'>
        <h1>Build you everyday self care routine.</h1>
        <p>Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day.</p>
        <button onClick={() => {navigate('/question/1');}}>Retake quiz</button>
      </div>
      <div className='bottom-result-container'>
        <div className='daily-routine'>
        <p>Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day.</p>
        </div>
        {
          getCurrentPageProducts().map(object => (
            <Product object={object} key={object.id}/>
          ))
        }
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
        </div>
      </div>
    </>
  );
};

export default ResultPage;