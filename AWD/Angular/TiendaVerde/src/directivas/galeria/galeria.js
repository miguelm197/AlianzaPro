app.directive('galeria', ["FacProductos", "$location", function (FacProductos, $location) {
    return {
        templateUrl: './src/directivas/galeria/galeria.html',
        restrict: 'E',
        scope: {
            tipo: "@",
            categoria: "="
        },
        link: function (scope, element) {
            scope.local = false;
            scope.url = false;
            scope.local = scope.tipo == "local" ? true : false;
            scope.url = scope.tipo == "url" ? true : false;

     
            
            var categoria = "Verde";
            var item = "Categor";


            if (scope.url) {
                categoria = $location.$$search.categoria;
                item = $location.$$search.item;
            }

            if (scope.local){
                scope.categoria = "Verde";
                
            }
            var cate = true;
            try {
                cate = item.indexOf("Categor") == 0 ? true : false
            } catch (error) { }

            if (cate) {
                FacProductos.consultaProductoPorCategoria(categoria).then(function (res) {
                    scope.listaProductos = res.data;
                    // console.log(scope.listaProductos)
                });
            } else {

                FacProductos.consultaProductoPorItem(categoria, item).then(function (res) {
                    scope.listaProductos = res.data;
                    // console.log(scope.listaProductos)
                });
            }



            scope.$watch("categoria", function () {
                
                if (scope.local) {
                    categoria = scope.categoria;
                    FacProductos.consultaProductoPorCategoria(categoria).then(function (res) {
                        scope.listaProductos = res.data;
                    });
                }
            });

        }
    };
}]);