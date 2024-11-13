const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importar cors
const connection = require('./conex'); // Importar la conexión
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator'); // Para manejar validaciones
const { validarUsuario, validarReserva } = require('./validaciones'); // Importar validaciones centralizadas

const app = express();
const port = 3001;

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Utilizamos Gmail en este ejemplo
  auth: {
    user: 'igetmed2024@gmail.com',   // Cambia esto a tu dirección de correo electrónico
    pass: 'vkzp kpnj gdgj eaol',        // Cambia esto a la contraseña del correo
  },
});

// Función para enviar el correo de confirmación de reserva
const enviarCorreo = (destinatario, detallesReserva) => {
  const mailOptions = {
    to: destinatario,                     // Correo del destinatario (dinámico)
    subject: 'Confirmación de tu reserva',
    text: `Hola, tu reserva ha sido creada con éxito.
          Detalles de la reserva:
          Usuario: ${detallesReserva.ID_User}
          Horario: ${detallesReserva.ID_Horario}
          Fecha de creación: ${detallesReserva.FechaCreacion}`
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error enviando correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

// --------------------------------------------------------
// RUTA DE INICIO DE SESIÓN
// --------------------------------------------------------
// RUTA DE INICIO DE SESIÓN
app.get('/api/usuario', (req, res) => {
  const { email, Contraseña } = req.query; // Extraemos los parámetros email y contraseña

  if (!email || !Contraseña) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const query = 'SELECT * FROM usuario WHERE email = ? AND Contraseña = ?';
  connection.query(query, [email, Contraseña], (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (results.length > 0) {
      const usuario = results[0];
      res.json({ ID_User: usuario.ID_User, usuario }); // Devuelve el ID_User en lugar de un identificador único
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
});


// --------------------------------------------------------
// OTRAS RUTAS DEL BACKEND
// --------------------------------------------------------

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (_req, res) => {
  const query = 'SELECT * FROM usuario';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo usuarios:', err);
      return res.status(500).send('Error obteniendo usuarios');
    }
    res.json(results);
  });
});



// Crear un nuevo usuario (con validación)
app.post('/api/usuario', validarUsuario, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rut, nombre, contraseña, email, telefono } = req.body;

  const query = `
    INSERT INTO usuario (rut, nombre, Contraseña, email, telefono) 
    VALUES (?, ?, ?, ?, ?)
  `;
  connection.query(query, [rut, nombre, contraseña, email, telefono], (err, results) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
    res.status(201).json({ message: 'Usuario creado exitosamente', id: results.insertId });
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

// Ruta para obtener las especialidades junto con el ID del médico
app.get('/api/especialidades', (req, res) => {
  const query = `
    SELECT e.ID_Especialidad, e.Nom_espe, e.ID_Medic, m.Nom_medic, m.Apelli_medic
    FROM especialidad e
    JOIN medico m ON e.ID_Medic = m.ID_Medic`;  // Unión con la tabla de médicos
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo especialidades:', err);
      return res.status(500).send('Error obteniendo especialidades');
    }
    res.status(200).json(results);  // Enviar los resultados como JSON
  });
});

// Crear una nueva reserva (con validación)
app.post('/api/reservas', validarReserva, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ID_User, ID_Horario } = req.body;
  const FechaCreacion = new Date().toISOString().slice(0, 10);

  const queryUsuario = 'SELECT email FROM usuario WHERE ID_User = ?';
  connection.query(queryUsuario, [ID_User], (err, userResults) => {
    if (err) {
      console.error('Error obteniendo el email del usuario:', err);
      return res.status(500).send('Error obteniendo el email del usuario');
    }

    if (userResults.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    const emailUsuario = userResults[0].email;

    const queryMedico = `
      SELECT m.Correo_medico
      FROM horario h
      JOIN medico m ON h.ID_Medic = m.ID_Medic
      WHERE h.ID_Horario = ?
    `;
    connection.query(queryMedico, [ID_Horario], (err, medicoResults) => {
      if (err) {
        console.error('Error obteniendo el email del médico:', err);
        return res.status(500).send('Error obteniendo el email del médico');
      }

      if (medicoResults.length === 0) {
        return res.status(404).send('Médico no encontrado');
      }

      const emailMedico = medicoResults[0].Correo_medico;

      const queryReserva = 'INSERT INTO reserva (ID_User, ID_Horario, FechaCreacion) VALUES (?, ?, ?)';
      connection.query(queryReserva, [ID_User, ID_Horario, FechaCreacion], (err, results) => {
        if (err) {
          console.error('Error creando reserva:', err);
          return res.status(500).send('Error creando reserva');
        }

        const detallesReserva = { ID_User, ID_Horario, FechaCreacion };
        enviarCorreo(emailUsuario, detallesReserva);
        enviarCorreo(emailMedico, detallesReserva);

        res.status(201).json({ message: 'Reserva creada exitosamente y correos enviados' });
      });
    });
  });
});

// Ruta para cancelar una cita
app.post('/api/reservas/:id/cancelar', (req, res) => {
  const reservaId = req.params.id;
  
  const query = 'UPDATE reserva SET Cancelacion = 1 WHERE ID_Reserva = ?';
  connection.query(query, [reservaId], (err, results) => {
    if (err) {
      console.error('Error cancelando la reserva:', err);
      return res.status(500).send('Error cancelando la reserva');
    }
    res.status(200).json({ message: 'Reserva cancelada exitosamente' });
  });
});

// Ruta para obtener los horarios filtrados por especialidad
app.get('/api/horarios', (req, res) => {
  const { ID_Especialidad } = req.query;

  if (!ID_Especialidad) {
    return res.status(400).send('ID de la especialidad es requerido');
  }

  // Consulta para obtener los horarios relacionados con la especialidad seleccionada
  const query = `
    SELECT h.*
    FROM horario h
    JOIN medico m ON h.ID_Medic = m.ID_Medic
    JOIN especialidad e ON m.ID_Medic = e.ID_Medic
    WHERE e.ID_Especialidad = ?
  `;

  connection.query(query, [ID_Especialidad], (err, results) => {
    if (err) {
      console.error('Error obteniendo horarios:', err);
      return res.status(500).send('Error obteniendo horarios');
    }
    res.status(200).json(results);
  });
});



// Ruta para obtener los datos de un usuario específico por ID_User
app.get('/api/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM usuario WHERE ID_User = ?';
  
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error obteniendo usuario:', err);
      return res.status(500).send('Error obteniendo usuario');
    }
    
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  });
});


app.put('/api/usuarios/:id', (req, res) => {
  const { nombre, rut, telefono } = req.body;
  const userId = req.params.id;

  const query = `UPDATE usuario SET nombre = ?, rut = ?, telefono = ? WHERE ID_User = ?`;
  
  connection.query(query, [nombre, rut, telefono, userId], (err, result) => {
    if (err) {
      console.error('Error actualizando usuario:', err);
      res.status(500).send('Error actualizando el usuario');
    } else {
      res.json({ message: 'Usuario actualizado correctamente' });
    }
  });
});


// Ruta principal
app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});