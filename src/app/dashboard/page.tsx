"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  fetchActivityByHourFromSupabase,
  fetchQuestionsDetailsByUser,
  fetchTotalPlayedTime,
  fetchTotalUsers,
} from "../services/supabaseService";
import { FaUsers } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";

Chart.register(...registerables);

const DashboardPage = () => {
  const [activityByHour, setActivityByHour] = useState(Array(24).fill(0));
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPlayedTime, setTotalPlayedTime] = useState(0);
  const [questionsData, setQuestionsData] = useState<{
    [key: string]: { correct: number; incorrect: number };
  }>({} as { [key: string]: { correct: number; incorrect: number } });
  const [selectedChart, setSelectedChart] = useState("bar");

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const minutes: number = Math.floor(seconds / 60);
      const remainingSeconds: number = seconds % 60;
      return `${minutes}m ${
        remainingSeconds > 0 ? `${remainingSeconds}s` : ""
      }`.trim();
    } else {
      const hours: number = Math.floor(seconds / 3600);
      const remainingSeconds: number = seconds % 3600;
      const minutes: number = Math.floor(remainingSeconds / 60);
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ""} ${
        remainingSeconds % 60 > 0 ? `${remainingSeconds % 60}s` : ""
      }`.trim();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const activityData = await fetchActivityByHourFromSupabase();
      const totalUsers = await fetchTotalUsers();
      const totalPlayedTime = await fetchTotalPlayedTime();
      const details = await fetchQuestionsDetailsByUser();

      if (activityData) {
        setActivityByHour(activityData);
      }
      if (totalUsers) {
        setTotalUsers(totalUsers);
      }
      if (totalPlayedTime) {
        setTotalPlayedTime(totalPlayedTime);
      }
      if (details) {
        const processedData = details.reduce((acc, { answer_details }) => {
          answer_details.forEach(
            ({
              question,
              isCorrect,
            }: {
              question: string;
              isCorrect: boolean;
            }) => {
              if (!acc[question]) {
                acc[question] = { correct: 0, incorrect: 0 };
              }
              if (isCorrect) {
                acc[question].correct += 1;
              } else {
                acc[question].incorrect += 1;
              }
            }
          );
          return acc;
        }, {} as { [key: string]: { correct: number; incorrect: number } });

        setQuestionsData(processedData);
      }
    };

    fetchData();
  }, []);

  const averagePlayedTime =
    totalUsers > 0 ? (totalPlayedTime / totalUsers).toFixed(2) : 0;

  const formattedTotalPlayedTime = formatTime(totalPlayedTime);
  const formattedAveragePlayedTime = formatTime(Number(averagePlayedTime));

  const activityData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: "Atividade por hora",
        data: activityByHour,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-evenly">
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 h-60 w-1/5 hover:scale-110 transition-transform duration-300">
          <div className="flex justify-center">
            <FaUsers className="w-12 h-12 text-blue-700" />
          </div>
          <div className="text-center text-6xl mt-4">{totalUsers}</div>
          <h2 className="text-md text-center text-gray-400 font-bold">
            Total de usuários
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 h-60 w-1/5 hover:scale-110 transition-transform duration-300">
          <div className="flex justify-center">
            <MdAccessTime className="w-12 h-12 text-blue-700" />
          </div>
          <div className="text-center text-6xl mt-4">
            {formattedTotalPlayedTime}
          </div>
          <h2 className="text-md text-center text-gray-400 font-bold">
            Tempo total
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 h-60 w-1/5 hover:scale-110 transition-transform duration-300">
          <div className="flex justify-center">
            <AiOutlineFieldTime className="w-12 h-12 text-blue-700" />
          </div>
          <div className="text-center text-6xl mt-4">
            {formattedAveragePlayedTime}
          </div>
          <h2 className="text-md text-center text-gray-400 font-bold">
            Tempo médio jogado
          </h2>
        </div>
      </div>
      <div className="place-self-center my-5">
        <button
          className="bg-blue-500 mr-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          onClick={() => setSelectedChart("bar")}
        >
          Acertos/Erros
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          onClick={() => setSelectedChart("line")}
        >
          Horários de Atividade
        </button>
      </div>
      <div className="flex justify-center p-12">
        {selectedChart === "bar" && (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left border-r-2 border-white">
                  Pergunta
                </th>
                <th className="py-3 px-4 text-left border-r-2 border-white">
                  Acertos
                </th>
                <th className="py-3 px-4 text-left">Erros</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(questionsData).map(([question, data], index) => (
                <tr
                  key={question}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2">{question}</td>
                  <td className="border px-4 py-2 text-green-600 text-center font-bold">
                    {data.correct}
                  </td>
                  <td className="border px-4 py-2 text-red-600 text-center font-bold">
                    {data.incorrect}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedChart === "line" && (
          <Line data={activityData} options={options} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
