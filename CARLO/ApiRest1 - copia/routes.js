module.export = function () {
    var SerieTV = require("./serietv");
    
    //GET
    findAllSeriesTV = function (req, res) {
        res.send("hola putsso");
        console.log("sape")
        // SerieTV.find(function (err, serietv) {
        //     if (!err) res.send(seriestv);
        //     else console.log("ERROR: " + err);
        // });
    };

    // //GET
    // finsByID = function (req, res) {
    //     SerieTV.findByID(req.param.id, function (err, serietv) {
    //         if (!err) res.send(serietv);
    //         else console.log("ERROR: " + err);
    //     });
    // };

    // //POST
    // addSerieTV = function (req, res) {
    //     console.log("POST");
    //     console.log(req.body);

    //     var serietv = new SerieTV({
    //         titulo: req.body.titulo,
    //         temporadas: req.body.temporadas,
    //         paos: req.body.pais,
    //         genero: req.body.genero
    //     });

    //     SerieTV.save(function (err) {
    //         if (!err) console.log("SerieTv Guardada");
    //         else console.log("ERROR: " + err);
    //     });

    //     res.send(serietv);
    // };




  
}