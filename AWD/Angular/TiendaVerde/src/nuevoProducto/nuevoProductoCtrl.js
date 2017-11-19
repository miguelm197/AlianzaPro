app.controller("nuevoProductoCtrl", ["$scope", "$location", 'FactProductos', function ($scope, $location, FactProductos) {
    $scope.categoria = "Categoría"
    var nombre
    var categoria
    var precio
    var stock
    var imagen
    var descripcion
    var calorias
    var proteinas
    var hidratos
    var grasas

    $scope.agregarProducto = function () {
        FactProductos.agregarProducto($scope.producto).then(function () {
            alert("Se agregó el producto correctamente");
        })
    }
}]);