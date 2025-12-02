const mysql = require("mysql12");

// configuracion de la conexion
// Se utliza el paquete mysql12 para establecer la conexion
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: 'root',  
    database: 'login_node' 
});

// Establecer conexion con la base de datos
connection.connect((err) => {
    if (err) {
        // Si hay un error se muestra en consola
        console.error('Error conectando a MySQL:', err);
        return;
    }
    // Mensaje de exito al conectar
    console.log('Conexion existosa a MySQL');
});

// Exportar la conexion para usarla en otros archivos 
module.exports = connection;
