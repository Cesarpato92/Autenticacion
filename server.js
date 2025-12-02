const express = require('express'); // frameword principal para crear el servidor web
const bodyParser = require('body-parser'); // Middleware para procesar los datos del cuerpo de las peticiones
const cors = require('cors'); // Middleware para habilitar CORS
const path = require('path'); // Modulo para trabajar con rutas de archivos y directorios
const authRutas = require('./Rutas/auth'); // importamos la rutas de autenticacion

// iniciamos la aplicacion express

const app = express();
const PORT = 3000; // Puerto donde correra el servidor

// Middlewares
app.use(cors()); // Habilitamos CORS para permitir las peticiones desde otros origenes
app.use(bodyParser.json()); // parsear el cuerpo de las peticiones como Json
app.use(express.static(path.join(__dirname, 'public'))); // servir archivos estaticos desde la carpeta public donde estan los HTML

// RUTAS
app.use('/api', authRutas);

// Iniciacion del servidor
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});