app.controller("navCtrl", ["$scope", "FacLogin", "$location", '$rootScope', function ($scope, FacLogin, $location, $rootScope) {
    $scope.scroll = true;
    $scope.sesions = false;
    $scope.sesion = {}
    $scope.categoria = {  }
    $(window).scroll(function () {
        var posicion = $(document).scrollTop();
        if (posicion < 92) {
            $scope.scroll = false;
            $("#busca").removeClass("col-lg-6");
            $("#busca").addClass("col-lg-8");
            $("#categ").addClass("hide");
        } else {
            $scope.scroll = true;
            $("#busca").removeClass("col-lg-8");
            $("#categ").removeClass("hide");
            $("#busca").addClass("col-lg-6");
        }
    });



    // $scope.sesion = {}

    $scope.$watch("globals", function (newValue, oldValue) {
        cargarDatosSesion();
    })

    function cargarDatosSesion() {
        var cook = $rootScope.globals;
        if (cook) {
            $scope.sesions = true;
            var rolUsuario = cook.currentUser.rolUsuario;
            var nombre = cook.currentUser.nombre;
            var apellido = cook.currentUser.apellido;

            $scope.sesion.rol = rolUsuario;
            $scope.sesion.nombre = nombre.toUpperCase() + " " + apellido.toUpperCase();
        }
    }

    $scope.cerrarSesion = function () {
        FacLogin.ClearCredentials()
        $scope.sesions = false;
    }

    $scope.iniciarSesion = function () {
        console.log("iniciar")
        $location.path("/login");
    }
}]);