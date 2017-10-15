app.factory("FacRegistro", ["$http", function ($http) {
    return {
        agregarUsuario: function (objeto) {
            return $http.post("http://localhost:3000/usuarios", objeto);
        },
        existenciaCorreo: function (correo) {
            return $http.get("http://localhost:3000/usuarios/?correo=" + correo);
        }
    }
}]);