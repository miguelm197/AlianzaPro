var app = angular.module("myApp", ['ngRoute', 'ngCookies', 'angular-md5', 'angular-carousel', 'ngTouch', 'ngFileUpload']);

/*ENRUTAMIENTO*/
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'src/login/login.html',
            controller: 'loginCtrl'
        })
        .when('/home', {
            templateUrl: 'src/home/home.html',
            controller: 'homeCtrl'
        })
        .when('/configuracion', {
            templateUrl: 'src/configuracion/configuracion.html',
            controller: 'configuracionCtrl'
        })
        .when('/nuevoProducto', {
            templateUrl: 'src/nuevoProducto/nuevoProducto.html',
            controller: 'nuevoProductoCtrl'
        })
        .when('/listaProductos', {
            templateUrl: 'src/listaProductos/listaProductos.html',
            controller: 'listaProductosCtrl'
        })
        .when('/listaUsuarios', {
            templateUrl: 'src/listaUsuarios/listaUsuarios.html',
            controller: 'listaUsuariosCtrl'
        })
        .when('/usuario/:id', {
            templateUrl: 'src/usuario/usuario.html',
            controller: 'usuarioCtrl'
        })
        .when('/producto/:id', {
            templateUrl: 'src/producto/producto.html',
            controller: 'productoCtrl'
        })
        .when('/productos', {
            templateUrl: 'src/productos/productos.html',
            controller: 'productosCtrl'
        })
        .when('/parametros', {
            templateUrl: 'src/parametros/parametros.html',
            controller: 'parametrosCtrl'
        })

        .otherwise({ redirectTo: "/home" });
});


//Autenticacaion
app.run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {

    var urlServices = "http://localhost";
    var portServices = 3000;

    app.config['urlServicios'] = urlServices + ":" + portServices;

    // mantenerse logueado luego de resfrescar la pagina
    $rootScope.globals = $cookies.getObject('globals') || false;//Obtengo los valore de las cookies si hay
    // console.log($rootScope.globals);

    // $rootScope.globals = $rootScope.globals ? $rootScope.globals.currentUser : false;


    if ($rootScope.globals) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }


    //Verifica cada vez que cambia la url (queda escuchando)
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        var loggedIn = $rootScope.globals ? $rootScope.globals.currentUser : false;
        if (loggedIn) {
            var rolUsuario = loggedIn.rolUsuario;

            //Páginas en las cuales NO puede entrar el rol
            var paginasPublic = ['/nuevaTarea', '/parametros'];
            var paginasAdmins = [];
            var paginas = [""];

            if (rolUsuario == "admin")
                paginas = paginasAdmins;

            if (rolUsuario == "public")
                paginas = paginasPublic;

            var pag = $location.path();
            var restrictedPage = paginas.indexOf(pag) == -1 ? true : false;

            if (!restrictedPage) {
                $location.path('/home');
            }

        } else {


            //Páginas que puede entrar un usuario sin estar logueado
            var paginas = ['/login', '/home', '/productos'];
            // var restrictedPage = $.inArray($location.path(), ) === -1;

            var restrictedPage = false;
            if ($location.path().indexOf("/producto/") != -1) {
                restrictedPage = true;
            } else {
                restrictedPage = paginas.indexOf($location.path()) != -1 ? true : false;
            }

            
            if (!restrictedPage) {
                $location.path('/home');
            }
        }


        var currPag = $location.path();
        // páginas donde no se tiene que mostrar el usuario buscador xel nav
        var pags = ["/configuracion", "/nuevoProducto", "/parametros"];
        for (var i = 0; i <= pags.length; i++) {
            if (currPag == pags[i]) {
                $("#busca").addClass("invisible");
            } else {
                $("#busca").removeClass("invisible");
            }
        }



    });

}]);
