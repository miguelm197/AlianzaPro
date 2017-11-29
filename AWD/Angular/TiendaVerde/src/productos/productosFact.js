app.factory("FacProductos", ["$http", function ($http) {
    var servicio = app.config.urlServicios;

    return {
        consultaProductoPorItem: function (categoria, item) {
            return $http.get(servicio + "/productos/?categoria=" + categoria + "&item=" + item);
        },
        consultaProductoPorCategoria: function (categoria) {
            return $http.get(servicio + "/productos/?categoria=" + categoria);
        }
    }

}]);