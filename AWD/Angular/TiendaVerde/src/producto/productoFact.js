app.factory("FacProducto", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaProductoPorId: function (id) {
            return $http.get(servicio + "/productos/" + id);
        },
        guardarUsuarioId: function (id, objeto) {
            return $http.put(servicio + "/usuarios/" + id, objeto);
        }

    }
}]);