app.directive('desplegable', ["FacProducto", function (FacProducto) {
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
            scope.categorias = [];
            var colapse = {
                "clCerrado": true,
                "clAbierto": false
            }
            FacProducto.consultaCategorias().then(function (res) {
                scope.categorias = res.data;
                for (var i = 0; i < scope.categorias.length; i++) {
                    scope.categorias[i].colapse = {
                        "clCerrado": true,
                        "clAbierto": false
                    }
                }
            });







            scope.local = scope.tipo == "local" ? true : false;
            scope.url = scope.tipo == "url" ? true : false;

            scope.clAbrirCerrar = function (opcion) {
                for (var i = 0; i < scope.categorias.length; i++) {
                    if (scope.categorias[i].titulo != opcion.titulo) {
                        scope.categorias[i].colapse.clCerrado = true;
                        scope.categorias[i].colapse.clAbierto = false;
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