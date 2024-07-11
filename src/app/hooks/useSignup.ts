"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useQuiz } from "../contexts/QuizContext";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    correctAnswers,
    totalTimeSpent,
    startTime,
    endTime,
    answerDetails,
    setUserName,
  } = useQuiz();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    router.push("/startQuiz");

    const { data: userData, error } = await supabase
      .from("users")
      .insert([
        { name, email, score: correctAnswers, played_time: totalTimeSpent },
      ]);

    if (error) {
      setMessage(`Erro ao cadastrar: ${error.message}`);
    } else {
      const { data: quizData, error: quizError } = await supabase
        .from("quiz_results")
        .insert([
          {
            score: correctAnswers,
            played_time: totalTimeSpent,
            start_time: startTime,
            end_time: endTime,
            answers_details: answerDetails,
          },
        ]);

      if (quizError) {
        console.error("Erro ao salvar os resultados do quiz", quizError);
      } else {
        console.log("Resultados do quiz salvos com sucesso", quizData);
      }

      setMessage("Cadastro realizado com sucesso!");
      setName("");
      setEmail("");
      setUserName(name);
      setLoading(false);
      router.push("/startQuiz");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    loading,
    message,
    handleSignup,
  };
};
