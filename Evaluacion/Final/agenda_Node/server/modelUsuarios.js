let mongoose = require('mongoose'), 
    Schema = mongoose.Schema //Definir la variable Schema

let UserSchema = new Schema({ 
  user: { type: String, required: true, unique: true}, //Obligatoria
  email: { type: String, required: true }, //Obligatoria
  password: { type: String, required: true}, //Obligatoria
  })

let UsuarioModel = mongoose.model('Usuario', UserSchema) //Definir el modelo del usuario

module.exports = UsuarioModel //Exportar el modelo del usuario
