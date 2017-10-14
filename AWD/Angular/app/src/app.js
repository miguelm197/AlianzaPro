var app = angular.module("myApp",['ngRoute']);

/*ENRUTAMIENTO*/
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'src/views/todo.html',
      controller: 'todoController',
      //controllerAs: 'todoController'
    })
    .when('/tareas', {
        templateUrl: 'src/views/tareas.html',
        controller: 'tareasCtrl',
    })
    .when('/usuarios', {
        templateUrl: 'src/views/usuarios.html',
        controller: 'usuariosCtrl',
    })
    .otherwise( { redirectTo: "/" });;
  
    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
  });