app.controller("homeCtrl", ["$rootScope", "$scope", "$location", 'FacParametros', function ($rootScope, $scope, $location, FacParametros) {
//    variable en comun entre desplegable y galeria
    $scope.categoriaProductosDestacado = "Verde";

    FacParametros.consultaParametros().then(function (res) {
        var parametros = res.data[0];
        $scope.slides = {
            slide1: parametros.slide1,
            slide2: parametros.slide2,
            slide3: parametros.slide3
        };
    });

}]);    