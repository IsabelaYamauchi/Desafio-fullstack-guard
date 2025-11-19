import Sidebar from "../../components/Sidebar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CardListaContatos from "../../components/CardListaContatos";

function PaginaInicial() {

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("userEmail");
    if (saved) setUserEmail(saved);
  }, []);

  return (
    <div className="min-h-screen bg-background-primary text-content-primary flex">
      
      <Sidebar userEmail={userEmail} />

    <main className="flex-1 flex flex-col px-10 py-8">
        <h1 className="mb-6 text-text-lg font-semibold text-content-body">
        </h1>

        <div className="flex-1 flex items-center justify-center">
          <CardListaContatos />
        </div>
      </main>

    </div>

  );
}

export default PaginaInicial;