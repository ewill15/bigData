var Usuario = require('./modelUsuarios.js') 

module.exports.crearUsuarioDemo = function(callback){ //Función para crear usuarios
  var arr = [{ email: 'demo@mail.com', user: "demo", password: "123456"}, { email: 'juan@mail.com', user: "juan", password: "123456"}]; //array con la información de los usuarios a insertar
  Usuario.insertMany(arr, function(error, docs) { //Utilizar la función insertMany para insertar varios registros en una sola consulta
    if (error){ //si existe un error
      if (error.code == 11000){ 
        callback("Utilice usuario: demo | password:123456 </br>usuario: juan | password:123456") 
      }else{
        callback(error.message) 
      }
    }else{
      callback(null, "Los usuarios 'demo' y 'juan' se registraron exitosamente") //Mostrar mensaje del usuario guardado con exito
    }
  });
}
