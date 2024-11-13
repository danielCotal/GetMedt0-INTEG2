import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Usuarios from './paginas/Usuarios';
import Register from './paginas/Register';
import Citas from './paginas/Citas';
import Login from './paginas/Login';
import MisCitas from './paginas/misCitas';
import Navbar from './Componentes/Navbar';
import Chatbot from './Componentes/Chatbot'; // Importa el componente Chatbot
import './styles/App.css';
import { UserProvider } from './Componentes/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mis-citas" element={<MisCitas />} />
          </Routes>
          <Chatbot /> {/* Componente Chatbot agregado aquí para estar visible en todas las páginas */}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
