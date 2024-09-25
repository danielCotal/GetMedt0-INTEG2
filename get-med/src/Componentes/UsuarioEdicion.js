import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EdicionUsuario({ userId, onCancel, onUserUpdated }) {
    const [usuario, setUsuario] = useState({ rut: '', Contraseña: '' });

    useEffect(() => {
      // Obtener los datos del usuario seleccionado
      axios.get(`http://localhost:3001/api/usuarios/${userId}`)
        .then(response => {
          setUsuario(response.data);  // Cargar los datos del usuario en el formulario
        })
        .catch(error => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }, [userId]); 
  
    // Manejar los cambios en el formulario
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUsuario({
        ...usuario,
        [name]: value
      });
    };
  // Enviar la actualización al backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/usuario/${userId}`, usuario)
      .then(response => {
        alert('Usuario actualizado correctamente');
        onUserUpdated();  // Notificar que el usuario fue actualizado
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
  };

  return (
    <div>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RUT:</label>
          <input
            type="text"
            name="rut"
            value={usuario.rut}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="Contraseña"
            value={usuario.Contraseña}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Actualizar Usuario</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default EdicionUsuario;