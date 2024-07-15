"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

  return (
    <div className="bg-blue-700 h-screen flex flex-col justify-center items-center">
      <div className="bg-white text-blue-700 w-1/3 self-center max-w-sm mx-auto p-5 rounded-[80px] shadow-lg border-4 border-orange-400">
        <h2 className="text-center text-2xl my-3">Ranking</h2>
        <ol className="list-decimal pl-5">
          {ranking.map((user, index) => (
            <li key={index} className="mb-2">
              <span className="font-bold">{user.name}</span> ({user.email}) -
              Acertos: {user.score}, Tempo: {user.played_time}s
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RankingPage;
