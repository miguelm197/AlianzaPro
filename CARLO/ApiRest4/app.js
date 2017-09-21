var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/tareas', function (err, res) {
  if (err) throw err;
  console.log('Connected to Database');


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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(perimitirCrossDomain); 

// Import Models and controllers
var models = require('./models/tarea')(app, mongoose);
var TVShowCtrl = require('./controllers/tareas');

// Example Route
var router = express.Router();
router.get('/', function (req, res) {
  res.send("Hello Carlo!");

  next();
});




app.use(router);

// // API routes
var tvshows = express.Router();

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

app.use(tvshows);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

// app.use('/api', tvshows);

// Start server
app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});
