var app = angular.module('myApp', []);


/*ENRUTAMIENTO*/
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/listaTareas.html',
            controller: 'tareasCtrl',
        })
        .when('/gastos', {
            templateUrl: 'views/gastos.html',
            controller: 'gastosController',
        })
        .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(true);
});

