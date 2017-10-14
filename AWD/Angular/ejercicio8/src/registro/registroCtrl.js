app.controller("registroCtrl", ["$scope", "FacRegistro", function ($scope, FacRegistro) {

    $scope.registrarse = function () {
        var claveUno = $scope.claveUno;
        var claveDos = $scope.claveDos;

        if (claveUno === claveDos) {

            var objeto = {
                "usuario": $scope.claveUno,
                "clave": $scope.claveDos,
                "activo": "true"
            }
            FacRegistro.agregarUsuario(objeto).then(
                function (res) {

                }
            );
        } else {
            alert("NUUU");
        }
    }

}]);