app.factory("FacUsuarios", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaUsuarios: function () {
            return $http.get(servicio + "/usuarios");
        },
        consultaUsuarioId: function (id) {
            return $http.get(servicio + "/usuarios/" + id);
        }

    }
}]);
