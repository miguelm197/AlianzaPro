app.controller("loginCtrl", ["$scope", "FacLogin", "$location", "md5", function ($scope, FacLogin, $location, md5) {
    $scope.loginUs = true;
    $scope.registerUs = false;

    $scope.IngresoRegistro = function (opcion) {
        if (opcion == "login") {
            $scope.loginUs = true;
            $scope.registerUs = false;
            $scope.BoldIngresar = {
                "font-weight": "bold"
            }
            $scope.BoldRegistrar = {
                "font-weight": "inherit"
            }

        }
        if (opcion == "registro") {
            $scope.loginUs = false;
            $scope.registerUs = true;
            $scope.BoldIngresar = {
                "font-weight": "inherit"
            }
            $scope.BoldRegistrar = {
                "font-weight": "bold"
            }
        }
    }



    $scope.login = function (correo, clave) {
        correo = correo.$viewValue;
        clave = clave.$viewValue;
        FacLogin.existenciaCorreo(correo).then(function (res) {
            var datos = res.data;
            if (datos.length > 0) {
                var datos = datos[0];
                var claveBD = datos.clave;
                var claveUs = md5.createHash(clave);
                if (claveUs == claveBD) {
                    var rolUsuario = datos.rol;
                    var nombre = datos.nombre;
                    var apellido = datos.apellido;
                    FacLogin.setCredentials(correo, clave, rolUsuario, nombre, apellido);
                     $location.path('/home');
                    console.log("sape wacho")
                } else {
                    console.log("Conraseña incorrecta")
                }

            } else {
                console.log("mal el correo wachin")
            }
        });
    }

    $scope.registrarse = function () {
        var nombre = $scope.usuario.nombre;
        var apellido = $scope.usuario.apellido;
        var correo = $scope.usuario.correo;
        var claveUno = $scope.usuario.clave;
        var claveDos = $scope.usuario.claveConf;
        var direccion = $scope.usuario.direccion;
        var rol = $scope.usuario.rol;
        rol = "admin";
        if (claveUno === claveDos) {
            var objeto = {
                "nombre": nombre,
                "apellido": apellido,
                "correo": correo,
                "direccion": direccion,
                "rol": rol,
                "clave": md5.createHash(claveDos),
                "activo": "true"
            }
            FacLogin.existenciaCorreo(correo).then(
                function (res) {
                    var datos = res.data;
                    if (datos.length == 0) {
                        FacLogin.agregarUsuario(objeto).then(
                            function (res) {
                                $scope.IngresoRegistro("login");
                            }
                        );
                    } else {
                        alert("Ya existe este usuario");
                    }
                }
            );
        } else {
            alert("Las contraseñas no son iguales");
        }
    }


}]);