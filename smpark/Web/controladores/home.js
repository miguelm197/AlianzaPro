app.controller("homeCtrl", ['$scope', '$http', 'FacMatriculas', function ($scope, $http, FacMatriculas) {
    $scope.listaMatriculas = [];
    $scope.inpMatricula = "";

    $scope.consultarAccesos = function () {
        $scope.listaMatriculas.length = 0;

        FacMatriculas.consultaMatriculas().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var acceso = {
                    matricula: data[i].matricula,
                    cliente: data[i].cliente.nombre + " " + data[i].cliente.apellido,
                    pais: data[i].pais,
                    tipoVehiculo: data[i].tipoVehiculo,
                    tipoCliente: data[i].cliente.tipoCliente,
                    activo: data[i].activo
                }

                for (var p = 0; p < data[i].ingresos.length; p++) {
                    var ingreso = data[i].ingresos[p];
                    if (ingreso.fechaSalida = "--") {
                        acceso.entrada = formatDate(ingreso.fechaEntrada);
                        acceso.salida = formatDate(ingreso.fechaSalida);
                        acceso.comentario = ingreso.comentario;
                        acceso.menuActivo = false;
                        acceso.park = ingreso.lugar;

                    }
                }
                function formatDate(value) {
                    var fecha = new Date(value);
                    var dia = fecha.getDate();
                    var mes = fecha.getMonth() + 1;
                    var ani = fecha.getFullYear();
                    var hor = fecha.getHours();
                    var min = fecha.getMinutes();
                    if (hor < 10) hor = "0" + hor;
                    if (min < 10) min = "0" + min;
                    var retorno = "" +
                        dia + "/" + mes + "/" + ani
                        + " - " +
                        hor + ":" + min;
                    return retorno;
                }

                $scope.listaMatriculas.push(acceso);
            }
        });
    }



    $scope.ingresoVehiculo = function () {
        var matricula = $scope.inpMatricula;

        FacMatriculas.ingresoVehiculo(matricula);
        $scope.inpMatricula = "";
        setTimeout($scope.consultarAccesos, 500);
    }

    $scope.salidaVehiculo = function () {
        var matricula = $scope.inpMatricula;
        FacMatriculas.salidaVehiculo(matricula);
        $scope.inpMatricula = "";

        setTimeout($scope.consultarAccesos, 500);

    }


}]);
app.controller("pruebaCtrl", ['$scope', '$http', 'FacMatriculas', function ($scope, $http, FacMatriculas) {
    FacMatriculas.consultaMatriculas().then(function (data) {
        $scope.miembros = data;
        $scope.gridOptions = {
            data: data
        }
    });
}]);