app.controller("navCtrl", ["$scope", "FacLogin", 'FacParametros', "$location", '$rootScope', function ($scope, FacLogin, FacParametros, $location, $rootScope) {
    $scope.scroll = false;
    $scope.sesions = false;
    $scope.sesion = {}
    $scope.categoria = {}
    $scope.buscado = {}
    $scope.admin = false;




    $scope.visible = {
        "invisible": false
    }
    
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
    $scope.busca = {
        "col-lg-6": false,
        "col-lg-8": false,
        "invisible": false
    }

    $scope.categ = {
        "hide": false
    }
    var cat = false;

    var rol = $rootScope.globals.currentUser.rolUsuario;
    $scope.admin = rol == "admin" ? true : false;

    // MUESTRA O NO EL BUSCADOR
    $scope.$watch(
        function () { return $rootScope.buscador }, function () {
            $scope.busca.invisible = $rootScope.buscador.visible;
            $scope.visible.invisible = $rootScope.buscador.visible;
        });


    document.body.onscroll = function () {
        var posicion = 0;
        $scope.posicion = window.scrollY;

        function eliminarClase(id, clase) {
            var colClases = document.getElementById(id).className;

            var col = colClases.split(" ");
            var texto = "";

            for (var i = 0; i < col.length; i++) {
                if (col[i] != clase) {
                    texto = texto + col[i] + " ";
                }
            }
            document.getElementById(id).className = texto;
        }

        function agregarClase(id, clase) {
            var colClases = document.getElementById(id).className;

            var texto = "";
            if (colClases.indexOf(clase) == -1) {
                texto = colClases + " " + clase;
            } else {
                texto = colClases;
            }
            document.getElementById(id).className = texto;

        }


        if ($scope.posicion < 42) {
            $scope.scroll = false;
        } else {
            $scope.scroll = true;
        }

        if ($scope.scroll) {
            document.getElementById("catego").style.display = "inline";
            document.getElementById("categorias").style["margin-top"] = "-45px";

            eliminarClase("busca", "col-lg-8");
            agregarClase("busca", "col-lg-6");
        } else {
            document.getElementById("catego").style.display = "none";
            document.getElementById("categorias").style["margin-top"] = "-5px";
            eliminarClase("busca", "col-lg-6");
            agregarClase("busca", "col-lg-8");
        }
    }



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

    $scope.clCategoriasCel = {
        "abrirCategoriasCel": false,
        "cerrarCategoriasCel": true
    }

    $scope.categoriasCel = function () {
        if (cat) {
            $scope.clCategoriasCel.abrirCategoriasCel = false;
            $scope.clCategoriasCel.cerrarCategoriasCel = true;

            cat = false;
        } else {
            $scope.clCategoriasCel.abrirCategoriasCel = true;
            $scope.clCategoriasCel.cerrarCategoriasCel = false;

            cat = true;
        }
    }

    $scope.home = function () {
        $location.path("/home")
    }

    FacParametros.consultaParametros().then(function (res) {
        var parametros = res.data[0];
        $scope.parametros = parametros;
    });
}]);