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

// manejador del evento de 'submit' para le formulario de registro
document.getElementById('registroForm').addEventListener('submit', async (e) =>{
    e.preventDefault(); // Evita el envio tradicional del formulario

    // Obtenemos los valores de los imputs
    const username = document.getElementById('registroUsername').value;
    const password = document.getElementById('registroPassword').value;
    const mensajeRegistro = document.getElementById('registroMensaje');

    try{
        // Enviar peticion POST al backend
        const respuesta = await fetch('/api/registro', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        //parseamos la respuesta JSON
        const datos = await respuesta.json();

        if(respuesta.ok){
            // Registro exitoso
            mensajeRegistro.style.color = 'green';
            mensajeRegistro.textContent = datos.mensaje;
        }
        else {
            // Error de registro
            mensajeRegistro.style.color = 'red';
            mensajeRegistro.textContent = datos.mensaje;
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
    const mensajeLogin = documento.getElementById('loginMensaje');

    try{
        //Enviamos peticion del login al backend\
        const respuesta = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        //parseamos la respuesta JSON
        const datos = await respuesta.json();

        if(respuesta.ok){
            // Login exitoso
            mensajeLogin.style.color = 'green';
            mensajeLogin.textContent = datos.mensaje;

            // Guardamos el usuario el localStorage para usarlo el la pagina de bienvenida
            localStorage.setItem('username', username);

            // Redirigimos a la pagina de bienvenida despues de 1 segundo
            setTimeout(() => {
                window.location.href = 'binevenido.html';
            }, 1000);
        }
        else{
            // Credenciales incorrectas
            mensajeLogin.style.color = 'red';
            mensajeLogin.textContent = datos.mensaje;
        }

    }
    catch (error){
        mensajeLogin.style.color = 'red';
        mensajeLogin.textContent = 'Error de conexion';
    }
});

