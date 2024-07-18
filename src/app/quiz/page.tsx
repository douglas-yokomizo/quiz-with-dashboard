"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { questions } from "../data/questions";
import { useQuiz } from "../contexts/QuizContext";
import logo from "@/app/public/scanntech_logo.png";
import Image3 from "@/app/public/Asset_3.png";

type Question = {
  id: number;
  question: string;
  answer: string;
  options: string[];
};

const QuizPage = () => {
  const router = useRouter();
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const {
    addCorrectAnswer,
    addWrongAnswer,
    addTimeSpent,
    setEndTime,
    setStartTime,
    addAnswerDetail,
  } = useQuiz();

  useEffect(() => {
    const shuffledQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setRandomQuestions(shuffledQuestions);
    setQuizStartTime(Date.now());
    const interval = setInterval(() => {
      setTotalTime((prevTotalTime) => prevTotalTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setQuizStartTime, setTotalTime]);

  useEffect(() => {
    setStartTime(new Date());

    return () => {
      setEndTime(new Date());
    };
  }, [setStartTime, setEndTime]);

  const handleNextQuestion = useCallback(async () => {
    if (currentIndex + 1 < randomQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setRemainingTime(-1);
      setTimeout(() => {
        setRemainingTime(30);
      }, 0);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);
    } else {
      const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
      addTimeSpent(timeSpent);
      router.push("/result");
    }
  }, [currentIndex, randomQuestions, router, quizStartTime, addTimeSpent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        handleNextQuestion();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [remainingTime, currentIndex, handleNextQuestion]);

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
    const isCorrect = option === randomQuestions[currentIndex].answer;
    setIsCorrectAnswer(isCorrect);

    const detail = {
      id: randomQuestions[currentIndex].id,
      question: randomQuestions[currentIndex].question,
      isCorrect,
      selectedOption: option,
    };
    addAnswerDetail(detail);

    if (isCorrect) {
      addCorrectAnswer();
    } else {
      addWrongAnswer();
    }

    setTimeout(() => handleNextQuestion(), 500);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-600">
      <div className="bg-white relative pt-20 w-[90%] h-[90%] flex flex-col items-center justify-center">
        <div className="flex text-white text-3xl font-semibold justify-end items-center bg-blue-600 w-2/5 h-[5rem] absolute top-0 right-0">
          <Image src={logo} alt="Logo Scanntech" className="w-80 transform" />
          <p>(IN) MOTION</p>
        </div>
        <div className="w-full max-w-screen-lg mb-20">
          {randomQuestions.length > 0 && (
            <div className="text-5xl w-full relative pt-5">
              <span className="absolute text-8xl font-bold transform -translate-x-[110%] translate-y-0">
                {currentIndex + 1}.
              </span>
              <div className="pl-2">
                {" "}
                <p
                  className={`${
                    randomQuestions[currentIndex].id === 17
                      ? "text-3xl text-blue-600 font-bold mb-14 text-left"
                      : "text-blue-600 text-left font-bold mb-20"
                  }`}
                >
                  {randomQuestions[currentIndex].question}
                </p>
              </div>
              <div className="flex flex-col">
                {randomQuestions[currentIndex].options.map((option, index) => (
                  <button
                    key={option}
                    className={`text-white font-light rounded-[1rem] text-left py-4 pl-10 my-2 ${
                      selectedAnswer === option
                        ? isCorrectAnswer
                          ? "bg-blue-600"
                          : "bg-red-800"
                        : "bg-orange-500"
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    {String.fromCharCode(97 + index)}) {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between w-full">
          <div className="absolute right-0 bottom-0 mr-5 mt-4">
            <div className="text-blue-600 text-xl">
              Tempo total: {totalTime} segundos{" "}
            </div>
            <div className="bg-gray-200 h-2 w-full mb-6">
              <div
                className={`${
                  remainingTime <= 10 ? "bg-red-500" : "bg-green-500"
                } h-2 transition-all duration-1000`}
                style={{ width: `${(remainingTime / 30) * 100}%` }}
              />
            </div>
          </div>
          <Image
            src={Image3}
            alt="Circulo preto"
            className="w-32 absolute -bottom-8 -left-8"
          />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
