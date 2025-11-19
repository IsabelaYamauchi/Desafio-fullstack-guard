
import FundoCadastroLogin from "../../components/FundoCadastroLogin";
import CriarConta from "../../components/CriarConta";

function Cadastro() {
  return (
    <div className="min-h-screen flex bg-background-primary">

      <div className="hidden md:block md:w-1/2 lg:w-[55%]">
        <FundoCadastroLogin />
      </div>


      <div className="w-full md:w-1/2 lg:w-[45%] flex items-center justify-center">
        <CriarConta />
      </div>
    </div>
  );
}

export default Cadastro;
