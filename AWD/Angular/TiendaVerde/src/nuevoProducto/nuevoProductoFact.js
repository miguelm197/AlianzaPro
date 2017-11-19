app.factory("FactProductos", ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        consultaUsuarios: function () {
            return $http.get(servicio + "/usuarios");
        },
        agregarProducto: function (objeto) {
            return $http.post(servicio + "/productos", objeto);
        }


    }
}]);