"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../data/questions";
import { useQuiz } from "../contexts/QuizContext";

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
    <div className="flex flex-col justify-center items-center h-screen">
      {/* <img src="/path/to/logo.png" alt="Empresa Logo" className="mb-8" /> */}
      <div className="w-full max-w-md">
        <div className="bg-gray-200 h-2 w-full mb-6">
          <div
            className="bg-blue-600 h-2"
            style={{ width: `${(remainingTime / 30) * 100}%` }}
          ></div>
        </div>
        <div>Tempo total: {totalTime} segundos </div>
        {randomQuestions.length > 0 && (
          <div>
            <p className="flex justify-center items-center">
              {randomQuestions[currentIndex].question}
            </p>
            <div className="flex flex-col">
              {randomQuestions[currentIndex].options.map((option) => (
                <button
                  key={option}
                  className={`${
                    selectedAnswer === option
                      ? isCorrectAnswer
                        ? "bg-blue-500"
                        : "bg-red-500"
                      : ""
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div>Remaining time: {remainingTime} seconds</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
