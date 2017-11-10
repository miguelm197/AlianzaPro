// module.exports = function (app, mongoose) {
    var mongoose = require('mongoose');
    
    var esquemaCasa = new mongoose.Schema({
        numero: { type: String },
        direccion: { type: String },
        precio: { type: Number },
    });

    // mongoose.model('mdl_casa', esquemaCasa, 'casas');
    module.exports.Casa = mongoose.model('mdl_casa', esquemaCasa, 'casas');
    //                 /              |            \
    //                /               |             \
    //      Nombre de referencia      |              |
    //                      esquema exportado        |
    //                                       documento de la bd
// };