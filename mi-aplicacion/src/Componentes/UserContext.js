import React, { createContext, useState, useEffect } from 'react';
import { getUserData } from '../peticiones/getUserData';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('ID_User') || null); // Verifica si está en localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const userData = await getUserData(userId); // Usar el ID almacenado en el contexto
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, userId, setUser, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};







