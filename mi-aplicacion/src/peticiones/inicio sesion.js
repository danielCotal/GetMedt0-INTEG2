import axios from 'axios';

export const inicio_sesion = async (email, password) => {
  try {
    const response = await axios.get('http://localhost:3001/api/usuario', {
      params: { email, Contraseña: password }, // Enviar correctamente como params
    });

    return response.data;
  } catch (error) {
    console.error('No se ha logrado iniciar sesión:', error);
    throw error.response ? error.response.data : { error: 'Error desconocido' };
  }
};
