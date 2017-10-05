app.factory('ProductoService',["$http",function($http){
    return{
        dbGetProductos: function(){
            return $http({method: 'GET', url: 'http://localhost:3000/productos'});
        },
        dbPostProducto: function(nuevoProducto){
            return $http.post("http://localhost:3000/productos",nuevoProducto);
        },
        dbDeleteProducto: function(deletedProducto){
            return $http.delete("http://localhost:3000/productos/"+deletedProducto.id);
        }, 
        dbPutProducto: function(editedProducto){
            return $http.put("http://localhost:3000/productos/"+editedProducto.id,editedProducto);
        }
    }
}]);