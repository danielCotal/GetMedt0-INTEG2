import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Usuarios from './paginas/Usuarios';
import Citas from './paginas/Citas';
import Navbar from './componentes/Navbar';
import './styles/App.css'; // Asegúrate de que esté correcto

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/citas" element={<Citas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
