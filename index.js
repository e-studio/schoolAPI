 "use strinct"

// /*=========================================================
// =            Libreria MongoDb            =
// Cargamos la libreria de mongoose para la conexion a la bd
// ===========================================================*/
 var mongoose = require ("mongoose");

 /*======================================
 =            Modulo Express            =
 ======================================*/
 const app = require("./app");
const port = process.env.PORT || 1234






/*========================================
=            Conexion a la BD            =
========================================*/

// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;
// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect("mongodb://localhost:27017/tigerApp", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
  })
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("Conectado!")
        app.listen(port, function(){
        	console.log("servidor corriendo en localhost:"+port);
        })

    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));