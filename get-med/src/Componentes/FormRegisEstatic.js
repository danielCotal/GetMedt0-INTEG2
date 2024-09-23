import React from 'react';
import { useState } from 'react';
import './FormRegisEstatic.css';
import axios from 'axios';

function FormRegistro() {
  const [formValues, setFormData] = useState({
    rut: '', Contraseña: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/registro', formValues);
      console.log('Usuario registrado:', response.data);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="FormRegistro">
      <div>
        <label htmlFor="rut">Rut:</label>
        <input 
          type="text" 
          id="rut" 
          name="rut" 
          value={formValues.rut} 
          onChange={handleChange}
          required 
          plaaceholder="12345678-9"
        />
      </div>
      <div>
        <label htmlFor="Contraseña">Contraseña:</label>
        <input 
          type="Contraseña" 
          id="Contraseña" 
          name="Contraseña" 
          value={formValues.Contraseña} 
          onChange={handleChange}
          required
          plaaceholder="Cree su contraseña"
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};
export default FormRegistro;