app.factory("FacTareas", ["$http", "$q", function ($http, $q) {
    return {
        traerTareas: function () {
            var deferred = $q.defer();
            $http.get("http://localhost:3000/tareas").then(function (response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },



        agregarTarea: function (usuario, contenido) {
            var objeto = {
                "usuario": usuario,
                "contenido": contenido,
                "hecho": "false"
            }
            $http.post("http://localhost:3000/tareas/", objeto)
                .then(function (respuesta) {
                    return respuesta;
                });
        },



        eliminarTarea: function (idTarea) {
            var url = "http://localhost:3000/tareas/" + idTarea;
            console.log(url)
            $http.delete(url)
                .then(function (respuesta) {
                    return respuesta;
                });
        }

    }
}]);