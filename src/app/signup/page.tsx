"use client";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {
  const { name, setName, email, setEmail, loading, message, handleSignup } =
    useSignup();

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
