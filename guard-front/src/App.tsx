import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "./routes/Cadastro";
import Login from "./routes/Login";
import PaginaInicial from "./routes/PaginaInicial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<PaginaInicial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
