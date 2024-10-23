import React, { useState, useContext } from 'react';
import '../styles/Usuarios.css';
import { UserContext } from '../Componentes/UserContext';  // Importamos el contexto
import { getUserAppointments } from '../peticiones/getUserAppointments';
import { updateUserData } from '../peticiones/updateUserData';

const validateRut = (rut) => /^[0-9]{7,8}-[0-9Kk]{1}$/.test(rut);
const validateTelefono = (telefono) => /^[0-9]{9}$/.test(telefono);
const validateNombre = (nombre) => /^[A-Za-z\s]+$/.test(nombre) && nombre.length <= 65;

function Usuarios() {
  const { user, setUser, loading } = useContext(UserContext);  // Accedemos al usuario desde el contexto
  const [userAppointments, setUserAppointments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', rut: '', telefono: '' });
  const [validationError, setValidationError] = useState('');

  // Solo cargamos las citas si ya tenemos la información del usuario
  useState(() => {
    if (user && user.ID_User) {
      const fetchAppointments = async () => {
        try {
          const appointments = await getUserAppointments(user.ID_User);
          setUserAppointments(appointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
      fetchAppointments();
    }
  }, [user]);

  const handleEditClick = () => {
    setFormData({ nombre: user.nombre, rut: user.rut, telefono: user.telefono });
    setEditing(true);
  };

  const handleSaveClick = async () => {
    if (!validateNombre(formData.nombre)) {
      setValidationError('El nombre es inválido.');
      return;
    }
    if (!validateRut(formData.rut)) {
      setValidationError('El RUT es inválido.');
      return;
    }
    if (!validateTelefono(formData.telefono)) {
      setValidationError('El teléfono es inválido.');
      return;
    }

    try {
      await updateUserData(user.ID_User, formData);
      setUser({ ...user, ...formData });  // Actualizamos el contexto con los nuevos datos del usuario
      setEditing(false);
      setValidationError('');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationError('');
  };

  // Función para formatear la fecha y hora
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-ES', options);
    const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  };

  if (loading) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div className="pagina-usuarios">
      {user ? (
        <div>
          <h1>Mis Datos</h1>
          <div className="usuario-info">
            <div className="user-icon-container">
              <img src="user_icon.png" alt="Icono de usuario" className="user-icon" />
            </div>
            <div className="usuario-detalles">
              {editing ? (
                <>
                  <p><strong>Nombre:</strong>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                  </p>
                  <p><strong>RUT:</strong>
                    <input type="text" name="rut" value={formData.rut} onChange={handleChange} />
                  </p>
                  <p><strong>Teléfono:</strong>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                  </p>
                  <button className="editar-btn" onClick={handleSaveClick}>Guardar</button>
                  {validationError && <p className="error-message">{validationError}</p>}
                </>
              ) : (
                <>
                  <p><strong>Nombre:</strong> {user.nombre}</p>
                  <p><strong>RUT:</strong> {user.rut}</p>
                  <p><strong>Teléfono:</strong> {user.telefono}</p>
                  <button className="editar-btn" onClick={handleEditClick}>Editar datos</button>
                </>
              )}
              <p><strong>ID Usuario:</strong> {user.ID_User}</p>
            </div>
          </div>
          <h3>Citas Médicas</h3>
          <div className="usuario-info">
            {userAppointments.length > 0 ? (
              userAppointments.map((reserva, index) => {
                const { formattedDate, formattedTime } = formatDateTime(reserva.FechaCreacion);
                return (
                  <div key={index} className="reserva-cuadro">
                    <p><strong>Fecha:</strong> {formattedDate}</p>
                    <p><strong>Hora:</strong> {formattedTime}</p>
                    <p><strong>ID Reserva:</strong> {reserva.ID_Reserva}</p>
                  </div>
                );
              })
            ) : (
              <p>No hay citas médicas disponibles.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  );
}

export default Usuarios;


