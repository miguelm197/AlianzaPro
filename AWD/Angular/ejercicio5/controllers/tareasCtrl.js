
app.controller("tareasCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.validacion = false;
    $scope.tarea = {};
    $scope.ediTarea = {};
    $scope.tareas = [
        {
            usuario: "Miguelo",
            contenido: "asdadasdasda",
            hecho: false,
            tachado: "sinTachar",
            correcto: true,
            editar: false
        }
    ];

    $scope.agregarTarea = function () {

        if ($scope.tarea.contenido == undefined || $scope.tarea.contenido == "") {
            $scope.validacion = false;
        } else {
            $scope.validacion = true;
        }

        if ($scope.validacion) {
            if ($scope.tarea.usuario == undefined) {
                $scope.tarea.usuario = "Sin usuario"
            }
            $scope.tarea.editar = false;
            $scope.tarea.hecho = false;
            $scope.tareas.push($scope.tarea);
            $scope.tarea = {};
        }

    }
    $scope.eliminarTarea = function (tar) {
        var indice = $scope.tareas.indexOf(tar);
        $scope.tareas.splice(indice, 1);
        var cantTareas = $scope.tareas.length;

        if (cantTareas == 0) {
            $scope.listaVacia = true;
        }
    }
    $scope.modificarTarea = function (tar) {
        tar.editar = true;
        $scope.ediTarea.usuario = tar.usuario;
        $scope.ediTarea.contenido = tar.contenido;
    }
    $scope.guardarTarea = function (tar, ediTarea) {
        if ($scope.ediTarea.contenido == "") {
            $scope.ediTarea.correcto = false;
        } else {
            $scope.ediTarea.correcto = true;
        }

        tar.editar = false;
        tar.usuario = ediTarea.usuario;
        tar.contenido = ediTarea.contenido;
        $scope.ediTarea = {};
    }
    $scope.cancelarGuardar = function (tar) {
        tar.editar = false;
        $scope.ediTarea = {};
    }
    $scope.limpiarScope = function () {
        delete $scope.tareas;
        $scope.tareas = [];
    }
    $scope.tacharTarea = function (tar) {
        if (tar.hecho) {
            tar.tachado = "tachado";
        } else {
            tar.tachado = "sinTachar";
        }
    }
    $scope.consulta = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/tvshows'
        }).then(function successCallback(response) {
            console.log("Success",response);
        }, function errorCallback(response) {
            console.log("Error Countries",response);
        });
    }

    $scope.alta = function (){
        var objeto = {
            "title": "SAPEEEEEE",
            "year": "2031",
            "country": "USA",
            "poster": "asfasfasgasidgjnsdgi",
            "seasons": "4",
            "genre": "Drama",
            "summary": "asoifjaosifjasoifjaoisfjaoijsfojasf"
        }
        $http.post("http://localhost:3000/tvshows/", objeto)
        .then(function(respuesta){
             console.log(respuesta);
        });
    }
}]);
