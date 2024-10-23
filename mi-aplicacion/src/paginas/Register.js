import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { crearCuenta } from '../peticiones/crearCuenta'; // Importar la función de petición

function Register() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    contraseña: '',
    email: '',
    telefono: '', // Solo almacenamos los 8 dígitos del teléfono
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validaciones
  const validateForm = () => {
    const { rut, nombre, contraseña, email, telefono } = formData;

    // Expresión regular para validar el RUT chileno
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    // Expresión regular para validar el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Expresión regular para validar los 8 dígitos del teléfono
    const telefonoRegex = /^\d{8}$/;

    // Validar RUT
    if (!rutRegex.test(rut)) {
      setError('RUT inválido. Debe tener el formato 12345678-9');
      return false;
    }

    // Validar nombre
    if (nombre.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.');
      return false;
    }

    // Validar contraseña
    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    // Validar correo electrónico
    if (!emailRegex.test(email)) {
      setError('Correo electrónico inválido.');
      return false;
    }

    // Validar teléfono (solo los 8 dígitos)
    if (!telefonoRegex.test(telefono)) {
      setError('El teléfono debe tener exactamente 8 dígitos.');
      return false;
    }

    // Si todas las validaciones pasan
    setError('');
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!validateForm()) return; // No enviar el formulario si no pasa la validación

    try {
      console.log('Datos enviados:', formData); // Debug para ver los datos antes del envío
      await crearCuenta({
        ...formData,
        telefono: `+56 9${formData.telefono}`, // Agregar el prefijo antes de enviar
      });
      alert('Cuenta creada exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error al crear la cuenta. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="register-container">
      <h1>REGISTRARSE</h1>
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="rut"
          placeholder="RUT"
          value={formData.rut}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Telefono, inserta los 8 numeros tras (+56 9 ...)"
          maxLength="8" // Limita la entrada a 8 dígitos
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="button" onClick={handleRegister}>
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}

export default Register;