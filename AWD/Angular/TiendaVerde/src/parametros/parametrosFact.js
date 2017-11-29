app.factory("FacParametros", ["$http", '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
    var servicio = app.config.urlServicios;

    return {
        consultaParametros: function () {
            return $http.get(servicio + "/parametros/");
        },
        guardarParametros: function (objeto) {
            return $http.put(servicio + "/parametros/1", objeto);
        }
    }
}]);