import LogoMini from "../../assets/logo-mini.svg";
import BotaoIcon from "../BotaoIcon";
import Perfil from "../../assets/perfil.svg";
import Logout from "../../assets/logout.svg";
import Config from "../../assets/config.svg";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  userEmail?: string;
};

function Sidebar({ userEmail }: SidebarProps) {
  const navigate = useNavigate();

  const savedEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  const emailToShow = userEmail ?? savedEmail ?? "";

  return (
    <aside className="min-h-screen w-28 bg-background-primary flex flex-col">
      {/* logo */}
      <div className="flex items-center justify-center pt-8">
        <img src={LogoMini} alt="Guard" className="h-8" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <nav className="flex flex-col items-center gap-5">
          {/* ativo */}
          <BotaoIcon active>
            <img src={Perfil} alt="Ícone de perfil" className="h-5 w-5" />
          </BotaoIcon>

          {/* logout */}
          <BotaoIcon onClick={() => navigate("/cadastro")}>
            <img src={Logout} alt="Ícone de logout" className="h-5 w-5" />
          </BotaoIcon>

          {/* config */}
          <BotaoIcon>
            <img src={Config} alt="Ícone de configuração" className="h-5 w-5" />
          </BotaoIcon>
        </nav>
      </div>

      {/*e-mail do usuário */}
      <div className="px-5 pb-8 text-left text-text-xs text-content-muted">
        <p className="mb-1">Logado como:</p>
        <p className="break-all text-content-body">{emailToShow}</p>
      </div>
    </aside>
  );
}

export default Sidebar;
