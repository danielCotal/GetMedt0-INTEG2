import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../styles/Navbar.css';
import { Home, People, Event, Logout, Login } from '@mui/icons-material';

function Navbar() {
  const { user, setUser, setUserId } = useContext(UserContext);

  const cerrarSesion = () => {
    setUser(null);
    setUserId(null);
    localStorage.removeItem('ID_User');
  };

  return (
    <nav className="navegacion">
      <ul>
        <li><Link to="/"><Home fontSize="large" /> Inicio</Link></li>
        <li><Link to="/usuarios"><People fontSize="large" /> Usuarios</Link></li>

        {user ? (
          <>
            <li><Link to="/citas"><Event fontSize="large" /> Citas</Link></li>
            <li><Link to="/mis-citas">Manejo de citas</Link></li>
            <li><button className="logout-button" onClick={cerrarSesion}><Logout /> Cerrar Sesión</button></li>
          </>
        ) : (
          <li><Link to="/login"><Login /> Iniciar Sesión</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
