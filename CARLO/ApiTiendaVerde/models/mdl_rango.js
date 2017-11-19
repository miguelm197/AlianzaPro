// module.exports = function (app, mongoose) {
    var mongoose = require('mongoose');
    
var esquemaRango = new mongoose.Schema({
    min: { type: Number },
    max: { type: Number },
    categoria: { type: String }
});

// module.exports.mongoose.model('mdl_rango', esquemaRango, 'rango');

module.exports.Rango = mongoose.model('mdl_rango', esquemaRango, 'rango');

    //                 /              |            \
    //                /               |             \
    //      Nombre de referencia      |              |
    //                      esquema exportado        |
    //                                       documento de la bd
// };