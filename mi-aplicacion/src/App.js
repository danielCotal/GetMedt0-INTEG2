import React, { useState } from 'react';
import Usuarios from './Usuarios';
import Reservas from './Reservas';
import './App.css';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null); // Para manejar el usuario seleccionado

  return (
    <div className="App">
      <h1>Gestión de Usuarios y Reservas</h1>
      {/* Componente para mostrar la lista de usuarios */}
      <Usuarios onSelectUser={setSelectedUserId} />
      {/* Mostrar las reservas del usuario seleccionado */}
      {selectedUserId && <Reservas userId={selectedUserId} />}
    </div>
  );
}

export default App;

