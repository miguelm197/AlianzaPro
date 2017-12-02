app.controller("productoCtrl", ["$scope", "$location", 'FacProducto', '$rootScope', function ($scope, $location, FacProducto, $rooteScope) {
    $scope.producto = {}
    $scope.cantidad = 0;
    $scope.editar = false;

    var url = $location.$$url;
    var id = url.split("/")[2];

    FacProducto.consultaProductoPorId(id).then(function (res) {
        var prod = res.data;
        $scope.producto = prod;
    });



    $scope.editarProducto = function () {
        $scope.editar = $scope.editar ? false : true;
        
        $rooteScope.alerta.mensaje("mensaje","Productos","El producto se ha infegiojasoifjasoifajsgo")
        console.log("asasfasff")
    }






}]);