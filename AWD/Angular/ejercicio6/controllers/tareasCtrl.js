
app.controller("tareasCtrl", ['$scope', '$http', 'FacTareas', function ($scope, $http, FacTareas) {
    $scope.validacion = false;
    $scope.tarea = {};
    $scope.ediTarea = {};
    $scope.tareas = [];
    
    console.log(FacTareas.traerTareas())

    // FacTareas.traerTareas().then(function (data) {

    //         console.log("----------------------")
    //         console.log(data)

    //         var arrayTareas = [];
    //         for (var t = 0; t < data.length; t++) {

    //             var tarea = {
    //                 id: data[t]._id,
    //                 usuario: data[t].usuario,
    //                 contenido: data[t].contenido,
    //                 hecho: data[t].hecho,
    //                 correcto: true,
    //                 editar: false
    //             }
    //             if (tarea.hecho) tarea.tachado = "tachado"
    //             else tarea.tachado = "sinTachar"
    //             console.log(tarea)
    //             arrayTareas.push(tarea);
    //         }
    //         $scope.tareas = arrayTareas;
    // });



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
            FacTareas.agregarTarea($scope.tarea.usuario, $scope.tarea.contenido);
            $scope.tarea = {};
        }
    }
    $scope.eliminarTarea = function (tar) {
        FacTareas.eliminarTarea(tar.id).then(function (res) {

            var indice = $scope.tareas.indexOf(tar);
            debugger;
            $scope.tareas.splice(indice, 1);
            var cantTareas = $scope.tareas.length;

            if (cantTareas == 0) {
                $scope.listaVacia = true;
            }
        });

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
        FacTareas.actualizarTarea(tar.id, tar.usuario, tar.contenido, tar.hecho);
        $scope.ediTarea = {};
        setTimeout($scope.consulta, 500);
    }
    $scope.cancelarGuardar = function (tar) {
        tar.editar = false;
        $scope.ediTarea = {};
    }
    $scope.limpiarScope = function () {
        $scope.tareas.length = 0;
    }
    $scope.tacharTarea = function (tar) {
        if (tar.hecho) {
            tar.tachado = "tachado";
        } else {
            tar.tachado = "sinTachar";
        }

        FacTareas.actualizarTarea(tar.id, tar.usuario, tar.contenido, tar.hecho);
    }
    $scope.consulta = function () {
        $scope.tareas.length = 0;

    }

    $scope.alta = function () {

    }
}]);
