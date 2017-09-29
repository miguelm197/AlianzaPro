app.factory("FacMatriculas", ["$http", "$q", function ($http, $q) {
    return {


        consultaMatriculas: function () {
            var deferred = $q.defer();
            $http.get("http://localhost:3000/accesos").then(function (response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },


        ingresoVehiculo: function (matricula) {
            var url = "http://localhost:3000/accesos/" + matricula;
            $http.post(url)
                .then(function (respuesta) {
                    return respuesta;
                });
        },

        salidaVehiculo: function (matricula) {
            var url = "http://localhost:3000/accesos/" + matricula;
            $http.put(url)
                .then(function (respuesta) {
                    return respuesta;
                });
        },

        obtenerIdAccesoPorMatricula: function (matricula) {
            var deferred = $q.defer();
            $http.get("http://localhost:3000/" + matricula).then(function (response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

    }
}]);