app.controller("tareaCtrl", ["$scope", "$location", "$rootScope", "FacTarea", function ($scope, $location, $rootScope, FacTarea) {
    $scope.comentarioEditado = {};
    $scope.tareaEditado = {};
    $scope.tarea = {};
    $scope.sinComentario = true;
    $scope.comEnEdicion = false;

    var url = $location.$$url;
    var id = url.split("/")[2];

    FacTarea.consultaTarea(id).then(
        function (res) {
            var datos = res.data;

            $scope.tarea = datos;
            $scope.tarea.fechaCreado = formatoFecha(datos.fechaCreado);

            FacTarea.consultaComentarios(id).then(function (res) {
                var comentarios = res.data;
                console.log(comentarios)
                $scope.tarea.comentarios = comentarios;
                console.log(comentarios.length)
                if (comentarios.length > 0) {
                    $scope.sinComentario = false;
                } else {
                    $scope.sinComentario = true;
                }
            });
        }
    );

    $scope.agregarComentario = function () {
        var correo = $rootScope.$root.$root.globals.currentUser.correo;
        FacTarea.obtenerUsuarioPorCorreo(correo).then(function (res) {

            var comentario = {
                comentario: $scope.comentarioNuevo,
                fecha: formatoFecha(new Date()),
                hora: formatoHora(new Date())
            }

            var nombre = res.data[0].nombre;
            var apellido = res.data[0].apellido;
            comentario.usuario = nombre + " " + apellido;

            console.log("----------")
            console.log(comentario)
            FacTarea.agregarComentario(id, comentario).then(
                function (res) {
                    comentario.id = res.data.id;
                    comentario.tareaId = res.data.tareaId;
                    $scope.tarea.comentarios.push(comentario);
                    $scope.comentarioNuevo = "";
                    $scope.sinComentario = false;
                    $scope.editar = false;
                }
            )
        });
        console.log($scope.tarea)
    };

    $scope.eliminarComentario = function (comentario) {
        var idComentario = comentario.id;
        var comentarios = $scope.tarea.comentarios;

        FacTarea.eliminarComentario(idComentario).then(function () {
            for (var i = 0; i < comentarios.length; i++) {
                var idCom = comentarios[i].id;
                if (idComentario == idCom) {
                    $scope.tarea.comentarios.splice(i, 1);
                }
            }
        })
    };

    $scope.editarComentario = function (comentario) {
        var comentarios = $scope.tarea.comentarios;
        var idComentario = comentario.id;

        var comentarioEditado = $scope.comentarioEditado.comentario;

        var ncomentario = comentarioEditado;
        var nfecha = formatoFecha(new Date());
        var nhora = formatoHora(new Date());
        var nusuario = comentario.usuario;
        var ntareaId = comentario.tareaId;
        var nid = comentario.id;

        var comentarioNuevo = {
            comentario: ncomentario,
            fecha: nfecha,
            hora: nhora,
            usuario: nusuario,
            tareaId: ntareaId,
            id: nid
        }

        FacTarea.editarComentario(idComentario, comentarioNuevo).then(function () {

            for (var i = 0; i < comentarios.length; i++) {
                var idCom = comentarios[i].id
                if (idComentario == idCom) {


                    $scope.tarea.comentarios[i].comentario = ncomentario;
                    $scope.tarea.comentarios[i].fecha = nfecha
                    $scope.tarea.comentarios[i].hora = nhora
                    $scope.tarea.comentarios[i].editar = false
                    $scope.tarea.comEnEdicion = false;
                }
            }
        })







    };

}]);

