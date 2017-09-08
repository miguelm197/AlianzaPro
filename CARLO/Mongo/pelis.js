db.movie.insert([
    {
        titulo: "FileClub",
        escritor: "Chuck",
        año: "1999",
        actores: ["Brad Pitt", "Carlo Carlo"],
        sinopsis: "",
        franquicia: ""
    },
    {
        titulo: "PulpFiction",
        escritor: "Quentin Tarantino",
        año: "1994",
        actores: ["Samuel L. Jackson", "Jhon Travolta"],
        sinopsis: "",
        franquicia: ""
    }, {
        titulo: "Inglourious Basterds",
        escritor: "Quentin Tarantino",
        año: "2009",
        actores: ["Brad Pitt", "Christoph Waltz"],
        sinopsis: "",
        franquicia: ""
    }, {
        titulo: "El hobbit:  Un viaje inesperado",
        escritor: "Peter Jackson",
        año: "2012",
        actores: ["Martin Freeman", "Richard Armitage"],
        sinopsis: "",
        franquicia: "Hobbit"
    }, {
        titulo: "El hobbit: la batalla de los Cinco Ejércitos",
        escritor: "Peter Jackson",
        año: "2014",
        actores: ["Martin Freeman", "Richard Armitage"],
        sinopsis: " El Hobbit: La batalla de los cinco ejércitos...",
        franquicia: "Hobbit"
    }
]);







db.movie.find(
    { $and: 
      [ 
        {titulo:"FileClub"},
        {año:{$lte:"1999"}}
      ] 
    } )
 
 db.movie.find(
    { $or: 
      [ 
        {titulo:"FileClub"},
        {titulo:"PulpFiction"}
      ] 
    })
 
 
 
 db.movie.find(
    { $or: 
      [ 
        {titulo:"FileClub"},
        {titulo:"PulpFiction"}
      ] 
    },
    {titulo:1, _id:0}
    )
    
 db.movie.find();
 
 db.movie.update({titulo:"asd"},{titulo:"FileClub",año:1999})
 
 
 db.movie.update({titulo:"FileClub"},{$set:{titulo:"asd"}})
 
 db.movie.update({titulo:"asd"},{$inc:{año:+2}})
 db.movie.find({titulo:"asd"})
 
 
 db.movie.find({titulo:{$regex:"P$"}},{_id:0})
 
 db.movie.remove({titulo:"asd"})
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 










