app.controller("usuariosController",["$scope","UsuarioService",function($scope,UsuarioService){
    /*Usuarios*/
    $scope.usuarioS={};
    $scope.usuarioModelS={};
    $scope.selected = {};
    //Obtengo de la BD
    UsuarioService.dbGetUsuarios().then(function(response){
        $scope.usuarioS = response;
    });

    $scope.agregarUsuario = function(){
        var modal = $scope.usuarioModelS;
        //  modal.id =  se encarga la api
        UsuarioService.dbPostUsuario(modal).then(function(response){
            $scope.usuarioS.push(response);
        });
    }
    $scope.oneSelected = function(modalSelected){
        modalSelected.selected = true;
    }
    $scope.borrarUsuario = function(index,modalSelected){
        UsuarioService.dbDeleteUsuario(modalSelected).then(function(response){
            $scope.usuarioS.splice(index,1);
            modalSelected.selected = false;
        });
    }
    $scope.editarUsuario = function(modalSelected){
        UsuarioService.dbPutUsuario(modalSelected).then(function(response){
            modalSelected.selected = false;
        });
    }

}]);