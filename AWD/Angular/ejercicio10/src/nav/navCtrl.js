app.controller("navCtrl", ["$scope", "FacLogin", "$location", function ($scope, FacLogin, $location) {

    $scope.cerrarSesion = function () {
        FacLogin.ClearCredentials();
        $location.path('/login');
    }
}]);