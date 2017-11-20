app.controller("listaProductosCtrl", ["$scope", "FacListaProductos", function ($scope, FacListaProductos) {
    $scope.listaProductos = [];

    $scope.datos = {
        configuracion: {
        },
        datos: []
    };

    FacListaProductos.consultaProductos().then(function (data) {
        var resultado = [];
        data = data.data;
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            data[i]["ver"] = "/#!/producto/" + id;
            $scope.datos.datos.push(data[i])
        }
    });

}]);