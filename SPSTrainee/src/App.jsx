import React from "react";
import "./App.css";
//Componentes
import CrearCandidato from "./Componentes/CrearCandidato.jsx";
import EditarCandidato from "./Componentes/EditarCandidato.jsx";
import ListaCandidatos from "./Componentes/ListaCandidatos.jsx";
//Importamos router
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListaCandidatos />} />
          <Route path="/crearcandidato" element={<CrearCandidato />} />
          <Route path="/editarcandidato/:id" element={<EditarCandidato />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
