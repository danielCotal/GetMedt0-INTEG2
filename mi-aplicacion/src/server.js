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
<<<<<<< HEAD:mi-aplicacion/src/server.js
app.get('/api/usuarios', (req, res) => {
=======
app.get('/usuarios', (req, res) => {
>>>>>>> origin/Ricardo:get-med/src/server.js
  const query = 'SELECT * FROM usuario';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo usuarios:', err);
      return res.status(500).send('Error obteniendo usuarios');
    }
    res.json(results);
  });
});

<<<<<<< HEAD:mi-aplicacion/src/server.js
app.get('/api/usuario/:id/reservas', (req, res) => {
=======
app.get('/usuario/:id/reservas', (req, res) => {
>>>>>>> origin/Ricardo:get-med/src/server.js
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

<<<<<<< HEAD:mi-aplicacion/src/server.js
=======

// Ruta para crear una nueva reserva
app.post('/reservas', (req, res) => {
  const { ID_User, ID_Horario, FechaCreacion } = req.body;

  // Verificar que todos los campos requeridos estén presentes
  if (!ID_User || !ID_Horario || !FechaCreacion) {
    return res.status(400).send('Faltan campos requeridos');
  }

  const query = 'INSERT INTO reserva (ID_User, ID_Horario, FechaCreacion) VALUES (?, ?, ?)';
  connection.query(query, [ID_User, ID_Horario, FechaCreacion], (err, results) => {
    if (err) {
      console.error('Error creando reserva:', err);
      return res.status(500).send('Error creando reserva');
    }
    res.status(201).json({ message: 'Reserva creada con éxito', id: results.insertId });
  });
});


app.post('/usuarios', (req, res) => {
  const { rut, contraseña } = req.body;
  console.log(req.body); // Imprimir los datos recibidos

  if (!rut || !contraseña) {
    return res.status(400).send('Faltan campos requeridos');
  }

  const query = 'INSERT INTO usuario (rut, Contraseña) VALUES (?, ?)';
  connection.query(query, [rut, contraseña], (err, results) => {
    if (err) {
      console.error('Error insertando usuario:', err);
      return res.status(500).send('Error insertando usuario');
    }
    res.status(201).json({ message: 'Usuario creado con éxito', id: results.insertId });
  });
});

// Ruta para obtener los horarios
app.get('/horarios', (req, res) => {
  const query = 'SELECT * FROM horario';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo horarios:', err);
      return res.status(500).send('Error obteniendo horarios');
    }
    res.status(200).json(results); // Devolver los horarios en formato JSON
  });
});

// Ruta para obtener las especialidades
app.get('/especialidad', (req, res) => {
    const query = 'SELECT Nom_Espe FROM especialidad'; 
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener especialidades' });
        }
        res.json(result);
    });
});

app.get('/doctores', (req, res) => {
    const especialidad = req.query.especialidad;
    const query = `
        SELECT m.Nom_medic 
        FROM medico m
        INNER JOIN especialidad e ON e.ID_Medic = m.ID_Medic
        WHERE e.Nom_Espe = ?`; 

    connection.query(query, [especialidad], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener doctores' });
        }
        res.json(result);
    });
});


>>>>>>> origin/Ricardo:get-med/src/server.js
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
<<<<<<< HEAD:mi-aplicacion/src/server.js

=======
>>>>>>> origin/Ricardo:get-med/src/server.js
