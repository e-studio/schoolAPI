"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creamos el esquema con los atributos
var docentesSchema = Schema({
	nombres: String,
	apellidos: String,
	grupo: String,
	especialidad: String,
	foto: String
})

module.exports = mongoose.model("Docentes", docentesSchema);
