import React from 'react';
import { useState } from 'react'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Componentes/Calendario.css';
import logo from './logo.svg';
import './App.css';
import FormRegistro from './Componentes/FormRegisEstatic.js';
import Usuarios from './Usuarios.js';
import EditarUsuario from './UsuarioEdicion.js'; 

function App() {
  const [date, setDate]= useState(new Date());
  const handleDateChange= (newDate) => {
    setDate(newDate);
    console.log('Fecha escogida:', newDate);
  };
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Controla si estás editando

  // Función para seleccionar un usuario para editar
  const handleEditUser = (id) => {
    setSelectedUserId(id);  
    setIsEditing(true);  
  };

  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setIsEditing(false);  // Cambia el estado para ocultar el formulario
  };

  // Función para manejar cuando un usuario es actualizado
  const handleUserUpdated = () => {
    setIsEditing(false);  // Cambia el estado para ocultar el formulario
  };

  return (
    <div className="App">
        <h1>Libreria de calendario adecuada "React Calendar"</h1>
        <Calendar onChange={handleDateChange} value={date}/>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Eliminación de Usuarios</h1>
        <Usuarios onSelectUser={setSelectedUserId} onEditUser={handleEditUser} />
        {/* Mostrar el formulario de edición si se está editando */}
        {isEditing && (
          <EditarUsuario
            userId={selectedUserId}  // Pasar el ID del usuario seleccionado
            onCancel={handleCancelEdit}  // Pasar la función para cancelar la edición
            onUserUpdated={handleUserUpdated}  // Manejar cuando el usuario ha sido actualizado
          />
        )}
        <h1>Registro de Usuarios</h1>
        <FormRegistro />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;
