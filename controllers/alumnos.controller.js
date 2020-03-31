"use strict"

function pruebaAlumnos(req, res){
	res.status(200).send({mensaje:"probando controlador Alumnos"})
}

var Alumnos = require("../models/alumnos.model.js");

var fs = require("fs");  // sirva para borrar un archivo de imagen cuando actualizamos un alumno
var path = require("path");

/*=======================================
=            Agregar Alumno             =
=======================================*/
function agregarAlumno(req, res){

	var alumno = new Alumnos();
	var parametros = req.body;

	alumno.noControl = parametros.noControl;
	alumno.nombres = parametros.nombres;
	alumno.apellidos = parametros.apellidos;
	alumno.grupo = parametros.grupo;
	alumno.especialidad = parametros.especialidad;
	alumno.foto = parametros.foto;

	if(req.files){
		var imagenRuta = req.files.foto.path;
		var imagenSplit = imagenRuta.split("/");

		alumno.foto = imagenSplit[2];

		if(alumno.nombres != null && alumno.apellidos != null){

			alumno.save((error, alumnoGuardado)=>{
				if(error){
					res.status(500).send({mensaje:"Error al guardar alumno"})
				}
				else{
					if(!alumnoGuardado){
						res.status(404).send({mensaje:"No se pudo guardar el alumno"})
					}
					else{
						res.status(200).send({alumnoGuardado})
					}
				}
			})
		}
	 }

}


function alumnos (req, res){
	Alumnos.find((error, alumnos)=>{
		if(error){
			res.status(500).send({mensaje:"Error en la peticion"})
		}
		else{
			res.status(200).send({alumnos})
		}
	}).sort("_id");
}

/*=======================================
=         Actualizar Alumno             =
=========================================*/
function actualizarAlumno(req, res){
	var alumno = Alumnos();
	var id = req.params.id;
	var parametros = req.body;

	alumno.noControl = parametros.noControl;
	alumno.nombres = parametros.nombres;
	alumno.apellidos = parametros.apellidos;
	alumno.grupo = parametros.grupo;
	alumno.especialidad = parametros.especialidad;
	alumno.foto = parametros.foto;

	var cambioFoto = false;


	if(parametros.actualizarImagen == '0') {
		alumno.foto = parametros.rutaFotoActual;
		cambioFoto = true;

	}
	else{
		if(req.files){
			var imagenRuta = req.files.foto.path;
			var imagenSplit = imagenRuta.split("/");

			alumno.foto = imagenSplit[2];

			var fotoAntigua = parametros.rutaFotoActual;
			var rutaFoto = "./archivos/alumnos/"+fotoAntigua;

			fs.unlinkSync(rutaFoto); // borramos la imagen que tenia anteriomente este alumno
		 }
		 cambioFoto = true;

	}

	if(cambioFoto){
		if(alumno.nombres != null && alumno.apellidos != null && alumno.noControl != null){

			var actualizar = {
				"nombres": alumno.nombres,
				"apellidos": alumno.apellidos,
				"foto": alumno.foto
				}

			Alumnos.findByIdAndUpdate(id, actualizar, (error, alumnoActualizado)=>{

				if (error){
					res.status(500).send({mensaje:"Error al actualizar alumno"})
				}
				else{
					if (!alumnoActualizado){
						res.status(404).send({mensaje:"No se pudo actualizar el alumno"})
					}
					else{
						res.status(200).send({alumnoActualizado})
					}
				}
			})
		}
	}
}//function

/*=======================================
=         Borrar Alumno                 =
=========================================*/
function borrarAlumno (req, res){

	var id = req.params.id;

	Alumnos.findOne({_id : id}, (error, capturarAlumno)=>{
		if (error){
			res.status(500).send({mensaje:"Error al capturar alumno"})
		}
		else{
			if (!capturarAlumno){
				res.status(404).send({mensaje:"No se pudo actualizar el alumno"})
			}
			else{
				var fotoAntigua =capturarAlumno.foto;
				var rutaFoto = "./archivos/alumnos/"+fotoAntigua;
				fs.unlinkSync(rutaFoto);

				//res.status(200).send({capturarAlumno})
			}
		}

	})

	setTimeout(function(){
		Alumnos.findByIdAndRemove(id , (error, borrarAlumno)=>{

			if (error){
				res.status(500).send({mensaje:"Error al borrar alumno"})
			}
			else{
				if (!borrarAlumno){
					res.status(404).send({mensaje:"No se pudo borrar el alumno"})
				}
				else{

					res.status(200).send({borrarAlumno})
				}
			}

		})
	}, 1000)

}

/*=======================================
=         Mostrar Foto de un Alumno     =
=========================================*/

function muestraFotoAlumno(req, res){
	var foto = req.params.foto;
	var rutaFoto = "./archivos/alumnos/"+foto;
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
	pruebaAlumnos,
	agregarAlumno,
	alumnos,
	actualizarAlumno,
	borrarAlumno,
	muestraFotoAlumno
}