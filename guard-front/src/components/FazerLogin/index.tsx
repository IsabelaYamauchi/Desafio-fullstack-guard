import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import CancelIcon from "../../assets/cancel.svg";
import { useNavigate } from "react-router-dom";

function FazerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const emailHasError = emailError !== "";
  const emailTrimmed = email.trim();


  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    
    if (!email) {
      setEmailError("Informe um e-mail.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Digite um e-mail válido.");
      return;
    }

    setEmailError("");

    if (!password) {
      return;
    }
    localStorage.setItem("userEmail", emailTrimmed);
    navigate("/pagina-inicial");
  }


  const isFormValid = email !== "" && password !== "" && !emailHasError;

  return (
    <div className="h-full w-full bg-background-secondary text-content-primary flex flex-col px-16 py-10">
      {/* link para criar conta */}
      <div className="flex justify-end text-label-sm mb-10">
        <span className="text-content-body">Não tem uma conta?</span>
        <Link
          to="/cadastro"
          className="ml-1 text-accent-brand hover:underline font-medium"
        >
          Criar conta
        </Link>
      </div>

      {/* título */}
      <h1 className="text-heading text-content-primary mb-8 font-bold">
        Acessar conta
      </h1>

      <form className="flex flex-col gap-6 max-w-md" onSubmit={handleSubmit}>
        {/* E-mail */}
        <div className="flex flex-col gap-1">
          <label className="text-text-md font-bold">E-mail</label>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            className={`
              h-11 w-full rounded-md border border-content-placeholder  bg-background-secondary px-3
              text-text-md text-content-primary
              placeholder:text-content-placeholder
              outline-none transition-colors
              ${
                emailHasError
                  ? "border-accent-red focus:border-accent-red focus:ring-1 focus:ring-accent-red"
                  : "border-border-primary hover:border-content-placeholder focus:border-accent-brand focus:ring-1 focus:ring-accent-brand"
              }
            `}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            required
          />
          {emailHasError && (
            <div className="mt-1 flex items-center gap-2 text-text-sm text-accent-red">
              <img src={CancelIcon} alt="" className="h-3 w-3" />
              <span>{emailError}</span>
            </div>
          )}
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-1">
          <label className="text-text-md font-bold">Senha</label>
          <input
            type="password"
            placeholder="Insira sua senha"
            className="
              h-11 w-full rounded-md border border-content-placeholder
              bg-background-secondary px-3
              text-text-md text-content-primary
              placeholder:text-content-placeholder
              outline-none transition-colors
              hover:border-content-placeholder
              focus:border-accent-brand focus:ring-1 focus:ring-accent-brand
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Botão Acessar conta */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={!isFormValid}
            className="
              h-10 px-6 rounded-md bg-accent-brand
              text-text-md font-semibold text-background-primary
              hover:brightness-110
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            Acessar conta
          </button>
        </div>
      </form>
    </div>
  );
}

export default FazerLogin;
