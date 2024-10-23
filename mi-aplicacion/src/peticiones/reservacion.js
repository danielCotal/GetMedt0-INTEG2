// peticiones/reservacion.js
import axios from 'axios';

export const agregarReserva = async (userId, selectedHorario) => {
  const fechaCreacion = new Date().toISOString().slice(0, 10);

  try {
    const response = await axios.post('http://localhost:3001/api/reservas', {
      ID_User: userId,
      ID_Horario: selectedHorario,
      FechaCreacion: fechaCreacion
    });
    return response.data;
  } catch (error) {
    console.error('Error creando la reserva:', error);
    throw error;
  }
};
