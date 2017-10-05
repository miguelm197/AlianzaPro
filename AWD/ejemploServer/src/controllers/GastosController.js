app.controller("gastosController",["$scope","GastosService",function($scope,GastosService){
    /*Gastos*/
    $scope.gastosS={};
    $scope.gastoModelS={};
    $scope.gastosSOptions= GastosService.darmeOpcionesDeGastosService();
    //$scope.gastosS= GastosService.darmeGastosService();
    $scope.selected = {};
    //Obtengo de la BD
    GastosService.dbGetGastos().then(function(response){
        $scope.gastosS = response.data;
    });

    $scope.agregarGasto = function(){
        var modal = $scope.gastoModelS;
        //  modal.id =  se encarga la api
        GastosService.dbPostGasto(modal).then(function(response){
            $scope.gastosS.push(response.data);
        });
    }
    $scope.oneSelected = function(modalSelected){
        modalSelected.selected = true;
    }
    $scope.borrarGasto = function(index,modalSelected){
        GastosService.dbDeleteGasto(modalSelected).then(function(response){
            $scope.gastosS.splice(index,1);
            modalSelected.selected = false;
        });
    }
    $scope.editarGasto = function(modalSelected){
        GastosService.dbPutGasto(modalSelected).then(function(response){
            modalSelected.selected = false;
        });
    }

}]);