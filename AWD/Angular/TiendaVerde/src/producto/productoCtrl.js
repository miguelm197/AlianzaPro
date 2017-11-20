app.controller("productoCtrl", ["$scope", "$location", 'FacProducto', function ($scope, $location, FacProducto) {
    $scope.producto = {}
    $scope.cantidad = 0;
    var url = $location.$$url;
    var id = url.split("/")[2];

    FacProducto.consultaProductoPorId(id).then(function (res) {
        var prod = res.data;
        $scope.producto = prod;
    });

    // {
    //     "nombre": "asd",
    //     "precio": 1,
    //     "stock": 2,
    //     "subtitulo": "asd canadienses",
    //     "descripcion": "safffff",
    //     "nutricional": {
    //       "calorias": 1,
    //       "proteinas": 2,
    //       "hidratos": 3,
    //       "grasas": 4
    //     },
    //     "id": 1
    //   }
}]);