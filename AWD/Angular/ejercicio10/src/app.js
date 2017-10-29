var app = angular.module("myApp", ['ngRoute', 'ngCookies', 'ui.grid', 'angular-md5', 'ui.bootstrap.datetimepicker', 'angular-carousel']);




/*ENRUTAMIENTO*/
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/registro', {
            templateUrl: 'src/registro/registro.html',
            controller: 'registroCtrl'
        })
        .when('/login', {
            templateUrl: 'src/login/login.html',
            controller: 'loginCtrl'
        })
        .when('/home', {
            templateUrl: 'src/home/home.html'
        })
        .when('/nuevaTarea', {
            templateUrl: 'src/nuevaTarea/nuevaTarea.html',
            controller: 'nuevaTareaCtrl'
        })
        .when('/listaTareas', {
            templateUrl: 'src/listaTareas/listaTareas.html',
            controller: 'listaTareasCtrl'
        })
        .when('/tarea/:id', {
            templateUrl: 'src/tarea/tarea.html',
            controller: 'tareaCtrl'
        })

        .otherwise({ redirectTo: "/home" });

});


//Autenticacaion
app.run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {
    // mantenerse logueado luego de resfrescar la pagina
    $rootScope.globals = $cookies.getObject('globals') || false;//Obtengo los valore de las cookies si hay
    // console.log($rootScope.globals);

    // $rootScope.globals = $rootScope.globals ? $rootScope.globals.currentUser : false;


    if ($rootScope.globals) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line

        //Verifica la primera vez que arranca la pag
        // if ($rootScope.globals.currentUser.rolUsuario == "admin") {
        //     $location.path('/listaTareas');
        // }
        // if ($rootScope.globals.currentUser.rolUsuario == "public") {
        //     $location.path('/nuevaTarea');
        // }
    }


    //Verifica cada vez que cambia la url (queda escuchando)
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect a la pagina de login sino no hay usuario logueado
        /* if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
        */

        var loggedIn = $rootScope.globals ? $rootScope.globals.currentUser : false;
        if (loggedIn) {
            var rolUsuario = loggedIn.rolUsuario;

            var paginasPublic = ['/registro', '/home', '/listaTareas'];
            var paginasAdmins = ['/registro', '/home', '/listaTareas', '/nuevaTarea'];
            var paginas = [""];

            if (rolUsuario == "admin") {
                paginas = paginasAdmins;
            }
            if (rolUsuario == "piblic") {
                paginas = paginasPublic;
            }

            var restrictedPage = paginas.indexOf($location.path()) != -1 ? true : false;

            if (!restrictedPage) {
                $location.path('/home');
            }

        } else {
            var paginas = ['/registro', '/login'];
            var restrictedPage = $.inArray($location.path(),) === -1;
            var restrictedPage = paginas.indexOf($location.path()) != -1 ? true : false;
            
            if (!restrictedPage){
                $location.path('/login');
            }
        }



    });


}]);
