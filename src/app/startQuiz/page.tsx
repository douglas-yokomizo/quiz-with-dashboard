"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Dot = ({ delay }: any) => (
  <span
    className={`inline-block animate-jump`}
    style={{ animationDelay: delay }}
  >
    .
  </span>
);

const StartQuizPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      router.push("/quiz");
    }, 3000);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-600">
      <h1 className="text-7xl text-white">
        Começando o Quiz
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </h1>
    </div>
  );
};

export default StartQuizPage;
