const mysql = require('mysql2');

// configuracion de la conexion
// Se utliza el paquete mysql12 para establecer la conexion
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'login_node'
});

// Establecer conexion con la base de datos
conexion.connect((error) => {
    if (error) {
        console.error('Error conectando a la DB:', error);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Exportar la conexion para usarla en otros archivos 
module.exports = conexion;
