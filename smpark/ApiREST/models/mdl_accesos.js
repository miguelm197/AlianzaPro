exports = module.exports = function (app, mongoose) {
    var esquemaAcceso = new mongoose.Schema({
        matricula: { type: String },
        cliente: { type: String },
        entrada: { type: String },
        salida: { type: String },
        pais: { type: String },
        tipoVehiculo: { type: String },
        tipoCliente: { type: String },
        comentario: { type: String },
        park: { type: String },
        activo: { type: Boolean }
    });

    mongoose.model("mdl_Acceso", esquemaAcceso, "accesos");
}

// Carolina de informacion legislativa 2350
// Discusion 135375 2123/2017