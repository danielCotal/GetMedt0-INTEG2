import React from 'react';
import { useState } from 'react';
import './FormRegisEstatic.css';  

const FormRegistro = () => {
  const [formData, setFormData] = useState({
    Usuario: '', Correo: '', Contra: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="FormRegistro">
      <div>
        <label htmlFor="usuario">Usuario:</label>
        <input 
          type="text" 
          id="usuario" 
          name="usuario" 
          value={formData.Usuario} 
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="correo">Correo:</label>
        <input 
          type="correo" 
          id="correo" 
          name="correo" 
          value={formData.Correo} 
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="contra">Contraseña:</label>
        <input 
          type="contra" 
          id="contra" 
          name="contra" 
          value={formData.Contra} 
          onChange={handleChange}
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};
export default FormRegistro;