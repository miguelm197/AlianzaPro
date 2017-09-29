exports = module.exports = function (app, mongoose) {
    var esquemaMatricula = new mongoose.Schema({
        matricula: { type: String },
        cliente:{
            nombre: { type: String },
            apellido: { type: String },
            cedula: { type: String },
            tipoCliente: { type: String },
            razonSocial: { type: String },
            rut: { type: String }
        },
        tipoVehiculo: { type: String },
        comentario: { type: String },
        habilitado: { type: Boolean },
        pais: { type: String },
        ingresos:[
            {
                fechaEntrada: { type: Date},
                fechaSalida: { type: Date },
                lugar: { type: String },
                comentario: { type: String }
            }
        ]

    });

    mongoose.model("mdl_Matricula", esquemaMatricula, "matriculas");
}
