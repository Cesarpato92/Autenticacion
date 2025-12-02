const express = require('express');
const ruta = express.Router(); // crea un enrudator de express
const authControlador = require('../Controlador/authControlador'); // importamos el controlador

// Definicion de las rutas

// Ruta POST para registrar a un usuario
ruta.post('/registro', authControlador.registro);

// Ruta POST para inicio de sesion
ruta.post('/login', authControlador.login);

// exportamos el enrutador para usarlo en el server
module.exports = ruta;