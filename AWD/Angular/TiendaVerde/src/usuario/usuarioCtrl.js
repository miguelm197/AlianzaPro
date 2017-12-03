app.controller("usuarioCtrl", ["$rootScope", "$scope", "$location", 'FacUsuario', 'md5', function ($rootScope, $scope, $location, FacUsuario, md5) {
    $scope.usuario = {}
    $scope.usuarioEdit = {}
    $scope.resClave = false;
    $scope.editar = false;
    $scope.rolSelected = "Rol";


    var url = $location.$$url;
    var id = url.split("/")[2];
    FacUsuario.consultaUsuarioPorId(id).then(function (res) {
        var usr = res.data;
        $scope.usuario = usr;
    });

    $scope.editarU = function () {
        if ($scope.editar) {
            $scope.editar = false;
        } else {
            $scope.usuarioEdit.nombre = $scope.usuario.nombre;
            $scope.usuarioEdit.apellido = $scope.usuario.apellido;
            $scope.usuarioEdit.correo = $scope.usuario.correo;
            $scope.usuarioEdit.rol = $scope.usuario.rol;
            $scope.usuarioEdit.direccion = $scope.usuario.direccion;
            $scope.rolSelected = $scope.usuarioEdit.rol;
            $scope.editar = true;
            $scope.reesClave = false;
        }
    }
    $scope.reestablecerClaveU = function () {
        if ($scope.reesClave) {
            $scope.reesClave = false;
        } else {
            $scope.reesClave = true;
        }
    }

    $scope.guardarClaveU = function () {

        var claveUno = $scope.claveRes.clUno;
        var claveDos = $scope.claveRes.clDos;

        if (claveUno == claveDos) {
            FacUsuario.consultaUsuarioPorId(id).then(function (res) {
                var usuario = res.data;
                var clave = claveUno;

                usuario.clave = md5.createHash(clave);
                FacUsuario.guardarUsuarioId(id, usuario).then(function () {
                    $scope.claveRes.clUno = "";
                    $scope.claveRes.clDos = "";
                    $scope.reesClave = false;
                    $rootScope.alerta.mensaje("alerta", "Usuario", "Se actualizó la clave del usuario correctamente");

                });
            });
        } else {
            $rootScope.alerta.mensaje("alerta", "Usuario", "Las contraseñas no son iguales");
        }
    }

    $scope.guardarU = function () {
        var rol = $scope.rolSelected;
        console.log(rol)
        if (rol == "Administrador") {
            rol = "admin";
        } else {
            rol = "public";
        }
        $scope.usuarioEdit.rol = rol;
        FacUsuario.consultaUsuarioPorId(id).then(function (res) {
            var usuario = res.data;

            usuario.nombre = $scope.usuarioEdit.nombre;
            usuario.apellido = $scope.usuarioEdit.apellido;
            usuario.correo = $scope.usuarioEdit.correo;
            usuario.rol = rol;
            usuario.direccion = $scope.usuarioEdit.direccion;


            if (usuario.nombre != "" && usuario.apellido != "" && usuario.correo != "") {
                FacUsuario.guardarUsuarioId(id, usuario).then(function () {
                    $rootScope.alerta.mensaje("alerta", "Usuario", "Se actualizó el usuario correctamente");
                    $scope.usuario = usuario;
                    $scope.editar = false;
                });
            } else {
                $rootScope.alerta.mensaje("alerta", "Usuario", "Revise los campos");
            }
        });
    }

    $scope.bloquearU = function () {
        FacUsuario.consultaUsuarioPorId(id).then(function (res) {
            var usuario = res.data;
            var bloqueado = usuario.bloqueado;

            if (bloqueado) {
                usuario.bloqueado = false;
                FacUsuario.guardarUsuarioId(id, usuario).then(function () {
                    $scope.usuario.bloqueado = false;
                    $rootScope.alerta.mensaje("alerta", "Usuario", "Se desbloqueó el usuario correctamente");
                });
            } else {
                usuario.bloqueado = true;
                FacUsuario.guardarUsuarioId(id, usuario).then(function () {
                    $scope.usuario.bloqueado = true;
                    $rootScope.alerta.mensaje("alerta", "Usuario", "Se bloqueó el usuario correctamente");
                });
            }
        });
    }

    $scope.eliminarU = function () {
        FacUsuario.consultaUsuarioPorId(id).then(function (res) {
            var usuario = res.data;
            var activo = usuario.activo;

            if (activo) {
                usuario.activo = false;
                FacUsuario.guardarUsuarioId(id, usuario).then(function () {
                    $scope.usuario.activo = false;
                    $rootScope.alerta.mensaje("alerta", "Usuario", "Se eliminó el usuario correctamente");
                });
            } else {
                usuario.activo = true;
                FacUsuario.guardarUsuarioId(id, usuario).then(function () {
                    $scope.usuario.activo = true;
                    $rootScope.alerta.mensaje("alerta", "Usuario", "Se actualizó el usuario correctamente");
                });
            }
        });
    }
}]);