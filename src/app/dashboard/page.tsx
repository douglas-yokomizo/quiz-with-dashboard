"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type UserDetails = {
  name: string;
  email: string;
  score: number;
  played_time: number;
  answer_details: AnswerDetails[];
};

type AnswerDetails = {
  questionId: number;
  isCorrect: boolean;
  selectedOption: string;
};

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData, error } = await supabase
        .from("users")
        .select("name, email, score, played_time, answer_details");

      if (error) {
        console.error("Erro ao buscar dados:", error);
        return;
      }

      setUserDetails(usersData || []);
    };

    fetchData();
  }, []);

  const data = {
    labels: userDetails.map((user) => user.name),
    datasets: [
      {
        label: "Pontuação",
        data: userDetails.map((user) => user.score),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Tempo Gasto (s)",
        data: userDetails.map((user) => user.played_time),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Bar data={data} options={{ scales: { y: { beginAtZero: true } } }} />
      <div>
        <h3>Detalhes dos Usuários</h3>
        {/* Mantenha a lista de detalhes dos usuários aqui */}
      </div>
    </div>
  );
};

export default DashboardPage;
