var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get("/", function (req, res) {
    res.send("Que tal SABANDIJAS!");
})

app.use(router);

app.listen(3001, function () {
    console.log("Node escuchando en http://localhost:3001");
});