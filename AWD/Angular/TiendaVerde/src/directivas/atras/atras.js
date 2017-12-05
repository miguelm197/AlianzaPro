app.directive('atras', function () {
    return {
        template: '<div ng-click="back()">Volver</div>',
        link: function (scope, element) {
            scope.back = function () {
                history.back();
            }
        }
    };
});