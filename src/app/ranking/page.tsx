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
    <div>
      <h2>Ranking</h2>
      <ol>
        {ranking.map((user, index) => (
          <li key={index}>
            {user.name} ({user.email}) - Acertos: {user.score}, Tempo:{" "}
            {user.played_time}s
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RankingPage;
