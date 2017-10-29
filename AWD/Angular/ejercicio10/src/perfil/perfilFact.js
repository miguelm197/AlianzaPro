app.factory("FacPerfil", ["$http", function ($http) {
    return {

        obtenerUsuarioPorCorreo: function (correo) {
            return $http.get("http://localhost:3000/usuarios?correo=" + correo);
        },
        editarUsuario: function (id, usuario) {
            return $http.put("http://localhost:3000/usuarios/" + id, usuario);
        }
    }
}]);
