"use strict"

var token = require("jwt-simple");
var momento = require("moment");
var claveSecreta = "clave-secreta";


/*===============================================
=            Metodo de Autenticacion            =
===============================================*/
// Middleware es la logica de intercambio de informacion entre aplicaciones

exports.autenticacion = function (req, res, next){

	//Passamos el token por una cabecera de autenticacion

	if(!req.headers.authorization){
		return res.status(403).send({mensaje: "La peticion no tiene cabecera de autenticacion"})
	}
	else{

		//quitamos las comillas simples y dobles al token
		var tokenEnviado = req.headers.authorization.replace(/['"]+/g,'');

		//Sentencia de manejo de excepciones
		try{

			var cargarToken = token.decode(tokenEnviado, claveSecreta);

			// comparar la fecha actual con la de expiracion del token
			if(cargarToken.exp <= momento().unix()){

				return  res.status(403).send({mensaje:"El token expiro"})

			}

		}
		catch(e){

			console.log(e);
			return res.status(403).send({mensaje:"El token no es valido"})

		}
		//asignamos el token a req para no necesitar decodificarlo cada rato
		req.usuarioToken = cargarToken;
		next();

	}
}
