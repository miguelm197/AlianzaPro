app.controller("loginCtrl", ["$scope", "FacRegistro", "FacLogin", "$location", "md5", function ($scope, FacRegistro, FacLogin, $location, md5) {

    $scope.login = function (correo, clave) {
        correo = correo.$viewValue;
        clave = clave.$viewValue;
        FacRegistro.existenciaCorreo(correo).then(
            function (res) {
                var datos = res.data;
                if (datos.length > 0) {
                    FacLogin.consultaClave(correo).then(function (res) {
                        var datos = res.data;
                        var claveBD = datos[0].clave;
                        var claveUs = md5.createHash(clave);
                        if (claveUs == claveBD) {
                            FacLogin.setCredentials(correo, clave);
                            $location.path('/home');
                        } else {
                            alertify.dialog('alert').set({ transition: 'flipx', message: 'Contraseña incorrecta' }).show();
                            $(".ajs-header").text("Login");
                        }
                    })

                } else {
                    alertify.dialog('alert').set({ transition: 'flipx', message: 'No está registrado este correo' }).show();
                    $(".ajs-header").text("Login");
                }
            }
        );




    }
}]);