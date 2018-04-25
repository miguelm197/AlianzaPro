app.factory("FactProductos", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        agregarProducto: function (objeto) {
            return $http.post(servicio + "/productos/", objeto);
        }

    }
}]);