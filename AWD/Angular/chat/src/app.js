var app = angular.module("myApp", ['ngRoute']);

/*ENRUTAMIENTO*/
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/chat/chat.html',
            controller: 'chatCtrl'
        })
        .otherwise({ redirectTo: "/" });;

});

var urlServices = "http://localhost";
var portServices = 3000;

app.config['urlServicios'] = urlServices + ":" + portServices;