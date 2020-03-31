"use strict"

function pruebaDocentes(req, res){
	res.status(200).send({mensaje:"probando controlador Docentes"})
}

var Docentes = require("../models/docentes.model.js");

var fs = require("fs");
var path = require("path");

/*=======================================
=            Agregar Docente            =
=======================================*/
function agregarDocente(req, res){

	var docente = new Docentes();
	var parametros = req.body;

	docente.nombres = parametros.nombres;
	docente.apellidos = parametros.apellidos;

	if(req.files){
		var imagenRuta = req.files.foto.path;
		var imagenSplit = imagenRuta.split("/");

		docente.foto = imagenSplit[2];

		if(docente.nombres != null && docente.apellidos != null){

			docente.save((error, docenteGuardado)=>{
				if(error){
					res.status(500).send({mensaje:"Error al guardar docente"})
				}
				else{
					if(!docenteGuardado){
						res.status(400).send({mensaje:"No se pudo guardar el docente"})
					}
					else{
						res.status(200).send({docenteGuardado})
					}
				}
			})
		}
	 }

}

/*=======================================
=       Listar todos los Docentes       =
=========================================*/
function docentes (req, res){
	Docentes.find((error, docentes)=>{
		if(error){
			res.status(500).send({mensaje:"Error en la peticion"})
		}
		else{
			res.status(200).send({docentes})
		}
	}).sort("_id");
}

/*=======================================
=       Actualizar un Docente       =
=========================================*/
function actualizarDocente(req, res){
	var docente = Docentes();
	var id = req.params.id;
	var parametros = req.body;

	docente.nombres = parametros.nombres;
	docente.apellidos = parametros.apellidos;
	docente.foto = parametros.rutaFotoActual;

	var cambioFoto = false;


	if(parametros.actualizarImagen == '0') {
		docente.foto = parametros.rutaFotoActual;
		cambioFoto = true;

	}
	else{
		if(req.files){
			var imagenRuta = req.files.foto.path;
			var imagenSplit = imagenRuta.split("/");

			docente.foto = imagenSplit[2];

			var fotoAntigua = parametros.rutaFotoActual;
			var rutaFoto = "./archivos/docentes/"+fotoAntigua;

			fs.unlinkSync(rutaFoto); // borramos la imagen que tenia anteriomente este alumno
		 }
		 cambioFoto = true;

	}

	if(cambioFoto){
		if(docente.nombres != null && docente.apellidos != null){

			var actualizar = {
				"nombres": docente.nombres,
				"apellidos": docente.apellidos,
				"foto": docente.foto
				}

			Docentes.findByIdAndUpdate(id, actualizar, (error, docenteActualizado)=>{

				if (error){
					res.status(500).send({mensaje:"Error al actualizar docente"})
				}
				else{
					if (!docenteActualizado){
						res.status(404).send({mensaje:"No se pudo actualizar el docente"})
					}
					else{
						res.status(200).send({docenteActualizado})
					}
				}
			})
		}
	}
}//function


/*=======================================
=         Borrar Docente                =
=========================================*/
function borrarDocente (req, res){

	var id = req.params.id;

	Docentes.findOne({_id : id}, (error, capturarDocente)=>{
		if (error){
			res.status(500).send({mensaje:"Error al capturar docente"})
		}
		else{
			if (!capturarDocente){
				res.status(404).send({mensaje:"No se pudo actualizar el docente"})
			}
			else{
				var fotoAntigua =capturarDocente.foto;
				var rutaFoto = "./archivos/docentes/"+fotoAntigua;
				fs.unlinkSync(rutaFoto);
			}
		}

	})

	setTimeout(function(){
		Docentes.findByIdAndRemove(id , (error, borrarDocente)=>{

			if (error){
				res.status(500).send({mensaje:"Error al borrar docente"})
			}
			else{
				if (!borrarDocente){
					res.status(404).send({mensaje:"No se pudo borrar el docente"})
				}
				else{

					res.status(200).send({borrarDocente})
				}
			}

		})
	}, 1000)

}

/*=======================================
=         Mostrar Foto de un docente     =
=========================================*/

function muestraFotoDocente(req, res){
	var foto = req.params.foto;
	var rutaFoto = "./archivos/docentes/"+foto;
	fs.exists(rutaFoto, function(exists){
		if (exists){
			res.sendFile(path.resolve(rutaFoto))
			console.log("Si esta");
		}
		else{
			res.status(404).send({mensaje:"La imagen no existe"})
		}
	})



}





//Para exportar los metodos del modulo
module.exports = {
	pruebaDocentes,
	agregarDocente,
	docentes,
	actualizarDocente,
	borrarDocente,
	muestraFotoDocente
}