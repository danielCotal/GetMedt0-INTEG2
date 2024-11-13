import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { crearCuenta } from '../peticiones/crearCuenta';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#8e24aa',
    },
  },
});

function Register() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    contraseña: '',
    email: '',
    telefono: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const { rut, nombre, contraseña, email, telefono } = formData;
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{8}$/;

    if (!rutRegex.test(rut)) {
      setError('RUT inválido. Debe tener el formato 12345678-9');
      return false;
    }
    if (nombre.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.');
      return false;
    }
    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setError('Correo electrónico inválido.');
      return false;
    }
    if (!telefonoRegex.test(telefono)) {
      setError('El teléfono debe tener exactamente 8 dígitos.');
      return false;
    }

    setError('');
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      console.log('Datos enviados:', formData);
      await crearCuenta({
        ...formData,
        telefono: `+56 9${formData.telefono}`,
      });
      alert('Cuenta creada exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error al crear la cuenta. Inténtalo nuevamente.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 2, width: '100%' }}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
              REGISTRARSE
            </Typography>
            <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 2 }}>
              <TextField
                label="RUT"
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Contraseña"
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Correo Electrónico"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Teléfono (8 dígitos)"
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                inputProps={{ maxLength: 8 }}
              />
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                fullWidth
                sx={{ mt: 3 }}
              >
                Crear Cuenta
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
