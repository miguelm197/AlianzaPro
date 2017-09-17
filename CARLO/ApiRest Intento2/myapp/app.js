var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');



var mongoose = require("mongoose");
var personajes = require('./routes/personajes');

mongoose.connect("mongodb://localhost/personajes",
function (err, res) {
    if (err) console.log("ERROR: " + err);
    else console.log("BD Exitos");
}
);







var app = express();

app.get('/personajes', personajes.index);
app.get('/personajes/create', personajes.create);
app.post('/personajes', personajes.store);
app.get('/personajes/:id', personajes.show);
app.get('/personajes/:id/edit', personajes.edit);
app.put('/personajes/:id', personajes.update);
app.delete('/personajes/:id', personajes.destroy);



var PersonajeSchema = mongoose.Schema({
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  biografia: {type: String, required: true}
});
var PersonajeModel = mongoose.model('Personaje', PersonajeSchema);
personajes.setModel(PersonajeModel);


















// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
