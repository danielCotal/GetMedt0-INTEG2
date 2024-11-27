import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Componentes/UserContext';
import { agregarReserva } from '../peticiones/reservacion';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Grid,
} from '@mui/material';

function Citas() {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/especialidades');
        const especialidadesUnicas = Array.from(
          new Set(response.data.map((espe) => espe.ID_Especialidad))
        ).map((id) => response.data.find((espe) => espe.ID_Especialidad === id));
        setEspecialidades(especialidadesUnicas);
      } catch (error) {
        console.error('Error obteniendo especialidades:', error);
        setError(true);
      }
    };
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    if (selectedEspecialidad) {
      const fetchHorarios = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/horarios?ID_Especialidad=${selectedEspecialidad}`
          );
          setHorarios(response.data);
        } catch (error) {
          console.error('Error al obtener horarios:', error);
          setError(true);
        }
      };
      fetchHorarios();
    }
  }, [selectedEspecialidad]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await agregarReserva(userId, selectedHorario);
        setMensaje('Reserva creada exitosamente');
        setError(false);
      } else {
        setMensaje('Inicia sesión para hacer una reserva');
        setError(true);
      }
    } catch (error) {
      console.error('Error creando reserva:', error);
      setMensaje('Error creando la reserva');
      setError(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: 2 }}>
      <Card sx={{ maxWidth: 600, width: '100%', padding: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Agregar Reserva
          </Typography>
          <form onSubmit={manejarSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Especialidad</InputLabel>
                  <Select
                    value={selectedEspecialidad}
                    onChange={(e) => setSelectedEspecialidad(e.target.value)}
                    required
                  >
                    <MenuItem value="">
                      <em>Seleccione una especialidad</em>
                    </MenuItem>
                    {especialidades.map((especialidad) => (
                      <MenuItem key={especialidad.ID_Especialidad} value={especialidad.ID_Especialidad}>
                        {especialidad.Nom_espe}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Horario</InputLabel>
                  <Select
                    value={selectedHorario}
                    onChange={(e) => setSelectedHorario(e.target.value)}
                    required
                  >
                    <MenuItem value="">
                      <em>Seleccione un horario</em>
                    </MenuItem>
                    {horarios.map((horario) => (
                      <MenuItem key={horario.ID_Horario} value={horario.ID_Horario}>
                        {horario.FechaHora} - Dr. {horario.Nom_medic} {horario.Apelli_medic}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Crear Reserva
                </Button>
              </Grid>
            </Grid>
          </form>
          {mensaje && (
            <Box mt={3}>
              <Alert severity={error ? 'error' : 'success'}>{mensaje}</Alert>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Citas;
