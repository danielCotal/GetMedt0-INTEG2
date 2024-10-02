const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importar cors
const connection = require('./conex'); // Importar la conexión

const app = express();
const port = 3001;

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuario';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo usuarios:', err);
      return res.status(500).send('Error obteniendo usuarios');
    }
    res.json(results);
  });
});

app.get('/api/usuario/:id/reservas', (req, res) => {
  const userId = req.params.id;
  const query = `
    SELECT r.ID_Reserva, r.FechaCreacion, r.Cancelacion, r.ID_Horario
    FROM reserva r
    WHERE r.ID_User = ?`;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error obteniendo reservas:', err);
      return res.status(500).send('Error obteniendo reservas');
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

