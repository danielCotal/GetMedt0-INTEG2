import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { inicio_sesion } from '../peticiones/inicio sesion';
import { UserContext } from '../Componentes/UserContext';

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

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setUserId } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const data = await inicio_sesion(formData.email, formData.password);
      if (data.ID_User) {
        setUserId(data.ID_User);
        localStorage.setItem('ID_User', data.ID_User);
        navigate('/');
      } else {
        console.error('ID_User no encontrado en la respuesta de la API');
      }
    } catch (error) {
      setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/Register');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 2 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              INICIAR SESIÓN
            </Typography>
            <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 2 }}>
              <TextField
                label="Correo electrónico"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  sx={{ width: '48%' }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCreateAccount}
                  sx={{ width: '48%' }}
                >
                  Crear Cuenta
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
