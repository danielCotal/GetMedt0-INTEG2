const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pagina'
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa como id ' + connection.threadId);
});

// Exportar la conexión para ser utilizada en otros archivos
module.exports = connection;




