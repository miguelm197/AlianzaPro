app.controller("listaUsuariosCtrl", ["$scope", "FacUsuarios", function ($scope, FacUsuarios) {
    $scope.listaUsuarios = [];

    $scope.datos = {
        configuracion: {
        },
        datos: []
    };

    FacUsuarios.consultaUsuarios().then(function (data) {
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