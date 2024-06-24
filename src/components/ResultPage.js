import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchProducts from '../api';
import { useAnswers } from '../context/AnswersContext';
import Product from "./Product";
import '../styles/resultpage.css';
import '../styles/startpage.css';
import bannerImage from '../assets/images/Rectangle.png';
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PaginationCircles from './PaginationCircles';

function ResultPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;
  const navigate = useNavigate();
  const { answers } = useAnswers();

  useEffect(() => {
    fetchProducts().then(result => {
      setProducts((result));
    });
  }, []);

  useEffect(() => {
    setProducts(prevProducts => (prevProducts = filterProducts(prevProducts)))
  },[answers]);


  const totalPages = Math.ceil(products.length / productsPerPage);

  const filterProducts = (allProducts) => {
    let filtered =  allProducts.filter(product => {
      const productText = `${product.title} ${product.body_html} ${product.tags.join(' ')}`.toLowerCase();
      return Object.values(answers).some(answer =>
        productText.includes(answer.toLowerCase())
      );
    });
    return filtered;
  };

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

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
    <section className='result-wrapper'>
      <div className='img-container'>
        <img src={bannerImage} alt='Result Banner Image' />
      </div>
      <div className='top-result-container'>
        <h1>Build you everyday self care routine.</h1>
        <p className='special-line-height'>Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day.</p>
        <button onClick={() => { navigate('/question/1'); }} className='transparent'>Retake the quiz</button>
      </div>
      <div className='bottom-result-container'>
        <div className='daily-routine'>
          <h1>Daily routine</h1>
          <p>Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day.</p>
        </div>
        {
          getCurrentPageProducts().map(object => (
            <Product object={object} key={object.id} />
          ))
        }
        <div className="pagination">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            style={currentPage === 1 ? {display: 'none'} : {display: 'inline-block'}}
            className='pagination-button backpage'
          >
            <FontAwesomeIcon icon={faLessThan} />
          </button>
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages} 
            style={(currentPage === totalPages) || (totalPages === 0) ? {display: 'none'} : {display: 'inline-block'}}
            className='pagination-button'
          >
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      </div>
      <div className='pagination-counter-container'>
            <PaginationCircles totalPages={totalPages} currentPage={currentPage} />
      </div>
    </section>
  );
}

export default ResultPage;
