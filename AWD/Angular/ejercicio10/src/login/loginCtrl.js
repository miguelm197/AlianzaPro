app.controller("loginCtrl", ["$scope", "FacRegistro", "FacLogin", "$location", function ($scope, FacRegistro, FacLogin, $location) {

    $scope.login = function (correo, clave) {
        correo = correo.$viewValue;
        clave = clave.$viewValue;
        FacRegistro.existenciaCorreo(correo).then(
            function (res) {
                var datos = res.data;
                console.log(datos)
                if (datos.length > 0) {
                    FacLogin.setCredentials(correo, clave);
                    $location.path('/home');
                } else {
                    alertify.dialog('alert').set({ transition: 'flipx', message: 'No está registrado este correo' }).show();
                    $(".ajs-header").text("Login");
                }
            }
        );




    }
}]);