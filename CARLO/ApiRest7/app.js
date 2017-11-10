var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');

var connectionString = "mongodb://root:toor@ds143245.mlab.com:43245/casasbd";

mongoose.connect(connectionString, function (err, res) {
    if (err) throw err;
    console.log('Conectado a la Base de Datos');
});


//ESTO PERMITE RECIBIR PETICIONES FUERA DE ESTE DOMINIO
function perimitirCrossDomain(req, res, next) {
    //en vez de * se puede definir SÓLO los orígenes que permitimos
    res.header('Access-Control-Allow-Origin', '*');
    //metodos http permitidos para CORS
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// Middlewares
app.use(perimitirCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


// Imports de Modelo y Controlador

// casas
require('./models/mdl_casa');
var CtrlCasas = require('./controllers/ctrl_casas');

// rangos
require('./models/mdl_rango');
var CtrlRangos = require('./controllers/ctrl_rango');


// Ruteo
var router = express.Router();


router.get('/', function (req, res) {
    res.send("Que tal sabandijas!");
    // next();
});

router.route('/casas')
    .get(CtrlCasas.consultaCasas)
    .post(CtrlCasas.agregarCasa)


router.route('/casas/:id')
    .get(CtrlCasas.consultaCasaPorId)
    .put(CtrlCasas.actualizarCasa)
    .delete(CtrlCasas.eliminarCasa)

router.route('/rangos')
    .get(CtrlRangos.consultaRangos)
    .post(CtrlRangos.agregarRango)


router.route('/rangos/:id')
    .get(CtrlRangos.consultaRangoPorId)
    .put(CtrlRangos.actualizarRango)
    .delete(CtrlRangos.eliminarRango)


router.route('/casasCategory/')
    .get(CtrlCasas.consultaRangos)

app.use(router);

// Start server
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});
