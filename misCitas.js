import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/MisCitas.css'; // Archivo de estilos exclusivo para MisCitas
import { UserContext } from '../Componentes/UserContext';

function MisCitas() {
  const { userId } = useContext(UserContext);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
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
      .then(() => {
        setCitas(citas.map(cita =>
          cita.ID_Reserva === idReserva ? { ...cita, Cancelacion: true } : cita
        ));
      })
      .catch(error => {
        console.error('Error al cancelar la cita:', error);
      });
  };

  if (loading) {
    return <p className="loading">Cargando citas...</p>;
  }

  if (error) {
    return <p className="error">Error al cargar las citas. Intenta nuevamente.</p>;
  }

  return (
    <div className="citas-container">
      <h2>Mis Citas</h2>
      <ul className="citas-list">
        {citas.length === 0 ? (
          <p className="no-citas">No tienes citas pendientes.</p>
        ) : (
          citas.map(cita => (
            <li key={cita.ID_Reserva} className="cita-card">
              <div className="cita-info">
                <p><strong>Fecha:</strong> {cita.FechaCreacion}</p>
                <p><strong>Horario:</strong> {cita.ID_Horario}</p>
                <p><strong>Cancelada:</strong> {cita.Cancelacion ? 'Sí' : 'No'}</p>
              </div>
              {!cita.Cancelacion && (
                <button className="cancelar-btn" onClick={() => cancelarCita(cita.ID_Reserva)}>
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
