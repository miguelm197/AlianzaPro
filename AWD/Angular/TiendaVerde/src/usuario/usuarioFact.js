app.factory("FacUsuario", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaUsuarioPorId: function (id) {
            return $http.get(servicio + "/usuarios/" + id);
        },
        guardarUsuarioId: function (id, objeto) {
            return $http.put(servicio + "/usuarios/" + id, objeto);
        }

    }
}]);