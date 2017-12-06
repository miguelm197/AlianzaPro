var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

require('../models/mdl_usuario');

var SCH_Usuario = require('../models/mdl_usuario').Usuario;



//GET - Retorna todas los usuarios de la Base de Datos
exports.consultaUsuarios = function (req, res) {
    SCH_Usuario.find(function (err, usuarios) {
        if (err) res.send(500, err.message);
        console.log('GET /usuarios');
        res.status(200).jsonp(usuarios);
    });
};

//GET - Retorna un usuario con id
exports.consultaUsuarioPorId = function (req, res) {
    SCH_Usuario.findById(req.params.id, function (err, usuario) {
        if (err) res.send(500, err.message);
        console.log('GET /usuarios/' + req.params.id);
        res.status(200).jsonp(usuario);
    });
};

//POST - Agrega un usuario nuevo en la Base de Datos
exports.agregarUsuario = function (req, res) {
    var password = req.body.clave;
    bcrypt.hash(password, 12).then(function (claveHasheada) {

        var usuario = new SCH_Usuario({
            usuario: req.body.usuario,
            clave: claveHasheada,
            correo: req.body.correo,
            rol: req.body.rol
        });

        usuario.save(function (err, usuario) {
            if (err) return res.send(500, err.message);
            console.log('POST');
            console.log(usuario);

            res.status(200).jsonp(usuario);
        });
    })
};

//PUT - Actualizar un usuario por id en la Base de Datos
exports.actualizarUsuarioPorId = function (req, res) {

    var password = req.body.clave;
    bcrypt.hash(password, 12).then(function (claveHasheada) {

        SCH_Usuario.findById(req.params.id, function (err, usuario) {
            usuario.usuario = req.body.usuario;
            usuario.clave = claveHasheada;
            usuario.correo = req.body.correo;
            usuario.rol = req.body.rol;

            usuario.save(function (err) {
                if (err) return res.send(500, err.message);
                console.log('PUT Se modificó un usuario');
                console.log(req.body);
                res.status(200).jsonp(usuario);
            });
        });
    });
};

//DELETE - Eliminar un usuario por id de la Base de Datos
exports.eliminarUsuarioPorId = function (req, res) {
    SCH_Usuario.findById(req.params.id, function (err, usuario) {
        usuario.remove(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó un usuario');
            console.log(usuario);
            res.status(200).jsonp(mensaje);
        })
    });
};

