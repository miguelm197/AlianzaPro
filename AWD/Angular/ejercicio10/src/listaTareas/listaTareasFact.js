app.factory("FacListaTareas", ["$http", function ($http) {
    return {
        consultaTareas: function () {
            return $http.get("http://localhost:3000/tareas");
        },
        consultaTareaId: function (id) {
            return $http.get("http://localhost:3000/tareas/" + id);
        }

    }
}]);
