// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Cambia la ruta para apuntar a la carpeta styles

function Navbar() {
  return (
    <nav className='navegacion'>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/citas">Citas</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
