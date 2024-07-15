"use client";
import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  fetchActivityByHourFromSupabase,
  fetchTotalPlayedTime,
  fetchTotalUsers,
} from "../services/supabaseService"; // Ajuste o caminho conforme necessário
import { FaUsers } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";

Chart.register(...registerables);

const DashboardPage = () => {
  const [activityByHour, setActivityByHour] = useState(Array(24).fill(0));
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPlayedTime, setTotalPlayedTime] = useState(0);

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

      if (activityData) {
        setActivityByHour(activityData);
      }
      if (totalUsers) {
        setTotalUsers(totalUsers);
      }
      if (totalPlayedTime) {
        setTotalPlayedTime(totalPlayedTime);
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
    <div className="flex flex-col">
      <div className="flex justify-evenly">
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 h-60 w-1/5 hover:scale-110 transition-transform duration-300">
          <div className="flex justify-center">
            <FaUsers className="w-12 h-12 text-blue-600" />
          </div>
          <div className="text-center text-6xl mt-4">{totalUsers}</div>
          <h2 className="text-md text-center text-gray-400 font-bold">
            Total de usuários
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 h-60 w-1/5 hover:scale-110 transition-transform duration-300">
          <div className="flex justify-center">
            <MdAccessTime className="w-12 h-12 text-blue-600" />
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
            <AiOutlineFieldTime className="w-12 h-12 text-blue-600" />
          </div>
          <div className="text-center text-6xl mt-4">
            {formattedAveragePlayedTime}
          </div>
          <h2 className="text-md text-center text-gray-400 font-bold">
            Tempo médio jogado
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Line data={activityData} options={options} />
      </div>
    </div>
  );
};

export default DashboardPage;
