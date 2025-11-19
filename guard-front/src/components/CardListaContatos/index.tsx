import { useState, useMemo, useEffect } from "react";
import AdicionarContato, { type NewContactInput } from "../AdicionarContato";
import AvatarCarmen from "../../assets/carmen.svg";
import AvatarCristina from "../../assets/cristina.svg";
import Trancado from "../../assets/trancado.svg";
import Lupa from "../../assets/lupa.svg";
import Delete from "../../assets/delete.svg";
import Editar from "../../assets/editar.svg";
import Aberto from "../../assets/aberto.svg";
import VisualizarInformacoesModal from "../VisualizarInformacoes";
import BarraAlfabetica from "../BarraAlfabetica";

const API_URL = "http://localhost:3000";

type Contact = {
  id: number;
  name: string;
  tag?: string;
  phone: string;
  email: string;
  avatar?: string;
};

const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Carmen Lúcia",
    tag: "Trabalho",
    phone: "(16) 3537-7333",
    email: "carmen.lucia@example.com",
    avatar: AvatarCarmen,
  },
  {
    id: 2,
    name: "Cristina Silveira",
    tag: "Colega",
    phone: "(19) 3537-5664",
    email: "cristinasilveira88@example.com",
    avatar: AvatarCristina,
  },
];

function mask(value: string, active: boolean) {
  if (!active) return value;
  return "****************";
}

function CardListaContatos() {
  const [search, setSearch] = useState("");
  const [isEncryptedView, setIsEncryptedView] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [activeLetter, setActiveLetter] = useState("C");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // carregar contatos da API
  useEffect(() => {
    async function loadContacts() {
      try {
        const res = await fetch(`${API_URL}/contacts`);
        const data = await res.json();
        setContacts(data);
      } catch (e) {
        console.error("Erro ao carregar contatos, usando mocks", e);
        setContacts(MOCK_CONTACTS);
      }
    }

    loadContacts();
  }, []);

  // criar contato via API
  async function handleCreateContact(newContact: NewContactInput) {
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });

      if (!res.ok) {
        console.error(
          "Resposta da API ao criar contato:",
          res.status,
          await res.text()
        );
        alert("Erro ao salvar contato. Veja o console.");
        return;
      }

      const created = await res.json();
      setContacts((prev) => [...prev, created]);
    } catch (e) {
      console.error("Erro ao criar contato", e);
      alert("Erro de rede ao salvar contato. Veja o console.");
    }
  }

  // filtro por busca + letra
  const filteredContacts = useMemo(() => {
    const term = search.toLowerCase().trim();

    const source = contacts.length > 0 ? contacts : MOCK_CONTACTS;

    return source.filter((c) => {
      const firstLetter = c.name[0]?.toUpperCase();

      if (activeLetter && firstLetter !== activeLetter) return false;

      if (!term) return true;

      const haystack = [c.name, c.tag ?? "", c.phone, c.email]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [search, activeLetter, contacts]);

  function openPasswordModal() {
    setIsPasswordModalOpen(true);
  }

  function handleLockButtonClick() {
    if (isEncryptedView) {
      openPasswordModal();
    } else {
      setIsEncryptedView(true);
    }
  }

  function handlePasswordConfirm(password: string): boolean {
    const CORRECT_PASSWORD = "123456"; // mock

    if (password === CORRECT_PASSWORD) {
      setIsEncryptedView(false);
      return true;
    }

    return false;
  }

  return (
    <section className="min-h-[70vh] w-full max-w-6xl rounded-3xl bg-background-secondary px-10 py-8 shadow-lg">
      {/* header */}
      <header className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-heading font-bold text-content-primary">
          Lista de contatos
        </h2>

        <div className="flex flex-1 items-center justify-end gap-3">
          {/* buscar */}
          <div className="relative w-full max-w-sm">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <img src={Lupa} alt="" className="h-3 w-3" />
            </span>

            <input
              type="text"
              placeholder="Pesquisar"
              className="
                h-9 w-full rounded-md border border-background-tertiary
                bg-background-secondary pl-8 pr-3
                text-text-sm text-content-primary
                placeholder:text-content-placeholder
                outline-none transition-colors
                hover:border-content-placeholder
                focus:border-accent-brand focus:ring-1 focus:ring-accent-brand
              "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* adicionar contato */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="
              h-9 rounded-md bg-background-tertiary px-4
              text-text-sm font-semibold text-content-primary
              hover:brightness-110
            "
          >
            + Adicionar contato
          </button>

          {/* lock geral */}
          <button
            type="button"
            onClick={handleLockButtonClick}
            className={`
              h-9 w-9 rounded-md border flex items-center justify-center
              ${
                isEncryptedView
                  ? "bg-background-secondary border-background-tertiary"
                  : "bg-background-primary border-background-tertiary"
              }
            `}
            aria-label={
              isEncryptedView ? "Desbloquear informações" : "Bloquear informações"
            }
          >
            <img src={Trancado} alt="" className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* linha de separação */}
      <div className="mb-3 h-px w-full bg-background-tertiary" />

      {/* barra alfabética + lista */}
      <div className="mt-4 flex gap-6 rounded-2xl px-6 py-4">
        {/* barra lateral interna */}
        <BarraAlfabetica
          activeLetter={activeLetter}
          onChange={setActiveLetter}
        />

        {/* tabela de contatos */}
        <div className="flex-1">
          {/* cabeçalho tabela */}
          <div className="mb-3 grid grid-cols-[2fr,1fr,2fr,auto] text-text-xs text-content-muted">
            <span>Nome</span>
            <span>Telefone</span>
            <span>E-mail</span>
            <span></span>
          </div>

          {/* linhas */}
          <div className="flex flex-col gap-3">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="grid grid-cols-[2fr,1fr,2fr,auto] items-center text-text-md"
              >
                {/* nome + tag */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-background-tertiary">
                    {contact.avatar && (
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-content-primary">{contact.name}</span>
                    {contact.tag && (
                      <span className="text-text-xs text-content-muted">
                        {contact.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* telefone */}
                <span className="text-content-body">
                  {mask(contact.phone, isEncryptedView)}
                </span>

                {/* email */}
                <span className="text-content-body">
                  {mask(contact.email, isEncryptedView)}
                </span>

                {/* ações */}
                <div className="flex items-center justify-end gap-2">
                  {/* editar */}
                  <button
                    type="button"
                    className="
                      h-7 rounded-md border border-background-tertiary
                      px-3 text-text-xs text-content-primary
                      hover:bg-background-tertiary
                    "
                  >
                    <div className="flex items-center gap-1">
                      <img src={Editar} alt="Editar" className="h-2 w-2" />
                      Editar
                    </div>
                  </button>

                  {/* visualizar */}
                  <button
                    type="button"
                    onClick={openPasswordModal}
                    className="
                      h-7 w-7 rounded-md border border-background-tertiary
                      flex items-center justify-center text-content-muted
                      hover:bg-background-tertiary
                    "
                  >
                    <img src={Aberto} alt="Visualizar" className="h-4 w-4" />
                  </button>

                  {/* deletar */}
                  <button
                    type="button"
                    className="
                      h-7 w-7 rounded-md border border-background-tertiary
                      flex items-center justify-center text-content-muted
                      hover:bg-background-tertiary
                    "
                  >
                    <img src={Delete} alt="Excluir" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredContacts.length === 0 && (
              <p className="text-text-sm text-content-muted">
                Nenhum contato encontrado.
              </p>
            )}
          </div>
        </div>
      </div>

        <VisualizarInformacoesModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
      />

      <AdicionarContato
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateContact}
      />
    </section>
  );
}

export default CardListaContatos;
