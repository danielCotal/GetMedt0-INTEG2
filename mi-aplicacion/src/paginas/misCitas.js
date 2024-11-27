import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Componentes/UserContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Chip,
  Box,
  CircularProgress,
} from '@mui/material';
import { format, isPast } from 'date-fns';

function MisCitas() {
  const { userId } = useContext(UserContext);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/api/usuario/${userId}/reservas`)
        .then((response) => {
          setCitas(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener citas:', error);
          setError(error);
          setLoading(false);
        });
    }
  }, [userId]);

  const cancelarCita = (idReserva) => {
    axios
      .post(`http://localhost:3001/api/reservas/${idReserva}/cancelar`)
      .then(() => {
        setCitas(
          citas.map((cita) =>
            cita.ID_Reserva === idReserva ? { ...cita, Cancelacion: true } : cita
          )
        );
      })
      .catch((error) => {
        console.error('Error al cancelar la cita:', error);
      });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography align="center" color="error">
        Error al cargar las citas. Intenta nuevamente.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Mis Citas
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        {citas.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No tienes citas pendientes.
          </Typography>
        ) : (
          <List>
            {citas.map((cita) => {
              const citaAtrasada = isPast(new Date(cita.FechaCreacion)) && !cita.Cancelacion;
              return (
                <ListItem
                  key={cita.ID_Reserva}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: citaAtrasada ? '#fef2f2' : '#f5f5f5',
                    borderRadius: '8px',
                    border: citaAtrasada ? '1px solid #ff6b6b' : 'none',
                  }}
                >
                  <Box flex="1">
                    <ListItemText
                      primary={`Horario: ${cita.ID_Horario}`}
                      secondary={`Fecha: ${format(new Date(cita.FechaCreacion), 'dd/MM/yyyy HH:mm')}`}
                    />
                    {citaAtrasada && (
                      <Chip label="Atrasada" color="error" sx={{ mt: 1 }} />
                    )}
                    {cita.Cancelacion && (
                      <Chip label="Cancelada" color="warning" sx={{ mt: 1 }} />
                    )}
                  </Box>
                  {!cita.Cancelacion && !citaAtrasada && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => cancelarCita(cita.ID_Reserva)}
                    >
                      Cancelar
                    </Button>
                  )}
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default MisCitas;
