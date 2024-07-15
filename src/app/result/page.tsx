"use client";
import Link from "next/link";
import { useQuiz } from "../contexts/QuizContext";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const route = useRouter();
  const {
    correctAnswers,
    userName,
    userEmail,
    answerDetails,
    totalTimeSpent,
    startTime,
    endTime,
    resetQuiz,
  } = useQuiz();

  const sendData = async () => {
    const { data, error } = await supabase.from("users").insert([
      {
        name: userName,
        email: userEmail,
        score: correctAnswers,
        played_time: totalTimeSpent,
        start_time: startTime,
        end_time: endTime,
        answer_details: answerDetails,
      },
    ]);

    if (error) {
      console.error("Erro ao enviar dados para o Supabase", error);
    } else {
      console.log("Dados enviados com sucesso", data);
      resetQuiz();
      route.push("/");
    }
  };

  return (
    <div className="bg-blue-700 h-screen flex flex-col justify-center items-center">
      <div className="bg-white text-blue-700 w-1/3 self-center max-w-sm mx-auto p-5 rounded-[80px] shadow-lg border-4 border-orange-400 ">
        <h3 className="text-center text-lg mt-3">
          Obrigado pela sua participação
        </h3>
        <h4 className="text-center mt-3 text-xl">{userName}</h4>
        <p className="text-center mt-3 text-xl">
          Você fez {correctAnswers} pontos
        </p>
        <h4 className="text-center mt-6 text-xl">Parabéns!</h4>
      </div>
      <div className="flex">
        <button onClick={sendData} className="">
          <p>Finalizar Quiz</p>
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
