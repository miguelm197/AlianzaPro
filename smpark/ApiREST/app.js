var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

// Conexión a la Base de Datos
mongoose.connect("mongodb://localhost/smpark", function (err, res) {
    if (err) throw err;
    console.log("Conectado a la Base de Datos");
})

//Permisos fuera del dominio
function crossDomain(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(crossDomain);


//Imports de Modelo y Controlador
var modeloAcceso = require("./models/mdl_accesos")(app, mongoose);
var modeloMatricula = require("./models/mdl_matricula")(app, mongoose);

var controladorAcceso = require("./controllers/ctrl_accesos.js");

//Ruteo
var router = express.Router();


router.get("/", function (req, res) {
    res.send("Que tal sabandijas!");
})

router.route("/accesos")
     .get(controladorAcceso.consultaAccesos)
    // .post(controladorAcceso.agregarAcceso);


router.route('/accesos/:id')
    // .get(CtrlTarea.findById)
    // .put(controladorAcceso.actualizarAcceso)

router.route('/accesos/:matricula')
    .post(controladorAcceso.ingresoVehìculo)
    .put(controladorAcceso.salidaVehiculo)
    // .get(controladorAcceso.consultaIdAccesoPorMatricula)
    // .delete(controladorAcceso.eliminarAcceso)


router.route('/accesos/dentro/:matricula')
    // .get(controladorAcceso.estaDentroDelParking)
    // .post(controladorAcceso.agregarAcceso)

app.use(router);



// Iniciar servidor NODE js
app.listen(3000, function () {
    console.log("Node escuchando en http://localhost:3000");
});