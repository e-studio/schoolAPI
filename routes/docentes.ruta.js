"use strict"

var express = require("express");

//cargamos el modulo del controlador
var controladorDocentes = require("../controllers/docentes.controller.js");

//Cargamos el router de express js
var api = express.Router();

//Cargamos la dependencia para subir archivos
var multipart = require("connect-multiparty");

var archivo = multipart ({
	uploadDir: "./archivos/docentes"
})

var md_aut = require("../token/autentica.js");

//Creamos la ruta del metodo GET, y pasamos el metodo que carga la pagina cuando se haga la peticion de esa ruta
api.get("/prbandoControladorDocentes", controladorDocentes.pruebaDocentes);

api.post("/agregarDocente", [md_aut.autenticacion, archivo], controladorDocentes.agregarDocente);

api.get("/docentes", controladorDocentes.docentes);

api.put("/actualizarDocente/:id", [md_aut.autenticacion, archivo], controladorDocentes.actualizarDocente);

api.delete("/borrarDocente/:id", md_aut.autenticacion, controladorDocentes.borrarDocente);

api.get("/fotoDocente/:foto", controladorDocentes.muestraFotoDocente);

module.exports = api;

