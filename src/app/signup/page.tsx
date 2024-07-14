"use client";
import { useRouter } from "next/navigation";
import { useQuiz } from "../contexts/QuizContext";
import { useState } from "react";

const SignupPage = () => {
  const { setUserName, setUserEmail } = useQuiz();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const route = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setUserName(name);
    setUserEmail(email);
    setMessage("Cadastro realizado com sucesso!");
    setLoading(false);
    route.push("/startQuiz");
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupPage;
