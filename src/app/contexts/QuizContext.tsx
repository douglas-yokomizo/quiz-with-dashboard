"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Passo 1: Criação do Contexto
export const QuizContext = createContext({
  correctAnswers: 0,
  totalTimeSpent: 0,
  updateQuizState: (newCorrectAnswers: number, newTimeSpent: number) => {},
});

// Passo 2: Criação do Provider

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  const updateQuizState = (
    newCorrectAnswers: number,
    newTimeSpent: number
  ): void => {
    setCorrectAnswers((prev) => prev + newCorrectAnswers);
    setTotalTimeSpent((prev) => prev + newTimeSpent);
  };

  return (
    <QuizContext.Provider
      value={{
        correctAnswers,
        totalTimeSpent,
        updateQuizState,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
