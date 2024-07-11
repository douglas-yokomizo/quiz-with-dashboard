"use client";
import Link from "next/link";
import { useQuiz } from "../contexts/QuizContext";

const ResultPage = () => {
  const {
    correctAnswers,
    totalTimeSpent,
    startTime,
    endTime,
    answerDetails,
    userName,
  } = useQuiz();

  return (
    <div className="bg-blue-500 h-screen">
      <h3>Obrigado pela sua participação, {userName}</h3>
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
      <Link href={"/ranking"}>Visualizar Ranking</Link>
    </div>
  );
};

export default ResultPage;
