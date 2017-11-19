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
        console.log(data);
        console.log("-------")
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            $scope.datos.datos.push(data[i])
            console.log(data[i]);
        }
    });

}]);