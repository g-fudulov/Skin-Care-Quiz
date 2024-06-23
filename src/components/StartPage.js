import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const navigate = useNavigate();

  function startQuiz () {
    navigate('/question/1');
  }

  return(
    <div>
      <h1>Build a self care routine suitable for you</h1>
      <p>Take out test to get a personalised self care routine based on your needs.</p>
      <button onClick={startQuiz}>Start quiz</button>
    </div>
  );
};

export default StartPage;