import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Usuarios({ onEditUser  }) {
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

  const eliminarUsuario = (id) => {
    axios.delete(`http://localhost:3001/api/usuario/${id}`)
      .then(() => {
        // Actualiza lista de usuarios después de eliminar
        setUsuarios(usuarios.filter(usuario => usuario.ID_User !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.ID_User}>
            <span>{usuario.rut}</span>
            <button onClick={() => onEditUser(usuario.ID_User)}>Editar</button>
            <button onClick={() => eliminarUsuario(usuario.ID_User)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
