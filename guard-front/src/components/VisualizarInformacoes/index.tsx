import { useState, type FormEvent } from "react";

type VisualizarInformacoesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => boolean;
};

function VisualizarInformacoesModal({
  isOpen,
  onClose,
  onConfirm,
}: VisualizarInformacoesModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleClose() {
    setPassword("");
    setError("");
    onClose();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!password.trim()) {
      setError("Digite sua senha.");
      return;
    }

    const ok = onConfirm(password);
    if (!ok) {
      setError("Senha incorreta.");
      return;
    }

    // senha ok =>limpa e fecha
    setPassword("");
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* blur */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={handleClose}
      />

        {/* card */}
      <div className="relative z-50 w-full max-w-sm min-h-[38vh] rounded-2xl bg-background-primary px-8 py-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-text-lg font-semibold text-content-primary">
            Visualizar informações
          </h3>

          <button
            type="button"
            onClick={handleClose}
            className="text-content-muted hover:text-content-primary"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* linha  */}
        <div className="my-6 h-px w-full bg-background-tertiary" />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-text-sm font-bold text-content-primary">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              className="
                h-10 w-full rounded-md border border-background-tertiary
                bg-background-primary px-3
                text-text-sm text-content-primary
                placeholder:text-content-placeholder
                outline-none transition-colors
                hover:border-content-placeholder
                focus:border-accent-brand focus:ring-1 focus:ring-accent-brand
              "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
            />

            {error && (
              <span className="text-text-xs text-accent-red">
                {error}
              </span>
            )}
          </div>

          {/* linha*/}
          <div className="my-6 h-px w-full bg-background-tertiary" />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="
                h-9 px-6 rounded-md bg-background-tertiary
                text-text-sm text-content-primary
                hover:bg-background-primary/60
              "
            >
              Voltar
            </button>

            <button
              type="submit"
              className="
                h-9 px-6 rounded-md bg-accent-brand
                text-text-sm font-semibold text-background-primary
                hover:brightness-110
              "
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VisualizarInformacoesModal;
