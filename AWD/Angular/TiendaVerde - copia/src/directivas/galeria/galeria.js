app.directive('galeria', ["FacProductos", "$location", function (FacProductos, $location) {
    return {
        templateUrl: './src/directivas/galeria/galeria.html',
        restrict: 'E',
        scope: {
            tipo: "@",
            categoria: "="
        },
        link: function (scope, element) {
            scope.sinRes = false;
            scope.local = false;
            scope.url = false;
            scope.destacado = false;
            scope.local = scope.tipo == "local" ? true : false;
            scope.url = scope.tipo == "url" ? true : false;
            scope.destacado = scope.tipo == "destacado" ? true : false;



            var categoria = "Verde";
            var item = "Categor";


            if (scope.url) {
                categoria = $location.$$search.categoria;
                item = $location.$$search.item;
            }

            if (scope.local) {
                scope.categoria = categoria;
            }

            if (scope.destacado) {
                scope.categoria = categoria;
            }


            var cate = true;
            try {
                cate = item.indexOf("Categor") == 0 ? true : false
            } catch (error) { }

            if (scope.url) {
                if (cate) {
                    FacProductos.consultaProductoPorCategoria(categoria).then(function (res) {
                        scope.titulo = "Producto por categoría: " + categoria;
                        scope.listaProductos = res.data;
                    });
                } else {
                    FacProductos.consultaProductoPorItem(categoria, item).then(function (res) {
                        scope.titulo = "Producto por item: " + item;
                        scope.listaProductos = res.data;
                    });
                }
            }


            scope.$watch("categoria", function () {

                if (scope.local) {
                    categoria = scope.categoria;
                    FacProductos.consultaProductoPorCategoria(categoria).then(function (res) {
                        scope.titulo = "Producto por categoría: " + categoria;
                        scope.listaProductos = res.data;
                    });
                }

                if (scope.destacado) {
                    categoria = scope.categoria;
                    FacProductos.consultaProductoPorCategoria(categoria).then(function (res) {
                        scope.listaProductos = [];
                        scope.titulo = "Producto por categoría " + categoria;
                        var productos = res.data;
                        var cantidad = 4;
                        for (var i = 0; i < cantidad; i++) {
                            try {
                                scope.listaProductos.push(productos[i])
                            } catch (err) {
                            }
                        }
                        if (scope.listaProductos[0] == undefined)
                            scope.sinRes = true;
                        else
                            scope.sinRes = false;

                    });
                }



            });

        }
    };
}]);