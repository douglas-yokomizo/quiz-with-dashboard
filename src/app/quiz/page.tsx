"use client";
import React, { useEffect, useState } from "react";
import { questions } from "../data/questions";
import { useRouter } from "next/navigation";
import { useQuiz } from "../contexts/QuizContext";

const QuizPage = () => {
  const router = useRouter();
  const [perguntasAleatorias, setPerguntasAleatorias] = useState<
    { question: string; options: string[]; answer: string }[]
  >([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(30);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(
    null
  );
  const [respostaCorreta, setRespostaCorreta] = useState<boolean | null>(null);
  const [tempoTotal, setTempoTotal] = useState(0);
  const { updateQuizState } = useQuiz();

  useEffect(() => {
    // Inicia o cronômetro para registrar o tempo total
    const cronometro = setInterval(() => {
      setTempoTotal((prevTempo) => prevTempo + 1);
    }, 1000);

    // Seleção aleatória de 5 perguntas
    const perguntasEmbaralhadas = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setPerguntasAleatorias(perguntasEmbaralhadas);

    // Timer de 30 segundos para cada pergunta
    const intervalo = setInterval(() => {
      setTempoRestante((prevTempo) => {
        if (prevTempo === 1) {
          clearInterval(intervalo);
          handleNextQuestion();
        }
        return prevTempo - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalo);
      clearInterval(cronometro);
    };
  }, []);

  const handleNextQuestion = () => {
    if (indiceAtual + 1 < perguntasAleatorias.length) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      // Finaliza o quiz e redireciona para a tela de resultados
      router.push("/result");
    }
    setTempoRestante(30);
    setRespostaSelecionada(null);
    setRespostaCorreta(null);
    updateQuizState(0, 30); // Atualiza o tempo total gasto
  };

  const responderPergunta = (opcao: string) => {
    const isCorrect = perguntasAleatorias[indiceAtual].answer === opcao;
    setRespostaSelecionada(opcao);
    setRespostaCorreta(isCorrect);
    updateQuizState(isCorrect ? 1 : 0, 30 - tempoRestante);
    setTimeout(handleNextQuestion, 2000); // Espera 2 segundos antes de mudar para a próxima pergunta
  };

  // Renderização da página do quiz
  return (
    <div>
      <h2>Quiz</h2>
      <p>Tempo restante: {tempoRestante} segundos</p>
      {perguntasAleatorias[indiceAtual] ? (
        <>
          <h3>{perguntasAleatorias[indiceAtual].question}</h3>
          <ul>
            {perguntasAleatorias[indiceAtual].options.map((opcao) => (
              <li
                key={opcao}
                onClick={() => responderPergunta(opcao)}
                style={{
                  cursor: respostaSelecionada ? "not-allowed" : "pointer",
                  backgroundColor:
                    respostaSelecionada === opcao
                      ? respostaCorreta
                        ? "lightgreen"
                        : "lightcoral"
                      : undefined,
                }}
              >
                {opcao}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Carregando perguntas...</p>
      )}
    </div>
  );
};

export default QuizPage;
