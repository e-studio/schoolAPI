"use strict"

function pruebaUsuarios(req, res){
	res.status(200).send({mensaje:"probando controlador Usuarios"})
}

// Importamos el modelo de usuarios
var Usuarios = require("../models/usuarios.model.js");

//Importamos la dependencia para encriptar contraseñas
var bcrypt = require("bcrypt-nodejs");

// importamos el token de acceso
var token = require("../token/token.js");

//Metodo para crear usuario nuevo
function crearUsuario(req, res){
	var usuario = new Usuarios();
	var parametros = req.body;

	usuario.usuario = parametros.usuario;

	if(parametros.password){		//encriptamos el password para guardarlo en la BD
		bcrypt.hash(parametros.password, null, null, function(error, hash){
			usuario.password = hash;
			if(parametros.password != null){			//si el password no esta vacio
				usuario.save((error, usuarioGuardado)=>{
				if(error){
					res.status(500).send({mensaje:"Error al guardar usuario"})
				}
				else{
					res.status(200).send({usuarioGuardado})
				}
			});

			}
		})
	}

}

//Metodo para ingresar un usuario
function ingresoUsuario(req, res){

	var parametros = req.body;
	var usr = parametros.usuario;
	var pass = parametros.password;

	Usuarios.findOne({usuario:usr}, (error, seleccionUsuario)=>{

		if(error){
			res.status(500).send({mensaje:"Error al ingresar usuario"})
		}
		else{

			if(!usr){
				res.status(404).send({mensaje:"El usuario no Existe!"})
			}
			else{

				bcrypt.compare(pass, seleccionUsuario.password, function(error, ok){
					if(ok){
						//res.status(200).send({seleccionUsuario});
						//debemos enviar un parametro token en true
						if(parametros.token){

							//Devolvemos un token de jwt
							res.status(200).send({token: token.crearToken(seleccionUsuario)})

						}

					}
					else{
						res.status(404).send({mensaje:"Sin acceso!"})
					}
				})
			}
		}
	})
}


function actualizarUsuario(req, res){
	//capturamos el id de la ruta
	var id = req.params.id;
	//tomamos los datos del formulario
	var actualizar = req.body;

	if(id != req.usuarioToken.sub){   // si no es el mismo usuario del token y retorna
		return res.status(500).send({mensaje:"no tienes permisos para actualizar este usuario"})
	}

	//de lo contrario recorremos la base de datos
	Usuarios.findByIdAndUpdate(id, actualizar,(error, usuarioActualizado)=>{
		if (error){
			res.status(500).send({mensaje:"Error al actualizar el usuario"})
		}
		else{
			if(!usuarioActualizado){
				res.status(404).send({mensaje:"No se ha podido actualizar el usuario"})
			}
			else{
				res.status(200).send({usuarioActualizado})

			}
		}
	})

}


function borrarUsuario(req, res){

	var id = req.params.id;

	if(id != req.usuarioToken.sub){   // si no es el mismo usuario del token y retorna
		return res.status(500).send({mensaje:"No tienes permisos para borrar este usuario"})
	}

	//Buscamos en la BD para borrar el id
	Usuarios.findByIdAndRemove(id, (error, usuarioBorrado)=>{

		if (error){
			res.status(500).send({mensaje:"Error al borrar el usuario"})
		}
		else{
			if(!usuarioBorrado){
				res.status(404).send({mensaje:"No se ha podido borrar el usuario"})
			}
			else{
				res.status(200).send({usuarioBorrado})

			}

		}
	})



}


//Para exportar los metodos del modulo
module.exports = {
	pruebaUsuarios,
	crearUsuario,
	ingresoUsuario,
	actualizarUsuario,
	borrarUsuario
}


