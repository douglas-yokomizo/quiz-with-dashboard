"use client";
import { useQuiz } from "../contexts/QuizContext";

const ResultPage = () => {
  const { correctAnswers, totalTimeSpent } = useQuiz();

  return (
    <div>
      <h2>Resultados do Quiz</h2>
      <p>Respostas corretas: {correctAnswers}</p>
      <p>Tempo total gasto: {totalTimeSpent}</p>
    </div>
  );
};

export default ResultPage;
