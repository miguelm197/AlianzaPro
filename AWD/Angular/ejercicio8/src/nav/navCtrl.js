app.controller('navCtrl', function ($scope, $route, $routeParams, $location, AuthenticationService) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.urlNav = 'src/nav/nav.html';


    $scope.salir = function () {
        AuthenticationService.ClearCredentials();
    }
})