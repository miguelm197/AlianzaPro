var mongoose = require('mongoose');
require('../models/mdl_rango.js');

var SCH_rangos = mongoose.model('mdl_rango');


//GET - Retorna todas las Rangos de la Base de Datos
exports.consultaRangos = function (req, res) {
    SCH_rangos.find(function (err, rangos) {
        if (err) res.send(500, err.message);
        console.log('GET /rangos');
        res.status(200).jsonp(rangos);
    });
};

//GET - Retorna un rango con id
exports.consultaRangoPorId = function (req, res) {
    SCH_rangos.findById(req.params.id, function (err, rango) {
        if (err) res.send(500, err.message);
        console.log('GET /rangos/' + req.params.id);
        res.status(200).jsonp(rango);
    });
};

//POST - Agrega un rengo nuevo en la Base de Datos
exports.agregarRango = function (req, res) {

    var rango = new SCH_rangos({
        min: req.body.min,
        max: req.body.max,
        categoria: req.body.categoria
    });

    rango.save(function (err, rango) {
        if (err) return res.send(500, err.message);
        console.log('POST');
        console.log(rango);

        res.status(200).jsonp(rango);
    });
};

//PUT - Actualizar un rango en la Base de Datos
exports.actualizarRango = function (req, res) {
    SCH_rangos.findById(req.params.id, function (err, rango) {
        rango.min = req.body.min;
        rango.max = req.body.max;
        rango.categoria = req.body.categoria;

        rango.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó un rango');
            console.log(req.body);
            res.status(200).jsonp(rango);
        });
    });
};

//DELETE - Eliminar un rango de la Base de Datos
exports.eliminarRango = function (req, res) {
    SCH_rangos.findById(req.params.id, function (err, rango) {
        rango.remove(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó un rango');
            console.log(rango);
            res.status(200).jsonp(mensaje);
        })
    });
};

