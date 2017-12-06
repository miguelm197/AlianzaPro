var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var authCtrl = require('./auth');
var middleware = require('./middleware');

var connectionString = "mongodb://root:toor@ds117336.mlab.com:17336/tiendaverde";
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
require('./models/mdl_producto');
var CtrlProducto = require('./controllers/ctrl_producto');

// rangos
require('./models/mdl_usuario');
var CtrlUsuario = require('./controllers/ctrl_usuario');


// Ruteo
var router = express.Router();


router.get('/', function (req, res) {
    res.send("Que tal sabandijas!");
    // next();
});

router.route('/productos')
    .get(CtrlProducto.consultaProductos)
    .post(CtrlProducto.agregarProducto)


router.route('/productos/:id')
    .get(CtrlProducto.consultaProductoPorId)
    .put(CtrlProducto.actualizarProductoPorId)
    .delete(CtrlProducto.eliminarProductoPorId)

router.route('/usuarios')
    .get(middleware.ensureAuthenticated, CtrlUsuario.consultaUsuarios)
    .post(middleware.ensureAuthenticated, CtrlUsuario.agregarUsuario)


router.route('/usuarios/:id')
    .get(middleware.ensureAuthenticated, CtrlUsuario.consultaUsuarioPorId)
    .put(middleware.ensureAuthenticated, CtrlUsuario.actualizarUsuarioPorId)
    .delete(middleware.ensureAuthenticated, CtrlUsuario.eliminarUsuarioPorId)


router.route('/productosPorNombre/:nombre')
    .get(CtrlProducto.consultaProductoPorNombre)

router.route('/productosPorRango')
    .get(CtrlProducto.consultaProductoPorRango)

router.route('/productosPorCaducar')
    .post(CtrlProducto.actualizarProductoPorCaducar)


// Rutas de autenticación y login
router.post('/signup', authCtrl.registroUsuario);
router.post('/login', authCtrl.emailLogin);

// Ruta solo accesible si estás autenticado
router.get('/private', middleware.ensureAuthenticated, function (req, res) {
    res.send("Tenes permisos!");
});



app.use(router);

// Start server
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});
