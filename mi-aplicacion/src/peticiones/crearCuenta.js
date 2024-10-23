// src/peticiones/crearCuenta.js
import axios from 'axios';

export const crearCuenta = async (datosUsuario) => {
  try {
    const response = await axios.post('http://localhost:3001/api/usuario', datosUsuario);
    return response.data;
  } catch (error) {
    console.error('Error al crear la cuenta:', error);
    throw error.response ? error.response.data : { error: 'Error desconocido' };
  }
};
