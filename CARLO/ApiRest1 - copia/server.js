// importar
var express = require('express');
var mongoose = require("mongoose");

// instanciar
var app = express();


// escuchar
app.listen(5000);


mongoose.connect("mongodb://localhost/seriestv", { useMongoClient: true },
    function (err, res) {
        if (err) console.log("ERROR: " + err);
        else console.log("BD Exitos");
    }
);



// ruteo
app.get('/', function (req, res) {
    res.send("index");
});

//GET
app.get('/series', function (req, res) {
    res.send("Series");
});


//POST
app.get('/nueva', function (req, res) {
    res.send("Nueva");

    console.log("POST");
    console.log(req.body);

    var serietv = new Object({
        titulo: "The Walking Dead",
        temporadas: "6",
        pais: "EEUU",
        genero: ["Terror", "Drama"]
    });

    serietv.save(function (err) {
        if (!err) console.log("SerieTv Guardada");
        else console.log("ERROR: " + err);
    });

    res.send(serietv);
});




console.log("corriendo")