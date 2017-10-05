app.controller("todoController",["$scope",function($scope){
    //Inicializar las variables desde el controlador
    $scope.nuevaMemoria = {};
    $scope.memorias = [
        {
            texto: "Primer memoria",
            autor: "default value",
            isEditing: false
        },
        {
            texto: "Segundo memoria",
            autor: "default value",
            isEditing: false
        }
    ];
    $scope.nuevaMemoria.autor = "Nombre de Autor";
    $scope.isSendit=false;
    //Definir funciones que se ejecutan por eventos de disparo del cliente
    $scope.agregarMemoria = function(){
            $scope.nuevaMemoria.isEditing = false;
            $scope.memorias.push($scope.nuevaMemoria);
            $scope.nuevaMemoria = {};
            $scope.nuevaMemoria.autor = "...";
            $scope.nuevaMemoria.isEditing = false;  
            $scope.isSendit=false;                  
    }
    $scope.borrarMemoria = function(memoria){
        var index = $scope.memorias.indexOf(memoria);
        $scope.memorias.splice(index, 1);
        $scope.isSendit=false;
    }
    $scope.showEdit = function(memoria){
        memoria.texto="";
        memoria.isEditing = true;
        $scope.isSendit=false;
    }
    $scope.editarMemoria = function(memoria){
        memoria.isEditing = false;
        $scope.isSendit=false;
    }
    $scope.sendToServer = function(){
        $scope.isSendit=true;
    }
}]);
        