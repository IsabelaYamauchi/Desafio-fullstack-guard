
import FundoCadastroLogin from "../../components/FundoCadastroLogin";
import FazerLogin from "../../components/FazerLogin";

function Login() {
  return (
    <div className="min-h-screen flex bg-background-primary">
      <div className="hidden md:block md:w-1/2 lg:w-[55%]">
        <FundoCadastroLogin />
      </div>

      <div className="w-full md:w-1/2 lg:w-[45%] flex items-center justify-center">
        <FazerLogin />
      </div>
    </div>
  );
}

export default Login;
