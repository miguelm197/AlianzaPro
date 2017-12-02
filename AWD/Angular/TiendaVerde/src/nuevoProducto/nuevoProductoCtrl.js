app.controller("nuevoProductoCtrl", ["$scope", "$location", 'FactProductos', "Upload", "$rootScope", function ($scope, $location, FactProductos, Upload, $rootScope) {
    $scope.categoria = "Categoría"
    $scope.nuevaImagen = "";
    $scope.agregarProducto = function () {
        var producto = $scope.producto;
        producto.categoria = $scope.categoria;
        producto.imagen = $scope.nuevaImagen;

        console.log(producto);

        FactProductos.agregarProducto(producto).then(function () {

            $rootScope.alerta.mensaje("alerta", "Nuevo producto", "Se agregó el producto correctamente")
        })
    }

    function imagen64(archivo) {
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: archivo
            }
        }).then(function (resp) {
            Upload.base64DataUrl(archivo).then(function (urls) {
                img = urls[0];
                $scope.nuevaImagen = img;
            });
        });
    }


    // OBSERVACION IMAGEN 
    $scope.$watch('imagen', function () {
        try {
            if ($scope.imagen != null) {
                imagen64($scope.imagen);
            }
        } catch (error) { }
    });






}]);