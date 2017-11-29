app.controller("navCtrl", ["$scope", "FacLogin", 'FacParametros', "$location", '$rootScope', function ($scope, FacLogin, FacParametros, $location, $rootScope) {
    $scope.scroll = true;
    $scope.sesions = false;
    $scope.sesion = {}
    $scope.categoria = {}
    $scope.buscado = {}

    $scope.clCategorias = {
        "abrirCategorias": false,
        "cerrarCategorias": true
    }
    $scope.fondo = {
        "ocultarFondo": false,
        "mostrarFondo": false,
        "quitarFondo": true,
        "colocarFondo": false
    }
    var cat = false;


    // $scope.hola = false;

    $(window).scroll(function () {
        var posicion = $(document).scrollTop();
        if (posicion < 72) {
            $scope.scroll = false;
            $("#busca").removeClass("col-lg-6");
            $("#busca").addClass("col-lg-8");
            $("#categ").addClass("hide");

            $(".categorias").css("margin-top", "-5px");
        } else {
            $scope.scroll = true;
            $("#busca").removeClass("col-lg-8");
            $("#categ").removeClass("hide");
            $("#busca").addClass("col-lg-6");

            $(".categorias").css("margin-top", "-45px");

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

    $scope.perfil = function () {
        var cook = $rootScope.globals;
        var id = cook.currentUser.id;
        $location.path("/usuario/" + id);
    }

    $scope.categorias = function () {
        if (cat) {
            $scope.clCategorias.abrirCategorias = false;
            $scope.clCategorias.cerrarCategorias = true;
            $scope.fondo.colocarFondo = false;
            $scope.fondo.quitarFondo = true;
            cat = false;
        } else {
            $scope.clCategorias.abrirCategorias = true;
            $scope.clCategorias.cerrarCategorias = false;
            $scope.fondo.colocarFondo = true;
            $scope.fondo.quitarFondo = false;
            cat = true;
        }
    }

    $scope.home = function () {
        $location.path("/home")
    }

    FacParametros.consultaParametros().then(function (res) {
        var parametros = res.data[0];
        $scope.parametros = parametros;
        console.log("asd")
    });
}]);