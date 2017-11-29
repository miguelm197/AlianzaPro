app.directive('desplegable', ["FacProductos", function (FacProductos) {
    return {
        templateUrl: './src/directivas/desplegable/desplegable.html',
        restrict: 'E',
        scope: {
            tipo: "@",
            categoria: "="
        },
        link: function (scope, element) {
            scope.local = false;
            scope.url = false;

            scope.ejemplos = [
                {
                    "titulo": "Verde",
                    "colapse": {
                        "clCerrado": true,
                        "clAbierto": false
                    },
                    "menu": [
                        "Categoría verde",
                        "Lechuga",
                        "Brocoli",
                        "Puerro",
                        "Perejil",
                        "Espinaca",
                        "Apio",
                        "chaucha",
                        "Arbeja"
                    ]
                },
                {
                    "titulo": "Naranja",
                    "colapse": {
                        "clCerrado": true,
                        "clAbierto": false
                    },
                    "menu": [
                        "Categoría naranja",
                        "Naranja",
                        "Melón",
                        "Mango",
                        "Papaya",
                        "Zapallo",
                        "Mandarina",
                        "Boñato",
                        "Calabaza"
                    ]
                },
                {
                    "titulo": "Rojo",
                    "colapse": {
                        "clCerrado": true,
                        "clAbierto": false
                    },
                    "menu": [
                        "Categoría roja",
                        "Tomate",
                        "Morrón",
                        "Picle",
                        "Chile",
                        "Manzana",
                        "Sandóa",
                        "Frutilla"
                    ]
                },
                {
                    "titulo": "Violeta",
                    "colapse": {
                        "clCerrado": true,
                        "clAbierto": false
                    },
                    "menu": [
                        "Berenjena",
                        "Uva",
                        "Cebolla morada",
                        "Col morada",
                        "Paas moradas",
                        "Remolacha"
                    ]
                },
                {
                    "titulo": "Blanco",
                    "colapse": {
                        "clCerrado": true,
                        "clAbierto": false
                    },
                    "menu": [
                        "Ajo",
                        "Cebolla",
                        "Coliflor",
                        "Esparrago",
                        "Nabo",
                        "Papas",
                        "Puerro",
                        "Pera"
                    ]
                }
            ];
            scope.local = scope.tipo == "local" ? true : false;
            scope.url = scope.tipo == "url" ? true : false;

            scope.clAbrirCerrar = function (todo, opcion) {
                for (var i = 0; i < todo.length; i++) {
                    if (todo[i].titulo != opcion.titulo) {
                        todo[i].colapse.clCerrado = true;
                        todo[i].colapse.clAbierto = false;
                    }
                }
                if (opcion.colapse.clCerrado) {
                    opcion.colapse.clCerrado = false;
                    opcion.colapse.clAbierto = true;
                } else {
                    opcion.colapse.clCerrado = true;
                    opcion.colapse.clAbierto = false;
                }
            }

            scope.cate = function (categoria) {
                if (scope.local)
                scope.categoria = categoria;
            }
        }
    };
}]);