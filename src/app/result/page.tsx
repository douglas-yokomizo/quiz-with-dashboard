"use client";
import Link from "next/link";
import { useQuiz } from "../contexts/QuizContext";

const ResultPage = () => {
  const { correctAnswers, totalTimeSpent, startTime, endTime, answerDetails } =
    useQuiz();

  return (
    <div>
      <h2>Resultados do Quiz</h2>
      <p>Respostas corretas: {correctAnswers}</p>
      <p>Tempo total gasto: {totalTimeSpent}</p>
      <p>Início do Quiz: {startTime?.toLocaleString()}</p>
      <p>Fim do Quiz: {endTime?.toLocaleString()}</p>
      <div>
        <p>Detalhes das respostas:</p>
        {answerDetails.map((detail, index) => (
          <div key={index}>
            <p>Questão: {detail.questionId}</p>
            <p> Opção selecionada {detail.selectedOption}</p>
            <p>Resposta correta:{detail.isCorrect ? "sim" : "não"}</p>
          </div>
        ))}
      </div>
      <Link href={"/signup"}>Cadastre-se</Link>
    </div>
  );
};

export default ResultPage;
