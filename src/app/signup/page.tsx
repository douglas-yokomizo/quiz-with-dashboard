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
      .insert([{ name, email, score: 0, played_time: 0 }]);

    if (error) {
      setMessage(`Erro ao cadastrar: ${error.message}`);
    } else {
      // Inclua os novos campos na inserção na tabela quiz_results
      const { data: quizData, error: quizError } = await supabase
        .from("quiz_results")
        .insert([
          {
            user_id: (userData && userData[0] ? userData[0].id : null) as
              | number
              | null,
            score: correctAnswers, // Ajuste conforme necessário
            played_time: totalTimeSpent,
            start_time: startTime, // Adicione o campo start_time
            end_time: endTime, // Adicione o campo end_time
            answers_details: answerDetails, // Adicione o campo answers_details
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
