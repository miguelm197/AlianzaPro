//ASYNCRONICO
app.factory('chatFact', ["$http", function ($http) {
    var servicio = app.config.urlServicios;
    return {
        agregarMensaje: function (objeto) {
            return $http.post(servicio + "/mensajes", objeto);
        },
        consultaMensajes: function () {
            return $http.get(servicio + "/mensajes/");
        },
        consultaPalabras: function () {
            return $http.get(servicio + "/palabras/");
        },
        consultaFrases: function () {
            return $http.get(servicio + "/frases/");
        },
        consultaTipoPalabra: function (palabra) {
            return $http.get(servicio + "/palabras?palabra=" + palabra);
        },
    }
}]);