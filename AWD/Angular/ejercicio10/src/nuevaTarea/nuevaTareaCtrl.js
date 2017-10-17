app.controller("nuevaTareaCtrl", ["$scope", "FacTareasCtrl", "FacLogin", function ($scope, FacTareasCtrl, FacLogin) {
    $scope.usuarioSeleccionado = "Usuario";
    $scope.listaUsuarios = [];


    FacTareasCtrl.consultaUsuarios().then(function (data) {
        data = data.data;
        for (var u = 0; u < data.length; u++) {
            var usuario = {
                id: data[u].id,
                nombre: data[u].nombre,
                apellido: data[u].apellido,
                correo: data[u].correo
            }
            $scope.listaUsuarios.push(usuario);
        }
    });

    $scope.seleccionado = function (usuario) {
        $scope.usuarioSeleccionado = usuario.nombre + " " + usuario.apellido;
    }

    $scope.agregarTarea = function () {
        var tarea = {
            estado:"Abierta",
            resumen: $scope.nuevaTarea.resumen,
            descripcion: $scope.nuevaTarea.resumen,
            usuarioEncargado: $scope.usuarioSeleccionado,
            fechaCreado: new Date()
        }
        if ($scope.usuarioSeleccionado == "Usuario") {
            tarea.usuarioEncargado = "Sin asignar";
        }
        FacTareasCtrl.agregarTarea(tarea).then(function (res) {
            var tareaAgregada = res.data;
            var id = tareaAgregada.id;
            var resumen = tareaAgregada.resumen;
            var val = res.xhrStatus;
            if (val == "complete") {
                // se agregó correctamente
                alertify.dialog('alert').set({ transition: 'flipx', message: id + ' | ' + resumen }).show();
                $(".ajs-header").text("Se creó la tarea");
            } else {
                // no se pudo agregar
                alertify.dialog('alert').set({ transition: 'flipx', message: 'No se pudo agregar la tarea' }).show();
                $(".ajs-header").text("Tareas");
            }
        });

    }
}]);