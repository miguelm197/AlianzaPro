app.controller("listaUsuariosCtrl", ["$scope", "FacUsuarios", "FacUsuario", "$rootScope", function ($scope, FacUsuarios, FacUsuario, $rootScope) {
    $scope.listaUsuarios = [];

    $scope.datos = {
        configuracion: {
        },
        datos: []
    };

    $scope.cargarTabla = function () {
        $scope.datos.datos = [];
        FacUsuarios.consultaUsuarios().then(function (data) {
            var resultado = [];
            data = data.data;
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                data[i]["ver"] = "/#!/usuario/" + id;
                $scope.datos.datos.push(data[i])
            }
        });
    }

    $scope.cargarTabla();


    $scope.bloquear = function (id) {
        FacUsuario.consultaUsuarioPorId(id).then(function (res) {
            var usuario = res.data;
            var bloqueado = usuario.bloqueado;

            if (bloqueado) {
                usuario.bloqueado = false;
                FacUsuario.guardarUsuarioId(id, usuario).then(function () {
                    $scope.cargarTabla();
                    $rootScope.alerta.mensaje("alerta", "Usuario", "Se desbloqueó el usuario correctamente");
                });
            } else {
                usuario.bloqueado = true;
                FacUsuario.guardarUsuarioId(id, usuario).then(function () {
                    $scope.cargarTabla();
                    $rootScope.alerta.mensaje("alerta", "Usuario", "Se bloqueó el usuario correctamente");
                });
            }
        });
    }

    $scope.eliminar = function (id) {
        $scope.miId = $rootScope.globals.currentUser.id;

        if (id != $scope.miId) {
            FacUsuario.eliminarUsuarioPorId(id).then(function () {
                $scope.cargarTabla();
                $rootScope.alerta.mensaje("alerta", "Usuario", "Se eliminó el usuario correctamente");
            });
        } else {
            $rootScope.alerta.mensaje("alerta", "Usuario", "No puede eliminar el usuario logueado");

        }

    }




}]);