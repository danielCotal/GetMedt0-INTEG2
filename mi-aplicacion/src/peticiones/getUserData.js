export const getUserData = async (userId) => {
  if (!userId) {
    throw new Error('No se ha proporcionado un ID de usuario.');
  }

  try {
    const response = await fetch(`http://localhost:3001/api/usuarios/${userId}`);

    if (!response.ok) {
      const textResponse = await response.text();
      console.error('Respuesta inesperada:', textResponse);
      throw new Error('Error en la respuesta de la API');
    }

    const data = await response.json();

    if (data) {
      return data; // Devolver los datos del usuario
    } else {
      throw new Error('No se encontró el usuario con el ID proporcionado.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};



