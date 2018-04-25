app.factory("FacProducto", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaProductoPorId: function (id) {
            return $http.get(servicio + "/productos/" + id);
        },
        agregarItem: function (id, objeto) {
            return $http.put(servicio + "/categorias/" + id, objeto);
        },
        consultaItems: function (categoria) {
            return $http.get(servicio + "/categorias?titulo=" + categoria);
        },
        consultaCategorias: function () {
            return $http.get(servicio + "/categorias/");
        },
        guardarUsuarioId: function (id, objeto) {
            return $http.put(servicio + "/usuarios/" + id, objeto);
        },
        guardarProductoPorId: function (id, objeto) {
            return $http.put(servicio + "/productos/" + id, objeto);
        }

    }
}]);