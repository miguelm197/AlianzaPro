app.factory("FacListaTareas", ["$http", function ($http) {
    return {
        consultaUsuarios: function () {
            return $http.get("http://localhost:3000/tareas");
        },
        consultaUsuarioEncargado: function (id) {
            return $http.get("http://localhost:3000/tareas/" + id);
        }

    }
}]);
