"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type QuizSummary = {
  totalUsers: number | null;
  averageTimeSpent: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
};

type AnswerDetail = {
  questionId: string;
  isCorrect: boolean;
  selectedOption: string;
  userId: string;
};

const DashboardPage = () => {
  const [summary, setSummary] = useState<QuizSummary | null>(null);
  const [answerDetails, setAnswerDetails] = useState<AnswerDetail[]>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { count: totalUsers } = await supabase
          .from("users")
          .select("id", { count: "exact" });

        const { data: quizResults, error } = await supabase.rpc(
          "fetch_quiz_summary"
        );

        if (error) throw error;

        if (quizResults && quizResults.length > 0) {
          const {
            average_time_spent,
            total_quiz_attempts,
            average_user_score,
          } = quizResults[0];
          setSummary({
            totalUsers,
            averageTimeSpent: average_time_spent,
            totalQuestionsAnswered: total_quiz_attempts,
            totalCorrectAnswers: average_user_score,
          });
        }

        const { data: answerDetailsData, error: answerDetailsError } =
          await supabase.from("answer_details").select("*");

        if (answerDetailsError) throw answerDetailsError;

        setAnswerDetails(answerDetailsData);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Dashboard do Quiz</h2>
      <p>Quantidade de usuários: {summary.totalUsers}</p>
      <p>Tempo médio de jornada: {summary.averageTimeSpent} segundos</p>
      <p>Total de perguntas respondidas: {summary.totalQuestionsAnswered}</p>
      <p>Total de respostas corretas: {summary.totalCorrectAnswers}</p>
      <h3>Detalhes das Respostas</h3>
      <ul>
        {answerDetails.map((detail, index) => (
          <li key={index}>
            Usuário: {detail.userId}, Pergunta: {detail.questionId}, Resposta
            Selecionada: {detail.selectedOption}, Correta:{" "}
            {detail.isCorrect ? "Sim" : "Não"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
