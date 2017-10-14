var app = angular.module("myApp",['ngRoute']);

app.constant('gastosCTEOptions', [{id: '1', name: 'Viajes'}, {id: '2', name: 'Facturas'},{id: '3', name: 'Comida'}]);
app.constant('gastosCTE', [{id: '0', option:'1',show:true,titulo: 'Francia'}, {id: '1', option:'2',show:true,titulo: 'Pagar OSE'}]);



/*ENRUTAMIENTO*/
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'src/views/todo.html',
      controller: 'todoController',
      //controllerAs: 'todoController'
    })
    .when('/gastos', {
        templateUrl: 'src/views/gastos.html',
        controller: 'gastosController',
    })
    .when('/gastos', {
        templateUrl: 'src/views/gastos.html',
        controller: 'gastosController',
    })
    .when('/productos', {
        templateUrl: 'src/views/productos.html',
        controller: 'productosController',
    })
    .when('/usuarios', {
        templateUrl: 'src/views/usuarios.html',
        controller: 'usuariosController',
    })
    .otherwise( { redirectTo: "/" });;
  
    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  });