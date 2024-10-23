export const updateUserData = async (userId, formData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

// actualización de los datos del usuario