app.controller("nuevoProductoCtrl", ["$scope", "$location", 'FactProductos', function ($scope, $location, FactProductos) {
    $scope.categoria = "Categoría"

    $scope.agregarProducto = function () {

        producto = $scope.producto;
        producto.categoria = $scope.categoria;

        FactProductos.agregarProducto(producto).then(function () {
            alert("Se agregó el producto correctamente");
        })
    }
}]);