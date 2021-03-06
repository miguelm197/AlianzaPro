app.controller("listaProductosCtrl", ["$scope", "FacListaProductos","$rootScope", function ($scope, FacListaProductos,$rootScope) {
    $scope.listaProductos = [];

    $scope.datos = {
        configuracion: {
        },
        datos: []
    };

    $scope.cargarTabla = function () {
        $scope.datos.datos = [];
        FacListaProductos.consultaProductos().then(function (data) {
            var resultado = [];
            data = data.data;
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                data[i]["ver"] = "/#!/producto/" + id;
                $scope.datos.datos.push(data[i]);
            }
        });
    }

    $scope.cargarTabla();

    $scope.eliminarProducto = function (id) {
        FacListaProductos.eliminarProducto(id).then(function () {
            $scope.cargarTabla();
            $rootScope.alerta.mensaje("alerta", "Productos", "Se eliminó correctamente");
        });
    }

}]);