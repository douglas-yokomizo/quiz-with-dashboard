"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useQuiz } from "../contexts/QuizContext";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { correctAnswers, totalTimeSpent, startTime, endTime, answerDetails } =
    useQuiz();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data: userData, error } = await supabase
      .from("users")
      .insert([
        { name, email, score: correctAnswers, played_time: totalTimeSpent },
      ]);

    if (error) {
      setMessage(`Erro ao cadastrar: ${error.message}`);
    } else {
      const userId = userData?.[0]?.id;

      const { data: quizData, error: quizError } = await supabase
        .from("quiz_results")
        .insert([
          {
            user_id: userId,
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
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupPage;
