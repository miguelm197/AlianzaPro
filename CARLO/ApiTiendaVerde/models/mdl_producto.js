var mongoose = require('mongoose');

var esquemaProducto = new mongoose.Schema({
    nombre: { type: String },
    precio: { type: Number },
    fechaCaducidad: { type: Date },
    descripcion: { type: String }
});

module.exports.Producto = mongoose.model('mdl_producto', esquemaProducto, 'productos');