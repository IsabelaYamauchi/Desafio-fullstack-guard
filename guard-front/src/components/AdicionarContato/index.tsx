import { useState, type FormEvent } from "react";
import Perfil from "../../assets/perfil.svg";

export type NewContactInput = {
  name: string;   // mesmo nome do DTO
  email: string;  // mesmo nome do DTO
  phone: string;  // mesmo nome do DTO
};

type AdicionarContatoProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewContactInput) => Promise<void> | void;
};

function AdicionarContato({
  isOpen,
  onClose,
  onSubmit,
}: AdicionarContatoProps) {
  const [form, setForm] = useState<NewContactInput>({
    name: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleClose() {
    setForm({ name: "", phone: "", email: "" });
    setError("");
    onClose();
  }

  function validateEmail(email: string) {
    // validação simples pra não tomar 400 do @IsEmail logo de cara
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function normalizePhone(phone: string) {
    // tira caracteres não numéricos; você pode adaptar depois pra E.164 (+55...)
    return phone.replace(/\D/g, "");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!validateEmail(form.email.trim())) {
      setError("Digite um e-mail válido.");
      return;
    }

    const normalizedPhone = normalizePhone(form.phone);
    if (normalizedPhone.length < 8) {
      setError("Digite um telefone válido.");
      return;
    }

    setError("");

    await onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: normalizedPhone, // manda pro backend já “limpo”
    });

    handleClose();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* blur de fundo */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* card */}
      <div className="relative z-50 w-full max-w-sm rounded-3xl bg-background-primary px-6 py-5 shadow-xl">

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-text-lg font-semibold text-content-primary">
            Adicionar contato
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

        <div className="mb-4 h-px w-full bg-background-tertiary" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* avatar mock */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background-secondary">
              <img src={Perfil} alt="Perfil" />
            </div>

            <button
              type="button"
              className="rounded-md bg-background-secondary px-4 py-1 text-text-xs text-content-primary hover:bg-background-tertiary"
            >
              + Adicionar foto
            </button>
          </div>

          {/* campos */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-text-sm text-content-body">Nome</label>
              <input
                type="text"
                placeholder="Nome do contato"
                className="
                  h-9 w-full rounded-md border border-background-tertiary
                  bg-background-primary px-3
                  text-text-sm text-content-primary
                  placeholder:text-content-placeholder
                  outline-none transition-colors
                  hover:border-content-placeholder
                  focus:border-accent-brand focus:ring-1 focus:ring-accent-brand
                "
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-text-sm text-content-body">Telefone</label>
              <input
                type="text"
                placeholder="Número de telefone"
                className="
                  h-9 w-full rounded-md border border-background-tertiary
                  bg-background-primary px-3
                  text-text-sm text-content-primary
                  placeholder:text-content-placeholder
                  outline-none transition-colors
                  hover:border-content-placeholder
                  focus:border-accent-brand focus:ring-1 focus:ring-accent-brand
                "
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-text-sm text-content-body">E-mail</label>
              <input
                type="email"
                placeholder="Email do contato"
                className="
                  h-9 w-full rounded-md border border-background-tertiary
                  bg-background-primary px-3
                  text-text-sm text-content-primary
                  placeholder:text-content-placeholder
                  outline-none transition-colors
                  hover:border-content-placeholder
                  focus:border-accent-brand focus:ring-1 focus:ring-accent-brand
                "
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>

          {error && (
            <span className="text-text-xs text-accent-red">{error}</span>
          )}

          <div className="mt-4 h-px w-full bg-background-tertiary" />

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="
                h-9 rounded-md bg-background-tertiary px-6
                text-text-sm text-content-primary
                hover:bg-background-primary/60
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                h-9 rounded-md bg-accent-brand px-6
                text-text-sm font-semibold text-background-primary
                hover:brightness-110
              "
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdicionarContato;
