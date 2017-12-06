var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// var User = mongoose.model('/models/mdl_usuario');
var SCH_Usuario = require('./models/mdl_usuario').Usuario;

var service = require('./service');


//POST - Agrega un usuario nuevo en la Base de Datos
exports.registroUsuario = function (req, res) {
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

            res.status(200).send({ token: service.createToken(usuario) });
        });
    })
};




exports.emailLogin = function (req, res) {
    SCH_Usuario.findOne({ correo: req.body.correo.toLowerCase() }, function (err, usuario) {
        if (err) return res.status(500).send("No existe el correo.");
        var bandera = false;
        var claveBd = usuario.clave;
        var claveUs = req.body.clave;

        bcrypt.hash(claveUs, 12).then(function (claveHasheada) {
            if (claveBd == claveHasheada) {
                return res
                    .status(200)
                    .send({ token: service.createToken(usuario) });
            } else {
                return res
                    .status(500)
                    .send("Contraseña incorrecta");
            }
        });
    });
};