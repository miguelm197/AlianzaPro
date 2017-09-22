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

            // $http.get("http://localhost:3000/tareas").then(function (respuesta) {
            //     console.log(respuesta.data)
            //     return respuesta.data;
            // })


            // $http({
            //     method: "GET",
            //     url: "http://localhost:3000/tareas"
            // }).then(function sape(respuesta) {
            //     return respuesta.data;
            // }, function error(respuesta) {
            //     return respuesta.data;
            // })
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
        },



        actualizarTarea: function (idTarea, usuario, contenido, hecho) {
            var objeto = {
                "usuario": usuario,
                "contenido": contenido,
                "hecho": hecho
            }
            $http.put("http://localhost:3000/tareas/" + idTarea, objeto)
                .then(function (respuesta) {
                    return respuesta;
                });
        }

    }
}]);