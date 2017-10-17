app.controller("listaTareasCtrl", ["$scope", "FacListaTareas", function ($scope, FacListaTareas) {
    $scope.listaTareas = [];

    $scope.datos = {
        configuracion:{
         
        },
        datos:[]
    };



    FacListaTareas.consultaUsuarios().then(function (data) {
        var resultado = [];
        data = data.data;
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            FacListaTareas.consultaUsuarioEncargado(id).then(function (res) {
                var data = res.data;
                var usuarioEncargado = data.usuarioEncargado;
                var tarea = {
                    id: data.id,
                    estado: data.estado,
                    resumen: data.resumen,
                    asignado: usuarioEncargado,
                    creada: formatoFecha(data.fechaCreado),
                    enlace: function () { return "listaTareas/" + id }
                }
                $scope.datos.datos.push(tarea);
            });
        }
    });

    function formatoFecha(fecha) {
        var fech = new Date(fecha);
        var dia = fech.getDate();
        var mes = fech.getMonth();
        var ani = fech.getFullYear();

        if (dia < 10) {
            dia = "0" + dia;
        }
        if (mes < 10) {
            mes = "0" + mes;
        }

        var fechaSalida = dia + "/" + mes + "/" + ani;
        return fechaSalida;
    }
}]);