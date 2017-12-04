app.factory("FacListaProductos", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaProductos: function () {
            return $http.get(servicio + "/productos");
        },
        consultaProductoId: function (id) {
            return $http.get(servicio + "/productos/" + id);
        },
        eliminarProducto: function (id) {
            return $http.delete(servicio + "/productos/" + id);
        }

    }
}]);
