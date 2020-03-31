"use strict"
//requerimos la dependencia jwt
var token = require("jwt-simple");

//Moment controla la fecha de creacion/expiracion de los tokens
var momento = require("moment");

//esta clave secreta es para decoficar el token
var claveSecreta = "clave-secreta";


/*====================================
=            Metodo Token            =
====================================*/

exports.crearToken = function(usuario){
	var cargarToken = {
		sub: usuario._id,
		nombre: usuario.usuario,
		now: momento().unix(),
		exp: momento().add(30,"days").unix()
	}
	return token.encode(cargarToken, claveSecreta)
}
