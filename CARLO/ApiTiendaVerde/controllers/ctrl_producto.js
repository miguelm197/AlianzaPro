var mongoose = require('mongoose');

var SCH_Producto = require('../models/mdl_producto').Producto;


//GET - Retorna todas los productos de la Base de Datos
exports.consultaProductos = function (req, res) {
    SCH_Producto.find(function (err, productos) {
        if (err) res.send(500, err.message);
        console.log('GET /productos');
        res.status(200).jsonp(productos);
    });
};

//GET - Retorna un producto por id
exports.consultaProductoPorId = function (req, res) {
    SCH_Producto.findById(req.params.id, function (err, producto) {
        if (err) res.send(500, err.message);
        console.log('GET /productos/' + req.params.id);
        res.status(200).jsonp(producto);
    });
};

//GET - Retorna un producto por nombre
exports.consultaProductoPorNombre = function (req, res) {
    SCH_Producto.find({ nombre: req.params.nombre }, function (err, productos) {
        if (err) res.send(500, err.message);
        console.log('GET /productosPorNombre/' + req.params.nombre);
        res.status(200).jsonp(productos);
    });
};

//GET - Retorna un producto por rango de precio
exports.consultaProductoPorRango = function (req, res) {
    var max = parseInt(req.query.max);
    var min = parseInt(req.query.min);
    var consulta = { $and: [{ precio: { $lte: max } }, { precio: { $gte: min } }] }

    SCH_Producto.find(consulta, function (err, productos) {
        if (err) res.send(500, err.message);
        console.log('GET /productosPorRango/' + min + "-" + max);
        res.status(200).jsonp(productos);
    }).sort({"precio":-1});
};

//POST - Agrega un nuevo producto a la Base de Datos
exports.agregarProducto = function (req, res) {
    var producto = new SCH_Producto({
        nombre: req.body.nombre,
        precio: req.body.precio,
        fechaCaducidad: req.body.fechaCaducidad,
        descripcion: req.body.descripcion
    });
    producto.save(function (err, casa) {
        if (err) return res.send(500, err.message);
        console.log('POST');
        console.log(req.body);

        res.status(200).jsonp(producto);
    });
}

//POST - Actualzar los productos a menos de una semana de caducar
exports.actualizarProductoPorCaducar = function (req, res) {
    var listaProductos = req.body.lista;

    console.log(listaProductos);

    for (let i = 0; i < listaProductos.length; i++) {
        const id = listaProductos[i];

        SCH_Producto.findById(id, function (err, producto) {
            if (err) res.send(500, err.message);

            var fechaCaducidad = producto.fechaCaducidad;
            var fechaCad = fechaCaducidad.getTime();

            var hoy = new Date();

            var tiempo = hoy.getTime();
            var milisegundos = parseInt(7 * 24 * 60 * 60 * 1000);
            var fechaSiete = hoy.setTime(tiempo + milisegundos);



            if (fechaSiete > fechaCad) {
                var prod = producto;
                SCH_Producto.findById(id, function (err, producto) {
                    producto.nombre = prod.nombre;
                    producto.precio = prod.precio / 2;
                    producto.fechaCaducidad = prod.fechaCaducidad;
                    producto.descripcion = prod.descripcion;

                    producto.save(function (err) {
                        if (err) return res.send(500, err.message);
                        console.log('PUT Se modificó un producto que se estaba por vencer');
                        console.log(req.body);
                        res.status(200).jsonp(producto);
                    });
                });
            } else {
                console.log(producto.nombre + " está en órden")
            }

            console.log('GET /productos/' + id);
            // res.status(200).jsonp(producto);
        });
    }
}

//PUT - Actualizar un producto por id en la Base de Datos
exports.actualizarProductoPorId = function (req, res) {
    SCH_Producto.findById(req.params.id, function (err, producto) {
        producto.nombre = req.body.nombre;
        producto.precio = req.body.precio;
        producto.fechaCaducidad = req.body.fechaCaducidad;
        producto.descripcion = req.body.descripcion;

        producto.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó un producto');
            console.log(req.body);
            res.status(200).jsonp(producto);
        });
    });
};

//DELETE - Eliminar un producto por id de la Base de Datos
exports.eliminarProductoPorId = function (req, res) {
    SCH_Producto.findById(req.params.id, function (err, producto) {
        producto.remove(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = { status: "Ok" }
            console.log('DELETE Se eliminó un producto');
            console.log(producto);
            res.status(200).jsonp(mensaje);
        })
    });
};

