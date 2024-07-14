"use client";
import Link from "next/link";
import { useQuiz } from "../contexts/QuizContext";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

const ResultPage = () => {
  const {
    correctAnswers,
    userName,
    userEmail,
    answerDetails,
    totalTimeSpent,
    startTime,
    endTime,
  } = useQuiz();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .insert([
            {
              name: userName,
              email: userEmail,
              score: correctAnswers,
              played_time: totalTimeSpent,
            },
          ])
          .single();

        if (userError) throw userError;

        const answerDetailsPayload = answerDetails.map((detail) => ({
          questionId: detail.questionId,
          isCorrect: detail.isCorrect,
          selectedOption: detail.selectedOption,
        }));

        const { error: answerDetailsError } = await supabase
          .from("quiz_results")
          .insert({
            answers_details: answerDetailsPayload,
            start_time: startTime,
            end_time: endTime,
            played_time: totalTimeSpent,
            score: correctAnswers,
          });

        if (answerDetailsError) throw answerDetailsError;

        console.log("Dados enviados com sucesso");
      } catch (error) {
        console.error("Erro ao enviar os dados", error);
      }
    }

    fetchData();
  }, [
    correctAnswers,
    userName,
    userEmail,
    answerDetails,
    endTime,
    startTime,
    totalTimeSpent,
  ]);

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
        <Link href={"/ranking"} className="">
          <p>Ranking</p>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
