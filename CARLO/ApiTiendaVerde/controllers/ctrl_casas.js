var mongoose = require('mongoose');

var SCH_Rangos = require('../models/mdl_rango').Rango;
var SCH_Casas = require('../models/mdl_casa').Casa;


//GET - Retorna todas las Casas de la Base de Datos
exports.consultaCasas = function (req, res) {
    SCH_Casas.find(function (err, casas) {
        if (err) res.send(500, err.message);
        console.log('GET /casas');
        res.status(200).jsonp(casas);
    });
};

//GET - Retorna una casa con id
exports.consultaCasaPorId = function (req, res) {
    SCH_Casas.findById(req.params.id, function (err, casa) {
        if (err) res.send(500, err.message);
        console.log('GET /casas/' + req.params.id);
        res.status(200).jsonp(casa);
    });
};

//POST - Agrega una nueva casa en la Base de Datos
exports.agregarCasa = function (req, res) {

    var casa = new SCH_Casas({
        numero: req.body.numero,
        direccion: req.body.direccion,
        precio: req.body.precio
    });

    casa.save(function (err, casa) {
        if (err) return res.send(500, err.message);
        console.log('POST');
        console.log(req.body);

        res.status(200).jsonp(casa);
    });
};

//PUT - Actualizar una casa en la Base de Datos
exports.actualizarCasa = function (req, res) {
    SCH_Casas.findById(req.params.id, function (err, casa) {
        casa.numero = req.body.numero;
        casa.direccion = req.body.direccion;
        casa.precio = req.body.precio;

        casa.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó una casa');
            console.log(req.body);
            res.status(200).jsonp(casa);
        });
    });
};

//DELETE - Eliminar una casa de la Base de Datos
exports.eliminarCasa = function (req, res) {
    SCH_Casas.findById(req.params.id, function (err, casa) {
        casa.remove(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó una casa');
            console.log(casa);
            res.status(200).jsonp(mensaje);
        })
    });
};





//GET - Retorna todas las Rangos de la Base de Datos
exports.consultaRangos = function (req, res) {

    SCH_Casas.findById(req.params.id, function (err, casa) {
        if (err) res.send(500, err.message);
        var precio = casa.precio;



        //GET - Retorna el rango que pertenezca a un precio 
        SCH_Rangos.find({ $and: [{ min: { $lte: precio } }, { max: { $gte: precio } }] }, function (err, rangos) {
            if (err) res.send(500, err.message);


            console.log('GET /cotegoria/' + req.params.id);
            var categoria = rangos[0].categoria;
            res.status(200).jsonp(categoria);

        });

    });
};




exports.a = function (req, res) {
    console.log(req.params)
};

//GET - Retorna la categoria de una casa por ID

