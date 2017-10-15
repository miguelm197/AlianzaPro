app.factory("FacTareasCtrl", ["$http", function ($http) {
    return {
        consultaUsuarios: function () {
            return $http.get("http://localhost:3000/usuarios");
        },
        agregarTarea: function (objeto) {
            return $http.post("http://localhost:3000/tareas", objeto);
        }


    }
}]);