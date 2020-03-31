"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creamos el esquema con los atributos
var usuariosSchema = Schema({
	usuario: String,
	password: String
})

module.exports = mongoose.model("Usuarios", usuariosSchema);
