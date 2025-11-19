import Logo from '../../assets/logo.svg'
import Fundo from '../../assets/fundo.svg'


function FundoCadastroLogin() {
  return (
    <div className="relative h-full w-full bg-background-primary">
        {/* fundo*/}
        <div>
        <img className="h-full w-full object-cover " src={Fundo} alt="Fundo" />
        </div>

        {/* overlay */}
        <div className="absolute inset-0 bg-background-primary/70 backdrop-blur-md z-10" />

        {/* logo */}
         <div className="absolute top-6 left-8 z-20">
        <img src={Logo} alt="Guard" className="h-8" />
      </div>
    </div>
  )
}

export default FundoCadastroLogin