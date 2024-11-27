// src/pages/Inicio.js
import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, CardMedia, Grid } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles/Inicio.css"; // Archivo CSS para los estilos

const profesiones = [
  {
    id: 1,
    nombre: "Cardiología",
    descripcion: "Especialistas en el corazón y sistema circulatorio.",
    imagen: "https://www.clinicauandes.cl/images/default-source/default-album/cardiologia_812x465-min.webp?sfvrsn=30d95572_1",
  },
  {
    id: 2,
    nombre: "Neurología",
    descripcion: "Expertos en el sistema nervioso y cerebro.",
    imagen: "https://d328k6xhl3lmif.cloudfront.net/images/default-source/default-album/img_neurologia-min.jpg?sfvrsn=9521c799_0",
  },
  {
    id: 3,
    nombre: "Pediatría",
    descripcion: "Atención médica para niños y adolescentes.",
    imagen: "https://8e93beb6.rocketcdn.me/core/webp-express/webp-images/uploads/2022/12/pediatria-1024x634.jpg.webp",
  },
  {
    id: 4,
    nombre: "Ginecología",
    descripcion: "Especialistas en salud femenina y sistema reproductivo.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7N4nsKZ0jZDUNAQxwJZytml7emMBWx2ZAQ&s",
  },
  {
    id: 5,
    nombre: "Dermatología",
    descripcion: "Expertos en la piel y sus enfermedades.",
    imagen: "https://www.esneca.lat/wp-content/uploads/dermatologia-estetica.png",
  },
];

function Inicio() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280, // Pantallas grandes
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 960, // Tablets
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600, // Smartphones
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Container maxWidth="lg" className="inicio-container">
      <Box className="inicio-hero">
        <Typography variant="h2" className="inicio-title">
          Bienvenido a GetMed
        </Typography>
        <Typography variant="h5" className="inicio-subtitle">
          Encuentra el especialista ideal para cuidar de tu salud.
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          href="/citas"
          className="inicio-button"
        >
          Programar Cita
        </Button>
      </Box>

      <Typography variant="h4" className="inicio-section-title">
        Especialidades Médicas
      </Typography>

      <Box>
        <Slider {...settings}>
          {profesiones.map((profesion) => (
            <Box key={profesion.id} className="inicio-slide">
              <Card className="inicio-card">
                <CardMedia
                  component="img"
                  height="250"
                  image={profesion.imagen}
                  alt={profesion.nombre}
                  className="inicio-card-image"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="primary"
                    className="inicio-card-title"
                  >
                    {profesion.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profesion.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      <Grid container spacing={3} className="inicio-grid">
        <Grid item xs={12} sm={6}>
          <Box className="inicio-feature-box feature-success">
            <Typography variant="h5" className="inicio-feature-title">
              Atención Personalizada
            </Typography>
            <Typography variant="body1">
              Contamos con un equipo de profesionales dispuestos a atender todas tus necesidades médicas.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className="inicio-feature-box feature-primary">
            <Typography variant="h5" className="inicio-feature-title">
              Tecnología Avanzada
            </Typography>
            <Typography variant="body1">
              Utilizamos los mejores equipos para garantizar la excelencia en nuestros diagnósticos y tratamientos.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Inicio;
