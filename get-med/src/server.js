// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// Configuración de CORS para permitir el acceso desde el frontend
app.use(cors());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'getmed'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.log('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener las especialidades
app.get('/especialidad', (req, res) => {
    const query = 'SELECT nombre FROM especialidad'; 
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener especialidades' });
        }
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
