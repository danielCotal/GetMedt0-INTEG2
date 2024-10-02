import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reservas({ userId }) {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);  // Agregar un estado de carga
  const [error, setError] = useState(null);  // Agregar un estado de error

  useEffect(() => {
    setLoading(true); // Iniciar el estado de carga
<<<<<<< HEAD:mi-aplicacion/src/Reservas.js
    axios.get(`http://localhost:3001/api/usuario/${userId}/reservas`)
=======
    axios.get(`http://localhost:3001/usuario/${userId}/reservas`)
>>>>>>> origin/Ricardo:get-med/src/Reservas.js
      .then(response => {
        setReservas(response.data);
        setLoading(false);  // Terminar el estado de carga
      })
      .catch(error => {
        console.error('Error al obtener reservas:', error);
        setError(error);  // Guardar el error
        setLoading(false);  // Terminar el estado de carga
      });
  }, [userId]);

  if (loading) {
    return <p>Cargando reservas...</p>;  // Mostrar mientras carga
  }

  if (error) {
    return <p>Hubo un error al obtener las reservas. Intenta nuevamente más tarde.</p>;
  }

  return (
    <div>
      <h2>Reservas del Usuario {userId}</h2>
      <ul>
        {reservas.length === 0 ? (
          <p>No hay reservas para este usuario.</p>
        ) : (
          reservas.map((reserva) => (
            <li key={reserva.ID_Reserva}>
              <p>Fecha: {reserva.FechaCreacion}</p>
              <p>Horario: {reserva.ID_Horario}</p>
              <p>Cancelada: {reserva.Cancelacion ? 'Sí' : 'No'}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Reservas;

