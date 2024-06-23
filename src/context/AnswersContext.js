import React, { createContext, useState, useContext } from 'react';

// Create a context for the answers
const AnswersContext = createContext();

// Create a provider component
export const AnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const setAnswer = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <AnswersContext.Provider value={{ answers, setAnswer }}>
      {children}
    </AnswersContext.Provider>
  );
};

// Custom hook to use the AnswersContext
export const useAnswers = () => useContext(AnswersContext);
