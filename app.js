"use strict"

var express = require("express");
var bodyParser = require("body-parser");

//la variable app es el objeto express
//Esto va a ser el motor de la aplicacion del backend
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*====================================
=            Cargar Rutas            =
====================================*/
var rutaUsuarios = require("./routes/usuarios.ruta.js");
var rutaAlumnos = require("./routes/alumnos.ruta.js");
var rutaDocentes = require("./routes/docentes.ruta.js");

/*=======================================================
=            Configuracion de cabeceras CORS            =
=======================================================*/
app.use((req, res, next)=>{
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
 res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
 res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
 next();

})



/*==================================
=            Rutas Base            =
==================================*/
app.use("/api", rutaUsuarios);
app.use("/api", rutaAlumnos);
app.use("/api", rutaDocentes);


//Exportamos el modulo app para otros modulos
module.exports = app;

