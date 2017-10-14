app.factory("FacLogin", ["$http", function ($http) {
    return {

        consultaUsuario: function (nombre) {
            return $http.get("http://localhost:3000/usuarios/?usuario=" + nombre);
        }

    }
}]);