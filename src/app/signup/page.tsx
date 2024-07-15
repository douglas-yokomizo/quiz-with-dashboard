"use client";
import { useRouter } from "next/navigation";
import { useQuiz } from "../contexts/QuizContext";
import { useRef, useState } from "react";
import { supabase } from "../lib/supabase";

const SignupPage = () => {
  const { setUserName, setUserEmail } = useQuiz();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const emailInputRef = useRef(null);

  const route = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setEmailExists(false);

    const { data: existingUsers, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (error && error.message !== "No rows found") {
      console.error("Erro ao verificar email:", error);
      setLoading(false);
      return;
    }

    if (existingUsers && existingUsers.length > 0) {
      setEmailExists(true);
      setLoading(false);
      if (emailInputRef.current)
        (emailInputRef.current as HTMLInputElement).focus();
      return;
    }

    setUserName(name);
    setUserEmail(email);
    setLoading(false);
    route.push("/startQuiz");
  };

  return (
    <div className="bg-blue-700 h-screen flex flex-col justify-center items-center">
      <div className="bg-white text-blue-700 w-1/3 self-center max-w-sm mx-auto p-5 rounded-[80px] shadow-lg border-4 border-orange-400">
        <h2 className="text-center text-2xl my-3">Cadastro</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-lg">
              Nome:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 rounded-md border-b-2 border-gray-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg">
              Email:
            </label>
            <input
              ref={emailInputRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full p-2 rounded-md border-b-2 border-gray-500 ${
                emailExists ? "focus border-red-400 border-2 text-red-500" : ""
              }`}
            />
            {emailExists && (
              <p className="text-red-500 text-sm mt-1">Email já cadastrado.</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-400 text-white py-2 px-4 rounded-[80px] my-4"
          >
            {loading ? "Cadastrando..." : "Cadastre-se"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
