import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import CancelIcon from "../../assets/cancel.svg";
import { useNavigate } from "react-router-dom";


function CriarConta() {
  const navigate = useNavigate();
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [emailError, setEmailError] = useState("");
  const emailHasError = emailError !== "";
  const emailTrimmed = email.trim();

  const isLengthValid = password.length >= 8;
  const hasNumberOrSymbol = /[0-9\W]/.test(password);
  const passwordsMatch = password !== "" && password === confirmPassword;

  function handleSubmit(e: FormEvent) {
  e.preventDefault();

  if (!isLengthValid || !hasNumberOrSymbol || !passwordsMatch) {
    return;
  }

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


  localStorage.setItem("userEmail", emailTrimmed);
  navigate("/pagina-inicial");

}

  const isFormValid =
      name !== "" &&
      email !== "" &&
      isLengthValid &&
      hasNumberOrSymbol &&
      passwordsMatch &&
      !emailHasError;


  

  return (
    <div className="h-full w-full bg-background-secondary text-content-primary flex flex-col px-16 py-10">
      
      <div className="flex justify-end text-label-sm mb-10">
        <span className="text-content-body">Já tem uma conta?</span>
        <Link
          to="/login"
          className="ml-1  text-accent-brand hover:underline font-medium"
        >
          Acessar conta
        </Link>
      </div>
      
      {/* título*/}
      <h1 className="text-heading text-content-primary mb-8 font-bold  ">
        Criar conta
      </h1>

      <form className="flex flex-col gap-6 max-w-md" onSubmit={handleSubmit}>

      <div className="flex flex-col gap-1">
        {/* Nome */}
        <label className="text-text-md font-bold " >Nome</label>
        <input type="text"
        placeholder="Como você se chama?"
        className="
          h-11 w-full rounded-md border border-content-placeholder
          bg-background-secondary px-3
          text-text-md text-content-primary
          placeholder:text-content-placeholder
          outline-none transition-colors
          hover:border-content-placeholder
          focus:border-accent-brand focus:ring-1 focus:ring-accent-brand
        "
        value={name}
        onChange={(e) => setName(e.target.value)}   
        required       
        />
      </div>

        {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-text-md font-bold">E-mail</label>
        <input type="text"
        placeholder="Seu e-mail aqui"
        className={`
      h-11 w-full rounded-md border border-content-placeholder bg-background-secondary px-3
      text-text-md text-content-primary
      placeholder:text-content-placeholder
      outline-none transition-colors
      ${
        emailHasError
          ? // ERRO
            "border-accent-red focus:border-accent-red focus:ring-1 focus:ring-accent-red"
          : //Default
            "border-border-primary hover:border-content-placeholder focus:border-accent-brand focus:ring-1 focus:ring-accent-brand"
      }
    `}
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
        <label className="text-text-md font-bold" >Senha</label>
        <input type="password"
        placeholder="Escolha uma senha segura"
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
        />
      </div>

        {/* Repetir a senha */}
      <div className="flex flex-col gap-1">
        <label className="text-text-md font-bold" >Repetir a senha</label>
        <input type="password"
        placeholder="Repita sua senha para confirmar"
        className="
          h-11 w-full rounded-md border border-content-placeholder
          bg-background-secondary px-3
          text-text-md text-content-primary
          placeholder:text-content-placeholder
          outline-none transition-colors
          hover:border-content-placeholder
          focus:border-accent-brand focus:ring-1 focus:ring-accent-brand
        "
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}          
        />
      </div>

      {/* Regra de senha */}
      <div className="mt-2 flex flex-col gap-2 text-text-sm">
          {/* Regra 1 */}
          <div className="flex items-center gap-2">
            {isLengthValid ? (
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent-brand text-[10px] leading-none text-background-primary">
                ✓
              </span>
            ) : (
              <img src={CancelIcon} alt="" className="h-3 w-3" />
            )}
            <span
              className={isLengthValid ? "text-content-body" : "text-accent-red"}
            >
              Pelo menos 8 caracteres
            </span>
          </div>

          {/* Regra 2 */}
          <div className="flex items-center gap-2">
            {hasNumberOrSymbol ? (
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent-brand text-[10px] leading-none text-background-primary">
                ✓
              </span>
            ) : (
              <img src={CancelIcon} alt="" className="h-3 w-3" />
            )}
            <span
              className={
                hasNumberOrSymbol ? "text-content-body" : "text-accent-red"
              }
            >
              Contém um número ou símbolo
            </span>
          </div>

          {/* Regra 3 */}
          <div className="flex items-center gap-2">
            {passwordsMatch ? (
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent-brand text-[10px] leading-none text-background-primary">
                ✓
              </span>
            ) : (
              <img src={CancelIcon} alt="" className="h-3 w-3" />
            )}
            <span
              className={passwordsMatch ? "text-content-body" : "text-accent-red"}
            >
              As senhas devem ser iguais
            </span>
          </div>
      </div>  

        {/* Botão Criar conta */}
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
            Criar conta
          </button>
    

      </div>

    </form>
    
    </div>
      
    
  );
}

export default CriarConta;
