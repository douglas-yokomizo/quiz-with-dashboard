"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import logo from "../public/scanntech_logo.png";
import image3 from "../public/Asset_3.png";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

type UserRanking = {
  name: string;
  email: string;
  score: number;
  played_time: number;
};

const RankingPage = () => {
  const [ranking, setRanking] = useState<UserRanking[]>([]);
  const route = useRouter();

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
    <div className="flex flex-col justify-center items-center h-screen bg-blue-600">
      <div className="bg-white relative pt-3 w-[90%] h-[90%] flex flex-col items-center justify-center">
        <div>
          <FaArrowLeft
            className="text-4xl absolute top-5 left-5 hover:cursor-pointer"
            onClick={() => route.push("/")}
          />
          <div className="flex text-white text-3xl font-semibold justify-end items-center bg-blue-600 w-2/5 h-[5rem] absolute top-0 right-0">
            <Image src={logo} alt="Logo Scanntech" className="w-80 transform" />
            <p>(IN) MOTION</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-between w-3/4 text-3xl pb-3 font-bold uppercase">
            <div className="text-center w-1/4">Posição</div>
            <div className="text-center w-1/4">Nome</div>
            <div className="text-center w-1/4">Pontuação</div>
            <div className="text-center w-1/4">Tempo</div>
          </div>
          {ranking.map((user, index) => (
            <div
              key={user.email}
              className="flex font-semibold justify-between py-5 w-3/4 border-t-2 border-orange-500 text-3xl mt-2"
            >
              <div className="w-1/4 text-center text-orange-600">
                {index + 1}º
              </div>
              <div className="w-1/4 text-center text-blue-600">{user.name}</div>
              <div className="w-1/4 text-center text-orange-600">
                {user.score}
              </div>
              <div className="w-1/4 text-center text-blue-600">
                {formatTime(user.played_time)}
              </div>
            </div>
          ))}
        </div>
        <Image
          src={image3}
          alt="Circulo preto"
          className="w-32 absolute -bottom-8 -left-8"
        />
      </div>
    </div>
  );
};

export default RankingPage;
