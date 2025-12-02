/**
 * Funcion para cambiar entre las pestañas de Login y Registro.
 * @param {string} tabName - El ID del contenedor a mostrar ('login' o 'registro').
 */
function showTab(tabName) {
    // Ocultar todos los formularios
    document.querySelectorAll('.form-container').forEach(div => {
        div.classList.remove('active');
    });
    // Desactivar estilos de todos los botones de pestaña
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar el formulario seleccionado
    document.getElementById(tabName).classList.add('active');

    // Activar visualmente el boton correspondiente
    const buttons = document.querySelectorAll('.tab-btn');
    if (tabName === 'login') buttons[0].classList.add('active');
    else buttons[1].classList.add('active');

    // Limpiar mensajes de error/exito anteriores
    document.getElementById('loginMensaje').textContent = '';
    document.getElementById('registroMensaje').textContent = '';
}

function validarFormulario(username, password) {
    if (!username || !password) {
        return 'Todos los campos son obligatorios';
    }
    if (username.length < 3) {
        return 'El usuario debe tener al menos 3 caracteres';
    }
    if (password.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
}

// manejador del evento de 'submit' para le formulario de registro
document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita el envio tradicional del formulario

    // Obtenemos los valores de los imputs
    const username = document.getElementById('registroUsername').value;
    const password = document.getElementById('registroPassword').value;
    const mensajeRegistro = document.getElementById('registroMensaje');

    // validamos los datos antes de procesarlos
    const errorValidacion = validarFormulario(username, password);
    if (errorValidacion) {
        mensajeRegistro.style.color = 'red';
        mensajeRegistro.textContent = errorValidacion;
        return; // Detiene la ejecucion 
    }

    try {
        // Enviar peticion POST al backend
        const respuesta = await fetch('/api/registro', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        //parseamos la respuesta JSON
        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Registro exitoso
            mensajeRegistro.style.color = 'green';
            mensajeRegistro.textContent = datos.message;
        }
        else {
            // Error de registro
            mensajeRegistro.style.color = 'red';
            mensajeRegistro.textContent = datos.message;
        }
    }
    catch (error) {
        mensajeRegistro.style.color = 'red';
        mensajeRegistro.textContent = 'Error de conexion';
    }
});

// manejador del evento 'submit' para el formulario de Login

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); //  evita recargar la pagina

    // obtemenos las credenciales
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const mensajeLogin = document.getElementById('loginMensaje');

    // validamos los datos antes de procesarlos
    const errorValidacion = validarFormulario(username, password);
    if (errorValidacion) {
        mensajeLogin.style.color = 'red';
        mensajeLogin.textContent = errorValidacion;
        return; // Detiene la ejecucion 
    }

    try {
        //Enviamos peticion del login al backend\
        const respuesta = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        //parseamos la respuesta JSON
        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Login exitoso
            mensajeLogin.style.color = 'green';
            mensajeLogin.textContent = datos.message;

            // Guardamos el usuario el localStorage para usarlo el la pagina de bienvenida
            localStorage.setItem('username', username);

            // Redirigimos a la pagina de bienvenida despues de 1 segundo
            setTimeout(() => {
                window.location.href = 'bienvenido.html';
            }, 1000);
        }
        else {
            // Credenciales incorrectas
            mensajeLogin.style.color = 'red';
            mensajeLogin.textContent = datos.message;
        }

    }
    catch (error) {
        mensajeLogin.style.color = 'red';
        mensajeLogin.textContent = 'Error de conexion';
    }
});

