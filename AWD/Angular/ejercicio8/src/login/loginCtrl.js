app.controller("loginCtrl", ["$scope", "FacLogin", "$location", "$rootScope", "AuthenticationService", function ($scope, FacLogin, $location, $rootScope, AuthenticationService) {

    $scope.ingresar = function () {
        var usuario = $scope.usuario;
        var clave = $scope.clave;

        FacLogin.consultaUsuario(usuario).then(
            function (res) {
                var datos = res.data;
                if (datos.length == 0) {
                    console.log("no existe el usuario");
                } else {
                    console.log("Bienvenido");
                    AuthenticationService.SetCredentials(usuario, clave);
                }
            }
        );
    }

    



    $scope.logout = function () {
        AuthenticationService.ClearCredentials();
        $location.path('/login');
    }
}]);