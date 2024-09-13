import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Usuarios({ onSelectUser }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.ID_User}>
            <button onClick={() => onSelectUser(usuario.ID_User)}>
              {usuario.rut} (Seleccionar)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
