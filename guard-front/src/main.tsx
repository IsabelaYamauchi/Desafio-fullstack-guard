import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./routes/Cadastro";
import Login from "./routes/Login";
import "./index.css";
import PaginaInicial from "./routes/PaginaInicial";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<PaginaInicial/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);