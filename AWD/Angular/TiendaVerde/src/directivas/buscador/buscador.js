app.directive('buscador', ["FacProductos", "$location", function (FacProductos, $location) {
    return {
        templateUrl: './src/directivas/buscador/buscador.html',
        restrict: 'E',
        scope: {
            buscar: "="
        },
        link: function (scope, element) {


        }
    };
}]);