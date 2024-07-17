"use client";
import Image from "next/image";
import { useQuiz } from "../contexts/QuizContext";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import whiteLogo from "../public/scanntech_logo.png";

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
    <div className="bg-blue-600 h-screen flex flex-col justify-center items-center">
      <div className="bg-white text-blue-700 w-2/3 self-center max-w-lg mx-auto p-7 rounded-[90px] shadow-lg border-4 border-orange-400 ">
        <h3 className="text-center text-xl mt-4">
          Obrigado pela sua participação
        </h3>
        <h4 className="text-center mt-4 text-2xl">{userName}</h4>
        <p className="text-center mt-4 text-2xl">
          Você fez {correctAnswers} pontos
        </p>
        <h4 className="text-center mt-8 text-2xl">Parabéns!</h4>
      </div>
      <Image src={whiteLogo} alt="Scanntech Logo" width={252} height={0} />{" "}
      <div className="flex justify-center mt-3">
        <button
          onClick={sendData}
          className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
        >
          Finalizar Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
