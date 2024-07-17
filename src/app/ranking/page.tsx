"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import whiteLogo from "../public/scanntech_logo.png";
import Image from "next/image";

type UserRanking = {
  name: string;
  email: string;
  score: number;
  played_time: number;
};

const RankingPage = () => {
  const [ranking, setRanking] = useState<UserRanking[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("name, email, score, played_time")
          .order("score", { ascending: false })
          .order("played_time", { ascending: true })
          .limit(5);

        if (error) throw error;

        setRanking(data || []);
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      }
    };

    fetchRanking();
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m${remainingSeconds.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="bg-blue-600 h-screen flex flex-col justify-center items-center">
      <div className="bg-white text-black w-2/3 self-center max-w-4xl py-6 mx-auto shadow-lg border-4 border-orange-400">
        <div className="grid grid-cols-4 text-md text-center mb-3">
          <div>Posição</div>
          <div>Nome</div>
          <div>Pontuação</div>
          <div>Tempo</div>
        </div>
        {ranking.map((user, index) => (
          <div key={index} className="grid grid-cols-4 text-xl text-center">
            <div>{index + 1}º</div>
            <div>{user.name}</div>
            <div>{user.score}</div>
            <div>{formatTime(user.played_time)}</div>
          </div>
        ))}
      </div>
      <Image src={whiteLogo} alt="Scanntech Logo" width={240} />
    </div>
  );
};

export default RankingPage;
