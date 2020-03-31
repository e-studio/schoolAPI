var app = require('./app');  //this is your express app
var http = require("http");// 3. HTTP server


// Get port from environment and store in Express
var port = process.env.PORT;
app.set('port', port);

// Create HTTP server
var server = http.createServer(app);


 var mongoose = require ("mongoose");
/*========================================
=            Conexion a la BD            =
========================================*/

// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;
// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect('mongodb+srv://cmstudio-0lz0x.mongodb.net/tigerApp  --username ruebina --password .Melania972', {
//mongoose.connect("mongodb://localhost:27017/tigerApp", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
  })
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("Conectado!")
        server.listen(port, function(){
        	console.log("servidor ApiREST funcionando");
        })

    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));




//Listen on provided port, on all network interfaces
// server.listen(port);


