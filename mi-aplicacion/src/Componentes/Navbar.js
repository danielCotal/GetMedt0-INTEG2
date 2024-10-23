import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext'; // Importar el contexto de usuario
import '../styles/Navbar.css'; 

function Navbar() {
  const { user, setUser, setUserId } = useContext(UserContext); // Usar el contexto

  const cerrarSesion = () => {
    // Al cerrar sesión, limpiamos el usuario del contexto y del localStorage
    setUser(null);
    setUserId(null);
    localStorage.removeItem('ID_User');
  };

  return (
    <nav className='navegacion'>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>

        {/* Mostrar el enlace de citas solo si el usuario ha iniciado sesión */}
        {user ? (
          <>
            <li><Link to="/citas">Citas</Link></li>
            <li><Link to="/mis-citas">Manejo de citas</Link></li>
            <li><button onClick={cerrarSesion}>Cerrar Sesión</button></li>
          </>
        ) : (
          <li><Link to="/login">Iniciar Sesión</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;



