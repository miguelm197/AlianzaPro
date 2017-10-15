var app = angular.module("myApp", ['ngRoute', 'ngCookies']);






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

        .otherwise({ redirectTo: "/home" });

});


//Autenticacaion
app.run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {
    // mantenerse logueado luego de resfrescar la pagina
    $rootScope.globals = $cookies.getObject('Tareas') || {};//Obtengo los valore de las cookies si hay
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect a la pagina de login sino no hay usuario logueado
        /* if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
             $location.path('/login');
         }
         */
        // redirect a la pagina de login sino no hay usuario logueado y no tiene acceso a determinadas paginas
        var restrictedPage = $.inArray($location.path(), ['/login', '/registro']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
        //solo podra acceder al resto de las vistas si hay usuario logueado sino solo vera registro y login.
    });


}]);