import LogoMini from "../../assets/logo-mini.svg"



function FundoPaginaInicial() {


    return ( 
        <aside className="h-full min-h-screen w-24 bg-background-primary flex flex-col items-center justify-between py-8">
            <div className="flex flex-col items-center gap-6">
                <img src={LogoMini} alt="Guard" className="h-8" />
            
            </div>
            </aside>
        
    )
}

export default FundoPaginaInicial