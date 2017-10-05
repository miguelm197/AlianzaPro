app.controller("productosController",["$scope","ProductoService",function($scope,ProductoService){
    /*Productos*/
    $scope.productoS={};
    $scope.productoModelS={};
    $scope.selected = {};
    //Obtengo de la BD
    ProductoService.dbGetProductos().then(function(response){
        $scope.productoS = response.data;
    });

    $scope.agregarProducto = function(){
        var modal = $scope.productoModelS;
        //  modal.id =  se encarga la api
        ProductoService.dbPostProducto(modal).then(function(response){
            $scope.productoS.push(response.data);
        });
    }
    $scope.oneSelected = function(modalSelected){
        modalSelected.selected = true;
    }
    $scope.borrarProducto = function(index,modalSelected){
        ProductoService.dbDeleteProducto(modalSelected).then(function(response){
            $scope.productoS.splice(index,1);
            modalSelected.selected = false;
        });
    }
    $scope.editarProducto = function(modalSelected){
        ProductoService.dbPutProducto(modalSelected).then(function(response){
            modalSelected.selected = false;
        });
    }

}]);