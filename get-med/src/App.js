import React from 'react';
import { useState } from 'react'; 
import Calendario from './Componentes/Calendario.js';
import './App.css';
import './Componentes/Botones.css';
import FormRegistro from './Componentes/FormRegisEstatic.js';
import Usuarios from './Componentes/Usuarios.js';
import EditarUsuario from './Componentes/UsuarioEdicion.js'; 
import PerfilUsuario from './Componentes/PerfilUsuario.js';

function App() {
  const [date, setDate] = useState(null);  // Para almacenar la fecha seleccionada
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Controla si estás editando
  const [currentView, setCurrentView] = useState('home'); // Estado para controlar la vista actual

  // Función que recibe la fecha seleccionada del componente Calendario
  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log('Fecha seleccionada:', newDate);
  };

  // Función cambiar a vista del perfil del usuario
  const goToProfile = () => {
    setCurrentView('perfil');
  };

  // Función volver a vista principal
  const goBack = () => {
    setCurrentView('home');
  };

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
        <h1>Libreria de calendario adecuada "React Datepicker"</h1>
        {/* Componente Calendario para selección de fecha y hora */}
        <Calendario onDateChange={handleDateChange} />
        <h1>Eliminación y Edicion de Usuarios</h1>
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
        <h1>Tipos de botones segun mockup</h1>
        <button class="btn-uno">Boton 1</button>
        <button class="btn-eliminacion">Boton 2</button>
        {currentView === 'home' && (
          <div>
            <h1>Perfil prototipo</h1>
            <button onClick={goToProfile} className="btn-uno">
              Ver Perfil
            </button>
          </div>
        )}
        {currentView === 'perfil' && <PerfilUsuario onBack={goBack} />}
    </div>
  );
}

export default App;
