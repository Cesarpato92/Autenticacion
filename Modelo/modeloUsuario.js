// importamos la configuraciion de la conexion a la DB
const db = require('../Config/config-db');

/* Este archivo contiene las funciones que interactuan con la tabla 'users' de la BD */

const Usuario = {
    /**
     * Crea un nuevo usuario en la base de datos.
     * @param {string} username - Nombre de usuario.
     * @param {string} password - Contraseña del usuario.
     * @param {function} callback - Función a ejecutar después de la consulta.
     */

    crear: (username, password, callback) => {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query (sql, [username, password], callback);
    },
    /**
     * Busca un usuario por su nombre de usuario.
     * @param {string} username - Nombre de usuario a buscar.
     * @param {function} callback - Función a ejecutar con los resultados.
     */
    encontrarPorNombre: (username, callback) => {
        const sql =  'SELECT * FROM users WHERE username = ?';
        // Ejecutar la consulta
        db.query(sql, [username], callback);
    }
};

// exportamos el  modelo para ser usado en los controladores
module.exports = Usuario;