"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuiz } from "../contexts/QuizContext";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import logo from "../public/scanntech_logo.png";
import image1 from "../public/Asset_1.png";

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
    <div className="flex gap-10 h-screen bg-blue-600 justify-between">
      <div className="relative flex flex-col items-center w-1/2">
        <Image
          src={logo}
          alt="Scanntech Logo"
          className="w-4/5 z-10 absolute transform translate-x-10 -translate-y-20"
        />
        <div className="absolute px-20 py-16 z-0 bottom-0 w-2/3 left-1/4 text-white bg-black h-4/5">
          <p className="text-9xl font-semibold">
            (IN)
            <br /> <span>MO</span>
            <br />
            TION
          </p>
          <hr className="my-6 w-3/4 border-2" />
          <p className="text-5xl w-3/4">
            Você <br /> em alta <br /> performance
          </p>
        </div>
      </div>
      <div className="place-self-center w-1/2">
        <div className="bg-black px-16 py-14 h-1/2 text-white relative">
          <h3 className="transform -translate-y-32 pl-4 text-5xl">Parabéns</h3>
          <h2 className="text-4xl">
            {userName} <br />{" "}
            <span className="text-6xl">Você fez {correctAnswers} PONTOS</span>
          </h2>
          <Image
            src={image1}
            alt="Circulo 1"
            className="absolute -top-20 -left-14 w-32"
          />
        </div>
        <div className="flex justify-evenly gap-4 text-white items-start ml-[4rem] mt-[2rem]">
          <p className="place-self-center text-3xl">
            Obrigado pela <br /> participação!
          </p>
          <Link
            href={"/"}
            onClick={sendData}
            className="uppercase bg-orange-500 w-2/5 py-5 text-4xl rounded-lg font-semibold text-center"
          >
            Finalizar quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
