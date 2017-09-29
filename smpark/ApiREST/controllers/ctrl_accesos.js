var mongoose = require("mongoose");
require("../models/mdl_accesos.js");

var SCH_Acceso = mongoose.model("mdl_Acceso");
var SCH_Matricula = mongoose.model("mdl_Matricula");





//GET - Retorna todos los Accesos de la Base de Datos
exports.consultaAccesos = function (req, res) {
    SCH_Matricula.find({ "ingresos.fechaSalida": null }, function (err, accesos) {
        if (err) res.status(500).send(err.message);
        console.log('GET /accesos');
        res.status(200).jsonp(accesos);
    });
};


//GET - Retorna la información del acceso de una matrícula
exports.consultaIdAccesoPorMatricula = function (req, res) {
    SCH_Acceso.find({ matricula: req.params.matricula }, function (err, acceso) {
        if (err) return res.send(500, err.message);

        console.log('GET /accesos/' + req.params.matricula);
        res.status(200).jsonp(acceso[0]._id);
    });
};




//GET - Retorna si está dentro del parking
exports.estaDentroDelParking = function (req, res) {
    SCH_Acceso.find({ matricula: req.params.matricula }, function (err, acceso) {
        if (err) return res.send(500, err.message);

        console.log('GET /accesos/' + req.params.matricula);
        res.status(200).jsonp(acceso[0]._id);
    });
};



//POST - Agrega una nuevo acceso en la Base de Datos
exports.ingresoVehìculo = function (req, res) {

    var query = SCH_Matricula.findOne({ matricula: req.params.matricula });

    query.exec(function (err, acceso) {
        if (!err) {
            if (acceso != null) siExiste(acceso);
            else noExiste();
        }
    })


    function noExiste() {
        var matricula = new SCH_Matricula({

            matricula: req.params.matricula,
            cliente: {
                nombre: "--",
                apellido: "--",
                cedula: "--",
                tipoCliente: "PARTICULAR",
                razonSocial: "--",
                rut: "--"
            },
            tipoVehiculo: "SIN TIPO",
            comentario: "Sin comentario...",
            pais: "URUGUAY",
            ingresos: [{
                fechaEntrada: new Date(),
                fechaSalida: null,
                lugar: "P1 L32",
                comentario: "Sin comentario.."
            }]
        })

        matricula.save(function (err, matricula) {
            if (err) return res.status(500).send(err.message);
            console.log('POST | Se marcó entrada de la matrícula ' + matricula.matricula);

            res.status(200).jsonp(matricula);
        });
    }



    function siExiste(accesos) {
        var id = accesos.id;

        SCH_Matricula.findById(id, function (err, data) {
            var ultimoAcceso = data.ingresos[data.ingresos.length - 1];
            if (ultimoAcceso.fechaSalida != null) {

                var cant = data.ingresos.length - 1;
                var nuevoIngreso = {
                    fechaEntrada: new Date(),
                    fechaSalida: null,
                    lugar: "P1 L32",
                    comentario: "Sin comentario.."
                }

                data.ingresos.push(nuevoIngreso);

                data.save(function (err) {
                    if (err) return res.send(500, err.message);
                    console.log('POST | Se marcó nueva entrada de la matrícula ' + data.matricula);
                    res.status(200).jsonp(data);
                });
            } else {
                var mensaje = "La matrícula " + data.matricula + " ya se encuentra dentro del Parking"
                console.log(mensaje);
                res.status(500).jsonp(mensaje);
            }

        });

    }
}

//PUT - actualiza la salida del vehiculo
exports.salidaVehiculo = function (req, res) {

    SCH_Matricula.find({ matricula: req.params.matricula }, function (err, data) {
        var cant = data[0].ingresos.length - 1;
        var ultimoAcceso = data[0].ingresos[cant];

        if (ultimoAcceso.fechaSalida == null) {

            data[0].ingresos[cant].fechaSalida = new Date();

            data[0].save(function (err) {
                if (err) return res.send(500, err.message);
                console.log('PUT | Se marcó salida de la matrícula ' + req.params.matricula);

                res.status(200).jsonp(data);
            });
        } else {
            var mensaje = "La matrícula " + data[0].matricula + " no se encuentra dentro del Parking"
            console.log(mensaje);
            res.status(500).jsonp(mensaje);
        }


    });
}



//PUT - Actualizar un acceso en la Base de Datos
exports.actualizarAcceso = function (req, res) {
    SCH_Acceso.findById(req.params.id, function (err, acceso) {
        acceso.matricula = req.body.matricula;
        acceso.cliente = req.body.cliente;
        acceso.entrada = req.body.entrada;
        acceso.salida = req.body.salida;
        acceso.pais = req.body.pais;
        acceso.tipoVehiculo = req.body.tipoVehiculo;
        acceso.tipoCliente = req.body.tipoCliente;
        acceso.comentario = req.body.comentario;
        acceso.park = req.body.park;
        acceso.activo = req.body.activo;

        acceso.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó el acceso de ' + req.body.matricula);

            res.status(200).jsonp(acceso);
        });
    });
};

//DELETE - Eliminar un acceso de la Base de Datos
exports.eliminarAcceso = function (req, res) {
    console.log(req.params.matricula);
    SCH_Acceso.find({ matricula: req.params.matricula }, function (err, acceso) {
        if (!err) {
            SCH_Acceso.findById(acceso[0]._id, function (err, accesoV) {
                accesoV.remove(function (err) {
                    if (err) return res.send(500, err.message);

                    console.log('DELETE Se eliminó el acceso');

                    res.status(200);
                })
            });
        }
    });
};
