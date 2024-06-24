import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/startpage.css'
import headerImg from '../assets/images/Rectangle 2.png'

function StartPage() {
  const navigate = useNavigate();

  function startQuiz () {
    navigate('/question/1');
  }

  return(
    <header>
      <div className='img-container img-startpage'>
        <img src={headerImg} alt='Header Image' />
      </div>
      <div className='banner-container'>
        <h1>Build a self care routine suitable for you</h1>
        <p>Take out test to get a personalised self care routine based on your needs.</p>
        <button onClick={startQuiz} className='accent'>Start quiz</button>
      </div>
    </header>
  );
};

export default StartPage;