var puerto = "3000";
app.factory("FacTareas", ["$http", "$q", function ($http, $q) {
    return {

        // traerTareas: function () {
        //     return $http({ method: 'GET', url: 'http://localhost:3000/tareas' });
        // },


        traerTareas: function () {
            var deferred = $q.defer();
            $http.get("http://localhost:3000/tareas").then(function (response) {
                deferred.resolve(response.data);
            }, function errorCallbak(response) {
                deferred.reject(response);
            }
            );

            return deferred.promise;
        },

        agregarTarea: function (objeto) {

            return $http.post("http://localhost:3000/tareas", objeto);
        },


        eliminarTarea: function (idTarea) {
            return $http.delete("http://localhost:3000/tareas/" + idTarea);
        },


        actualizarTarea: function (idTarea, objeto) {
            return $http.put("http://localhost:3000/tareas/" + idTarea, objeto);
        }

    }
}]);