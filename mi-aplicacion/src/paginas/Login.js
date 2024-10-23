import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 
import { inicio_sesion } from '../peticiones/inicio sesion'; 
import { UserContext } from '../Componentes/UserContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setUserId } = useContext(UserContext); // Cambiar de `setUniqueId` a `setUserId`

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const data = await inicio_sesion(formData.email, formData.password);

      // Guardar el `ID_User` en el localStorage y en el contexto
      if (data.ID_User) {
        setUserId(data.ID_User); // Guardar el ID en el contexto

        // Guardar el ID de usuario en el localStorage
        localStorage.setItem('ID_User', data.ID_User);

        // Redireccionar a la página de usuarios
        navigate('/');
      } else {
        console.error('ID_User no encontrado en la respuesta de la API');
      }
    } catch (error) {
      setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
  };

  const handleCreateAccount = () => {
    console.log('Crear cuenta con:', formData);
    navigate('/Register'); // Redirecciona a la página de registro (opcional)
  };



  return (
    <div className="page-container">
      <div className="login-container">
        <h1>INICIAR SESIÓN</h1>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            name="email" 
            placeholder="Correo electrónico" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          {error && <p className="error">{error}</p>}
          <div className="button-container">
            <button type="button" onClick={handleLogin}>
              Iniciar Sesión
            </button>
            <button type="button" onClick={handleCreateAccount}>
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;