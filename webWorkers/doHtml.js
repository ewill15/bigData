selft.addEventListener("message",function(e){

var usuario = {
    numeroDoc: document.getElementById('numDoc').value,
    nombreCompleto: document.getElementById('nombreCom').value,
    correo: document.getElementById('correo').value,
    nombreUsuario: document.getElementById('nombreUsuario').value,
    password: document.getElementById('password').value
  }
  localStorage.setItem('usuario', JSON.stringify(usuario))
  formReserva.className = "reserva"
  formRegistro.className = "registro hide"


  var usuario = JSON.parse(localStorage.getItem('usuario'))
  if (usuario.numeroDoc === documento) {
    document.getElementById('nombreUsuarioRes').value = usuario.nombreUsuario
    document.getElementById('nombreComRes').value = usuario.nombreCompleto
    document.getElementById('correoRes').value = usuario.correo
  } else {
    alert('El numero de documento ingresado no corresponde con el usuario almacenado')
  }
  var site = usuario;
});

