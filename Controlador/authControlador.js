const Usuario = require('../Modelo/modeloUsuario');

// este archivo maneja la logica de negoicio ara el registro e inicio de sesion

/**
 * Maneja la solicitud de registro de nuevos usuarios
 * @param {object} req - Objeto de solicitud (request)
 * @param {object} res - Objeto de respuesta (response)
 */

exports.registro = (req, res) => {
    // extraemos el username y password del cuerpo de la solicitud
    const {username, password} = req.body;

    // verificacion de si el usuario ya existe
    Usuario.encontrarPorNombre(username, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos', error: err});
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe'});
        }

        // si no existe creamos el nuevo usuario
        Usuario.crear(username, password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: ' Error al registrar al usuario', error: err});
            }
            // creacion de usuario exitosa -  se utiliza el codigo 201
            res.status(201).json({ message: 'Usuario registrado de forma exitosa'});
        });
    });
};

/**
 * Maneja la solicitud de inicio de sesión.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */

exports.login = (req, res) => {
    // extraemos los datos del cuerpo de la solicitud
    const {username, password} = req.body;

    Usuario.encontrarPorNombre(username, (err, results) => {
        if(err){
            return res.status(500).json({ message: 'Error en la base de datos', error:err});
        }
        if(results.length === 0){
            return res.status(401).json({ message: 'Error de autenticacion'});
        }
        // Obtiene el primer resultado
        const user = results[0];
        if(user.password === password){
            res.json({ message: 'Inicio de sesion correcto'});
        }
        else {
            res.status(401).json({ message: 'Error de inicio de sesion'});
        }
    });
}