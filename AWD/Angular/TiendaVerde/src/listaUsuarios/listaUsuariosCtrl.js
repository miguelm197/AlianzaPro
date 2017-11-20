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
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            data[i]["ver"] = "/#!/usuario/" + id;
            $scope.datos.datos.push(data[i])
        }
    });

}]);