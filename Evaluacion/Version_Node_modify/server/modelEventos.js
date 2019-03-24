let mongoose = require('mongoose'), 
    Schema = mongoose.Schema, //Definir la variable Schema
    autoIncrement = require('mongoose-auto-increment'), 

    EventSchema = new Schema({ 
      title:{ type: String, required: true }, //Obligatorio
      start: { type: String, required: true }, //Obligatorio
      end: { type: String, required: false }, //No obligatorio
      user: { type: Schema.ObjectId, ref: "Usuario" }
    });
//Inicializar el módulo de autoincrementar en la variable conexión
autoIncrement.initialize(connection) 
 //Asignar el plugin de autoincrementar al esquema Evento
EventSchema.plugin(autoIncrement.plugin, {model: 'Evento', startAt: 1} );

let EventoModel = mongoose.model('Evento', EventSchema) //Definir el modelo de los eventos

module.exports = EventoModel //Exportar el modelo evento
