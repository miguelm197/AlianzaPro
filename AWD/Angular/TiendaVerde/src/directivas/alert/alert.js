app.directive('alert', [function () {
    return {
        templateUrl: './src/directivas/alert/alert.html',
        restrict: 'E',
        scope: {
        },
        link: function (scope, element) {
            scope.pie = true;

            scope.clasesCaja = {
                mostrarCaja: true,
                ocultarCaja: false
            }
            scope.clasesFondo = {
                mostrarFondo: true,
                ocultarFondo: false
            }
            scope.clasesPanel = {
                mostrarPanel: true,
                ocultarPanel: false
            }


            scope.$watch(
                function () { return scope.$root.alerta.mostrar; }, function () {
                    scope.alerta = scope.$root.alerta;
                    if (scope.alerta.mostrar) {
                        scope.abrir();
                    } else {
                        scope.cerrar();
                    }
                });


            scope.abrir = function () {
                scope.clasesCaja.mostrarCaja = true;
                scope.clasesCaja.ocultarCaja = false;
                scope.clasesFondo.mostrarFondo = true;
                scope.clasesFondo.ocultarFondo = false;
                scope.clasesPanel.mostrarPanel = true;
                scope.clasesPanel.ocultarPanel = false;


                if (scope.alerta.tipo == "alerta") {
                    scope.pie = false;
                }


            }
            scope.cerrar = function () {
                scope.clasesCaja.mostrarCaja = false;
                scope.clasesCaja.ocultarCaja = true;
                scope.clasesFondo.mostrarFondo = false;
                scope.clasesFondo.ocultarFondo = true;
                scope.clasesPanel.mostrarPanel = false;
                scope.clasesPanel.ocultarPanel = true;

                scope.$root.alerta.mostrar = false;
                console.log("cerrando")
            }

            scope.cajita = function () {
                console.log("cajita")
            }
        }

    }
}]);