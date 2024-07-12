"use client";
import Link from "next/link";
import { useQuiz } from "../contexts/QuizContext";

const ResultPage = () => {
  const { correctAnswers, userName } = useQuiz();

  return (
    <div className="bg-blue-500 h-screen flex justify-center items-center">
      <div className="bg-white text-blue-500 w-1/3 self-center max-w-sm mx-auto p-5 rounded-full shadow-lg border-4 border-orange-400 ">
        <h3 className="text-center text-lg mt-3">
          Obrigado pela sua participação
        </h3>
        <h4 className="text-center mt-3 text-xl">{userName}</h4>
        <p className="text-center mt-3 text-xl">
          Você fez {correctAnswers} pontos
        </p>
        <h4 className="text-center mt-6 text-xl">Parabéns!</h4>
        <Link href={"/ranking"} className="">
          <p>Visualizar Ranking</p>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
