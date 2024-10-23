export const getUserAppointments = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/usuario/${userId}/reservas`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  };

  
//petición para obtener las citas médicas del usuario