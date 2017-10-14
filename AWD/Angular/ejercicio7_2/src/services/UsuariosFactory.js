//ASYNCRONICO
app.factory('UsuarioService',["$http","$q",function($http,$q){
    return{
        dbGetUsuarios: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: 'http://localhost:3000/usuarios'}).then(function (response) {
                //success
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                    deferred.reject(response); 
                  }
              );
            return  deferred.promise;
        },
        dbPostUsuario: function(nuevoUsuario){
            var deferred = $q.defer();
            $http.post("http://localhost:3000/usuarios",nuevoUsuario).then(function (response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                    deferred.reject(response); 
                  }
              );
            return  deferred.promise;
        },
        dbDeleteUsuario: function(deletedUsuario){
            var deferred = $q.defer();
            $http.delete("http://localhost:3000/usuarios/"+deletedUsuario.id).then(function (response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                    deferred.reject(response); 
                  }
              );
            return  deferred.promise;
        },
        dbPutUsuario: function(editedUsuario){
            var deferred = $q.defer();
            $http.put("http://localhost:3000/usuarios/"+editedUsuario.id,editedUsuario).then(function (response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                    deferred.reject(response); 
                  }
              );
            return  deferred.promise;;
        }
    }
}]);