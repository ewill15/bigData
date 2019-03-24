
const http = require('http'); 
      path = require('path'), 
      express = require('express'), 
      session = require('express-session'), 
      bodyParser = require('body-parser'); //permite al servidor interpretar datos en formato JSON.
      MongoClient = require('mongodb').MongoClient, 
      mongoose = require('mongoose'), //Para crear esquemas y modelos de base de datos.
      //Definir la ruta y nombre de la base de datos utilizando mongodb.
	     connection = mongoose.connect('mongodb://localhost/agenda_db', {useMongoClient: true}, function(error){//definir y establecer la base de datos a utilizar
           if(error){ //Verificar si existe error al conectarse a mongodb
           	 console.log(error.name +" "+ error.message); //Mostrar mensaje de eror
           }else{
              console.log('Conectado a MongoDB'); //Mostrar mensaje exitoso
           }
        });

//Incluir el archivo de rutas de interacción de usuarios y eventos
const RoutingUsers = require('./rutasUsuarios.js'), 
      RoutingEvents = require('./rutasEventos.js') 

const PORT = 3000 //Puerto de conexión
const app = express()

const Server = http.createServer(app) 

app.use(express.static('../client')) //Definir el directorio raiz
app.use(bodyParser.json()) //Iniciar el módulo body-parser.
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({ //Iniciar modulo de manejo de sesiones
    secret: 'secret-word', //Cadena de caracteres secreta para el Identificador de la sesión cookie
    cookie: { maxAge: 3600000 }, //Mantener las cookies de la sesión iniciada por una hora
    resave: false,
    saveUninitialized: true,
  }));
  //Incluir el módulos usuarios,eventos y definir su directorio raíz
app.use('/usuarios', RoutingUsers) 
app.use('/events', RoutingEvents) 
//Iniciar el servidor
Server.listen(PORT, function() { 
  //Mostrar mensaje de inicialización del servidor en la cónsola.
  console.log('Server is listening on port: ' + PORT) 
})
