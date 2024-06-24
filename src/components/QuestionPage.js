import React, { useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { allQuestions } from "../data"
import { useAnswers } from '../context/AnswersContext';
import ProgressBar from './ProgressBar';
import '../styles/questionpage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function QuestionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionId = parseInt(id);
  const currentQuestion = allQuestions[questionId - 1];
  const totalSteps = allQuestions.length;

  const { setAnswer } = useAnswers();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelecion = (answer) => {
    setSelectedAnswer(answer);
  };

  function handleNextQuestion() {
    if (selectedAnswer) {
      setAnswer(questionId, selectedAnswer);
      if (questionId < totalSteps) {
        navigate(`/question/${questionId + 1}`);
      } else {
        navigate('/results');
      }
    } else {
      alert('Please select an answer.');
    }
  }

  const handlePrevQuestion = () => {
    questionId > 1 && navigate(`/question/${questionId - 1}`);
  }

  return(
    <div className='questions-wrapper'>
      <div className='head-container'>
        <h1 className='question-heading'>{currentQuestion.text}</h1>
        <div className="counter-container">
          <ProgressBar currentQuestionId={questionId} totalQuestions={totalSteps} />
        </div>
      </div>
      <div className="options-container">
        {
          Object.entries(currentQuestion.options).map(([letter, answer]) => (
            <button 
              key={letter}
              className={selectedAnswer === answer ? "active" : ""}
              onClick={() => handleSelecion(answer)}
            >
              {`${letter}. ${answer}`}
            </button>
          ))
        }
      </div>
      <div className='buttons-container'>
        {
          questionId > 1 && 
          <button className="back" onClick={handlePrevQuestion}>
            Back
          </button>
        }

        <button className="accent" onClick={handleNextQuestion}>
          {questionId < totalSteps ? "Next question": "Submit"}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;