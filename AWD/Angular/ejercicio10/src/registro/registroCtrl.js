app.controller("registroCtrl", ["$scope", "FacRegistro", function ($scope, FacRegistro) {


    $scope.registrarse = function () {
        var nombre = $scope.usuario.nombre;
        var apellido = $scope.usuario.apellido;
        var correo = $scope.usuario.correo;
        var claveUno = $scope.usuario.claveUno;
        var claveDos = $scope.usuario.claveDos;

        alert(nombre + " " + apellido + " " + correo + " " + claveUno + " " + claveDos);

        if (claveUno === claveDos) {

            var objeto = {
                "nombre": nombre,
                "apellido": apellido,
                "correo": correo,
                "clave": claveDos,
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