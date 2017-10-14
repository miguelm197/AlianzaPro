app.factory("FacRegistro", ["$http", function ($http) {
    return {
        agregarUsuario: function (objeto) {
            return $http.post("http://localhost:3000/usuarios", objeto);
        }
    }
}]);