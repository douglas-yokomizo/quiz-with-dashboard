"use client";
import { useRouter } from "next/navigation";
import { useQuiz } from "../contexts/QuizContext";
import { useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import VirtualKeyboard from "../components/VirtualKeyboard";
import TermsModal from "../components/TermsModal";
import { FaArrowLeft } from "react-icons/fa";

const SignupPage = () => {
  const { setUserName, setUserEmail, termsAccepted, setTermsAccepted } =
    useQuiz();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const emailInputRef = useRef(null);
  const [inputFocused, setInputFocused] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTermsModalVisible, setTermsModalVisible] = useState(false);

  const route = useRouter();

  const validateEmail = (email: string) => {
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
    if (!regexEmail.test(email)) {
      setErrorEmail("O email é obrigatório.");
      return false;
    } else {
      setErrorEmail("");
      return true;
    }
  };

  const validateName = (name: string) => {
    if (name.trim() === "") {
      setErrorName("O nome é obrigatório.");
      return false;
    } else {
      setErrorName("");
      return true;
    }
  };

  const handleInputFocus = (inputName: string): void => {
    setInputFocused(inputName);
  };

  const handleKeyboardChange = (input: string): void => {
    if (inputFocused === "name") {
      setName(input);
    } else if (inputFocused === "email") {
      setEmail(input);
    }
  };

  const handleBlur = () => {
    if (inputFocused === "email") {
      if (!validateEmail(email)) {
        setErrorEmail("Por favor, insira um endereço de email válido.");
      } else {
        setErrorEmail("");
      }
    } else if (inputFocused === "name") {
      if (!validateName(name)) {
        setErrorName("O nome é obrigatório.");
      } else {
        setErrorName("");
      }
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setEmailExists(false);
    const validName = validateName(name);
    const validEmail = validateEmail(email);

    if (!validEmail) {
      setErrorEmail("Por favor, insira um endereço de email válido.");
      setLoading(false);
      return;
    }

    if (!validName) {
      setErrorName("Por favor, insira um nome válido.");
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Você deve aceitar os termos para prosseguir.");
      setLoading(false);
      return;
    }

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

    setErrorMessage("");
    setUserName(name);
    setUserEmail(email);
    setLoading(false);
    route.push("/startQuiz");
  };

  return (
    <div
      className={`bg-blue-600 h-screen flex flex-col justify-center items-center ${
        isKeyboardVisible ? "pb-80" : ""
      }`}
    >
      <FaArrowLeft
        onClick={() => route.push("/")}
        className="absolute top-10 left-10 text-5xl text-white hover:cursor-pointer"
      />
      <div className="bg-white text-blue-700 w-1/3 self-center max-w-sm mx-auto p-8 rounded-[80px] shadow-lg border-4 border-orange-400">
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
              onBlur={handleBlur}
              onFocus={() => {
                setKeyboardVisible(true);
                handleInputFocus("name");
              }}
              className="w-full p-2 rounded-md border-b-2 border-gray-500"
            />
            {errorName && <div style={{ color: "red" }}>{errorName}</div>}
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
              onBlur={handleBlur}
              onFocus={() => {
                setKeyboardVisible(true);
                handleInputFocus("email");
              }}
              className={`w-full p-2 rounded-md border-b-2 border-gray-500 ${
                emailExists ? "focus border-red-400 border-2 text-red-500" : ""
              }`}
            />
            {emailExists && (
              <p className="text-red-500 text-sm mt-1">Email já cadastrado.</p>
            )}
          </div>
          {errorEmail && <div style={{ color: "red" }}>{errorEmail}</div>}
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-400 text-white py-2 px-4 rounded-[80px] my-4"
          >
            {loading ? "Cadastrando..." : "Cadastre-se"}
          </button>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          <div>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (e.target.checked) {
                  setErrorMessage("");
                }
              }}
            />
            <label htmlFor="terms" className="ml-2">
              Eu li e concordo com os termos
            </label>
          </div>
          <button type="button" onClick={() => setTermsModalVisible(true)}>
            Leia os termos
          </button>
        </form>
      </div>
      <VirtualKeyboard
        isVisible={isKeyboardVisible}
        onChange={handleKeyboardChange}
        focusedInput={inputFocused}
      />
      <TermsModal
        isVisible={isTermsModalVisible}
        onClose={() => setTermsModalVisible(false)}
      />
    </div>
  );
};

export default SignupPage;
