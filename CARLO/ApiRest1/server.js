// importar
var express = require('express');
var mongoose = require("mongoose");

// instanciar
var app = express();


mongoose.connect("mongodb://localhost/seriestv", { useMongoClient: true }, function (err, res) {
    if (err) console.log("ERROR: " + err);
    else console.log("Exitos");
}
);


// ruteo
app.get('/', function (req, res) {
    res.send("hola puto")
});


// escuchar
app.listen(5000);

console.log("corriendo")