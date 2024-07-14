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
  userEmail: string;
  addCorrectAnswer: () => void;
  addWrongAnswer: () => void;
  addTimeSpent: (time: number) => void;
  setStartTime: (time: Date) => void;
  setEndTime: (time: Date) => void;
  addAnswerDetail: (detail: AnswerDetail) => void;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
};

const defaultState: QuizContextType = {
  correctAnswers: 0,
  wrongAnswers: 0,
  totalTimeSpent: 0,
  startTime: null,
  endTime: null,
  answerDetails: [],
  userName: "",
  userEmail: "",
  addCorrectAnswer: () => {},
  addWrongAnswer: () => {},
  addTimeSpent: () => {},
  setStartTime: () => {},
  setEndTime: () => {},
  addAnswerDetail: () => {},
  setUserName: () => {},
  setUserEmail: () => {},
};

const QuizContext = createContext<QuizContextType>(defaultState);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [correctAnswers, setCorrectAnswers] = useState(
    defaultState.correctAnswers
  );
  const [wrongAnswers, setWrongAnswers] = useState(defaultState.wrongAnswers);
  const [totalTimeSpent, setTotalTimeSpent] = useState(
    defaultState.totalTimeSpent
  );
  const [startTime, setStartTime] = useState<Date | null>(
    defaultState.startTime
  );
  const [endTime, setEndTime] = useState<Date | null>(defaultState.endTime);
  const [answerDetails, setAnswerDetails] = useState<AnswerDetail[]>(
    defaultState.answerDetails
  );
  const [userName, setUserName] = useState(defaultState.userName);
  const [userEmail, setUserEmail] = useState(defaultState.userEmail);

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
        userEmail,
        addCorrectAnswer,
        addWrongAnswer,
        addTimeSpent,
        setStartTime,
        setEndTime,
        addAnswerDetail,
        setUserName,
        setUserEmail,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
