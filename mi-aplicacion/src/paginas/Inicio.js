// src/pages/Inicio.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

function Inicio() {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', paddingTop: '40px' }}>
      <Box className="pagina-inicio" sx={{ backgroundColor: '#f0f4f8', borderRadius: '8px', p: 4 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Inicio de GetMed
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          ¿En qué podemos ayudar?
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          href="/citas"
          style={{ marginTop: '20px' }}
        >
          Programar Cita
        </Button>
      </Box>
    </Container>
  );
}

export default Inicio;
