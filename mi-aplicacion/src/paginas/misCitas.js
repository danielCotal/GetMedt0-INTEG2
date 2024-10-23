import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/Inicio.css';
import { UserContext } from '../Componentes/UserContext'; // Importar el UserContext

function MisCitas() {
  const { userId } = useContext(UserContext); // Obtener el userId del contexto
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) { // Solo hace la petición si el userId existe
      setLoading(true);
      axios.get(`http://localhost:3001/api/usuario/${userId}/reservas`)
        .then(response => {
          setCitas(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener citas:', error);
          setError(error);
          setLoading(false);
        });
    }
  }, [userId]);

  const cancelarCita = (idReserva) => {
    axios.post(`http://localhost:3001/api/reservas/${idReserva}/cancelar`)
      .then(response => {
        setCitas(citas.map(cita =>
          cita.ID_Reserva === idReserva ? { ...cita, Cancelacion: true } : cita
        ));
      })
      .catch(error => {
        console.error('Error al cancelar la cita:', error);
      });
  };

  if (loading) {
    return <p>Cargando citas...</p>;
  }

  if (error) {
    return <p>Error al cargar las citas. Intenta nuevamente.</p>;
  }

  return (
    <div>
      <h2>Mis Citas</h2>
      <ul>
        {citas.length === 0 ? (
          <p>No tienes citas pendientes.</p>
        ) : (
          citas.map(cita => (
            <li key={cita.ID_Reserva}>
              <p>Fecha: {cita.FechaCreacion}</p>
              <p>Horario: {cita.ID_Horario}</p>
              <p>Cancelada: {cita.Cancelacion ? 'Sí' : 'No'}</p>
              {!cita.Cancelacion && (
                <button onClick={() => cancelarCita(cita.ID_Reserva)}>
                  Cancelar Cita
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default MisCitas;

