import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AgregarReserva({ userId }) {
  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Obtener horarios disponibles al cargar el componente
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/horarios');
        setHorarios(response.data); // Guardar los horarios disponibles
      } catch (error) {
        console.error('Error al obtener horarios:', error);
      }
    };

    fetchHorarios();
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/reservas', {
        ID_User: userId,
        ID_Horario: selectedHorario,
        FechaCreacion: fechaCreacion,
      });

      setMensaje('Reserva creada exitosamente');
    } catch (error) {
      console.error('Error creando reserva:', error);
      setMensaje('Error creando la reserva');
    }
  };

  return (
    <div>
      <h2>Agregar Reserva</h2>
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Horario:</label>
          <select
            value={selectedHorario}
            onChange={(e) => setSelectedHorario(e.target.value)}
            required
          >
            <option value="">Seleccione un horario</option>
            {horarios.map((horario) => (
              <option key={horario.ID_Horario} value={horario.ID_Horario}>
                {horario.FechaHora} - Médico ID: {horario.ID_Medic}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha de Creación:</label>
          <input
            type="date"
            value={fechaCreacion}
            onChange={(e) => setFechaCreacion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Reserva</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AgregarReserva;
