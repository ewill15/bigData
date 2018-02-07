var formRegistro = document.getElementsByClassName('registro')[0],
    formReserva = document.getElementsByClassName('reserva')[0];

// Almacenamos el objeto localStorage en una variable
var Storage = window.localStorage
// Verificar si localStorage tiene alguna
if (Storage.length > 0 && Storage.hasOwnProperty('usuario')) {
    // Si la llave usuario existe en localStorage mostrar el formulario de reserva
    formReserva.className = "reserva"
    formRegistro.className = "registro hide"
} else {
    // Si no existe se debe mostrar el formulario de regisro
    formRegistro.className = "registro"
    formReserva.className += "reserva hide"
}


var botonRegistro = document.getElementById('registrar'),
    botonReserva = document.getElementById('reservar')
inputDocumento = document.getElementById('numDocRes');

var usuarios = [];

botonRegistro.addEventListener('click', function(e) {
    e.preventDefault();
    registrarUsuario();
})

botonReserva.addEventListener('click', function(e) {
    e.preventDefault()

})

inputDocumento.addEventListener('keypress', function(e) {
    if (e.which === 13) {

    }
})

var self = this;

function registrarUsuario() {
    nombre = document.getElementById('nombreCom');
    direccion = document.getElementById('correo');
    usuario = document.getElementById('nombreUsuario');
    contrasena = document.getElementById('password');
    var usuarioRegistrado = {
        documento: inputDocumento.value,
        nombre: nombre.value,
        direccion: direccion.value,
        usuario: usuario.value,
        password: contrasena.value
    }
    if (localStorage.usuarios) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'))
    }

    usuarios.push(usuarios);
    localStorage.setItem('usuarios', JSON.stringify(usuarioRegistrado));

    formReserva.className = "reserva"
    formRegistro.className = "registro hide"

}

function completarDatos(){

}
/*
destino = document.getElementById('destino');
var reserva = {
  destino = destino.value
}*/