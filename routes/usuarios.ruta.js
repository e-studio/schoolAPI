"use strict"

var express = require("express");

//cargamos el modulo del controlador
var controladorUsuarios = require("../controllers/usuarios.controller.js");

//Cargamos el router de express js
var api = express.Router();

var md_aut = require("../token/autentica.js");

//Creamos la ruta del metodo GET, y pasamos el metodo que carga la pagina cuando se haga la peticion de esa ruta
api.get("/prbandoControladorUsuarios", md_aut.autenticacion, controladorUsuarios.pruebaUsuarios);

//Metodo Post Para guardar nuevos usuarios
api.post("/crearUsuario", controladorUsuarios.crearUsuario);

//Metodo Post para ingresar un usuarios
api.post("/login", controladorUsuarios.ingresoUsuario);

//creamos la ruta para la actualizacion del usuario
api.put('/actualizarUsuario/:id', md_aut.autenticacion, controladorUsuarios.actualizarUsuario);

//creamos la ruta para borrar un usuario
api.delete('/borrarUsuario/:id', md_aut.autenticacion, controladorUsuarios.borrarUsuario);

module.exports = api;

