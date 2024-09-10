import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './paginas/HomePage';
import UsersPage from './paginas/UsersPage';
import AppointmentsPage from './paginas/AppointmentsPage';
import Navbar from './componentes/Navbar';
import './App.css'; // Corregida esta línea

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
