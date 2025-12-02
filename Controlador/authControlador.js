const Usuario = require('../Modelo/modeloUsuario');
const bcrypt = require('bcrypt');

// este archivo maneja la logica de negocio para el registro e inicio de sesion

/**
 * Maneja la solicitud de registro de nuevos usuarios
 * @param {object} req - Objeto de solicitud (request)
 * @param {object} res - Objeto de respuesta (response)
 */
exports.registro = async (req, res) => {
    // extraemos el username y password del cuerpo de la solicitud
    const { username, password } = req.body;
 
    try {
        // validacion de datos
        if (!username || !password) {
            return  res.status(400).json( { message: 'Los campos son obligatorios'});
        }
        if (username.length < 6) {
            return  res.status(400).json( { message: 'El usuario debe tener al menos 6 caracteres'});
        }
        if (password.length < 8) {
            return  res.status(400).json( { message: 'La contraseña debe tener al menos 8 caracteres'});
        }
        // verificacion de si el usuario ya existe
        Usuario.encontrarPorNombre(username, async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error en la base de datos', error: err });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            
            // Encriptar el password antes de guardarlo
            const saltRounds = 10; // Número de rondas de sal (cost factor)
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // si no existe creamos el nuevo usuario con el password encriptado
            Usuario.crear(username, hashedPassword, (err, result) => {
                if (err) {
                    return res.status(500).json({ 
                        message: 'Error al registrar al usuario', 
                        error: err 
                    });
                }
                // creacion de usuario exitosa - se utiliza el codigo 201
                res.status(201).json({ message: 'Usuario registrado de forma exitosa' });
            });
        });
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error al encriptar la contraseña', 
            error: error 
        });
    }
};

/**
 * Maneja la solicitud de inicio de sesión.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 */
exports.login = (req, res) => {
    // extraemos los datos del cuerpo de la solicitud
    const { username, password } = req.body;

    Usuario.encontrarPorNombre(username, async (err, results) => {
        if (err) {
            return res.status(500).json({ 
                message: 'Error en la base de datos', 
                error: err 
            });
        }
        if (results.length === 0) {
            return res.status(401).json({ 
                message: `El usuario ${username} no existe ` 
            });
        }
        
        // Obtiene el primer resultado
        const user = results[0];
        
        try {
            // Comparar el password proporcionado con el hash almacenado
            const esValidaPassword = await bcrypt.compare(password, user.password);
            
            if (esValidaPassword) {
                res.json({ message: 'Inicio de sesion correcto' });
            } else {
                res.status(401).json({ message: 'Error de inicio de sesion' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al verificar la contraseña', 
                error: error 
            });
        }
    });
};