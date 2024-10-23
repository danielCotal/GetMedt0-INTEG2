import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Componentes/UserContext';
import { agregarReserva } from '../peticiones/reservacion';
import axios from 'axios';

function Citas() {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate(); // Para redireccionar
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Si no hay usuario autenticado, redirigimos al login
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/especialidades');
        // Normalizamos las especialidades eliminando las repetidas
        const especialidadesUnicas = Array.from(
          new Set(response.data.map(espe => espe.ID_Especialidad))
        ).map(id => {
          return response.data.find(espe => espe.ID_Especialidad === id);
        });
        setEspecialidades(especialidadesUnicas);
      } catch (error) {
        console.error('Error obteniendo especialidades:', error);
      }
    };

    fetchEspecialidades();
  }, []);

  // Obtener los horarios filtrados por especialidad
  useEffect(() => {
    if (selectedEspecialidad) {
      const fetchHorarios = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/horarios?ID_Especialidad=${selectedEspecialidad}`);
          setHorarios(response.data);
        } catch (error) {
          console.error('Error al obtener horarios:', error);
        }
      };

      fetchHorarios();
    }
  }, [selectedEspecialidad]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await agregarReserva(userId, selectedHorario);
        setMensaje('Reserva creada exitosamente');
      } else {
        setMensaje('Inicia sesión para hacer una reserva');
      }
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
          <label>Especialidad:</label>
          <select
            value={selectedEspecialidad}
            onChange={(e) => setSelectedEspecialidad(e.target.value)}
            required
          >
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.ID_Especialidad} value={especialidad.ID_Especialidad}>
                {especialidad.Nom_espe}
              </option>
            ))}
          </select>
        </div>
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
                {horario.FechaHora} - Dr. {horario.Nom_medic} {horario.Apelli_medic}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Crear Reserva</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Citas;






