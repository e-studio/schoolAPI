"use strict"

var express = require("express");

//cargamos el modulo del controlador
var controladorAlumnos = require("../controllers/alumnos.controller.js");

//Cargamos el router de express js
var api = express.Router();

//Cargamos la dependencia para subir archivos
var multipart = require("connect-multiparty");

var archivo = multipart ({
	uploadDir: "./archivos/alumnos"
})

var md_aut = require("../token/autentica.js");

//Creamos la ruta del metodo GET, y pasamos el metodo que carga la pagina cuando se haga la peticion de esa ruta
api.get("/pruebaAlumnos", controladorAlumnos.pruebaAlumnos);

api.post("/agregarAlumno", [md_aut.autenticacion, archivo], controladorAlumnos.agregarAlumno);

api.get("/alumnos", controladorAlumnos.alumnos);

api.put("/actualizarAlumno/:id", [md_aut.autenticacion, archivo], controladorAlumnos.actualizarAlumno);

api.delete("/borrarAlumno/:id", md_aut.autenticacion, controladorAlumnos.borrarAlumno);

api.get("/fotoAlumno/:foto", controladorAlumnos.muestraFotoAlumno);

module.exports = api;

