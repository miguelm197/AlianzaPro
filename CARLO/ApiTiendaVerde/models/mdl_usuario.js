var mongoose = require('mongoose');

var esquemaUsuario = new mongoose.Schema({
    usuario: { type: String },
    clave: { type: String },
    correo: { type: String },
    rol: { type: String }
});

module.exports.Usuario = mongoose.model('mdl_usuario', esquemaUsuario, 'usuarios');