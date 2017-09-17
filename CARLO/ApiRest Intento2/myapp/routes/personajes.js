var Personaje;
exports.setModel = function(modelo){
    Personaje = modelo;
};
exports.index = function(req, res){
    console.log("Consultando...")
        Personaje.find({}, function(error, personajes){
           if(error){
              res.send('Ha surgido un error.');
           }else{
               console.log(personajes);
            
           }
        })
};
exports.create = function(req, res){
   //
};
exports.store = function(req, res){
   //
};
exports.show = function(req, res){
   //
};
exports.edit = function(req, res){
   //
};
exports.update = function(req, res){
   //
};
exports.destroy = function(req, res){
   //
};