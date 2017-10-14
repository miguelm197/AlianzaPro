app.controller('EnrutamientoController', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    
    $scope.urlNav = 'src/views/base/nav.html';
})