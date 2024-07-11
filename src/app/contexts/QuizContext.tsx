"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type AnswerDetail = {
  questionId: string;
  isCorrect: boolean;
  selectedOption: string;
};

type QuizContextType = {
  correctAnswers: number;
  wrongAnswers: number;
  totalTimeSpent: number;
  startTime: Date | null;
  endTime: Date | null;
  answerDetails: AnswerDetail[];
  userName: string;
  addCorrectAnswer: () => void;
  addWrongAnswer: () => void;
  addTimeSpent: (time: number) => void;
  setStartTime: (time: Date) => void;
  setEndTime: (time: Date) => void;
  addAnswerDetail: (detail: AnswerDetail) => void;
  setUserName: (name: string) => void;
};

const defaultState: QuizContextType = {
  correctAnswers: 0,
  wrongAnswers: 0,
  totalTimeSpent: 0,
  startTime: null,
  endTime: null,
  answerDetails: [],
  userName: "",
  addCorrectAnswer: () => {},
  addWrongAnswer: () => {},
  addTimeSpent: () => {},
  setStartTime: () => {},
  setEndTime: () => {},
  addAnswerDetail: () => {},
  setUserName: () => {},
};

const QuizContext = createContext<QuizContextType>(defaultState);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [answerDetails, setAnswerDetails] = useState<AnswerDetail[]>([]);
  const [userName, setUserName] = useState("");

  const addCorrectAnswer = useCallback(() => {
    setCorrectAnswers((prev) => prev + 1);
  }, []);

  const addWrongAnswer = useCallback(() => {
    setWrongAnswers((prev) => prev + 1);
  }, []);

  const addTimeSpent = useCallback((time: number) => {
    setTotalTimeSpent((prev) => prev + time);
  }, []);

  const addAnswerDetail = useCallback((detail: AnswerDetail) => {
    setAnswerDetails((prev) => [...prev, detail]);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        correctAnswers,
        wrongAnswers,
        totalTimeSpent,
        startTime,
        endTime,
        answerDetails,
        userName,
        addCorrectAnswer,
        addWrongAnswer,
        addTimeSpent,
        setStartTime,
        setEndTime,
        addAnswerDetail,
        setUserName,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
