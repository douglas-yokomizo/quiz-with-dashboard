"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../data/questions";
import { supabase } from "../lib/supabase";
import { useQuiz } from "../contexts/QuizContext";

type Question = {
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
  }, []);

  useEffect(() => {
    // Definir startTime quando o quiz começa
    setStartTime(new Date());

    return () => {
      // Definir endTime quando o componente é desmontado, o que pode indicar o fim do quiz
      setEndTime(new Date());
    };
  }, []);

  const handleNextQuestion = useCallback(async () => {
    if (selectedAnswer !== null && isCorrectAnswer !== null) {
      const detail = {
        questionId: randomQuestions[currentIndex].question, // Supondo que cada pergunta tenha um identificador único
        isCorrect: isCorrectAnswer,
        selectedOption: selectedAnswer,
      };
      addAnswerDetail(detail);
    }
    if (currentIndex + 1 < randomQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setRemainingTime(-1);
      setTimeout(() => {
        setRemainingTime(30);
      }, 0);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);
    } else {
      // Finish the quiz and redirect to the result screen
      const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
      addTimeSpent(timeSpent);
      router.push("/result");
    }
  }, [
    currentIndex,
    randomQuestions,
    selectedAnswer,
    isCorrectAnswer,
    addAnswerDetail,
    router,
  ]);

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
    if (option === randomQuestions[currentIndex].answer) {
      addCorrectAnswer();
      setIsCorrectAnswer(true);
    } else {
      addWrongAnswer();
      setIsCorrectAnswer(false);
    }
    setTimeout(() => handleNextQuestion(), 1000); // Wait 1 second before moving to the next question
  };

  return (
    <div>
      <h1>Quiz</h1>
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
  );
};

export default QuizPage;
