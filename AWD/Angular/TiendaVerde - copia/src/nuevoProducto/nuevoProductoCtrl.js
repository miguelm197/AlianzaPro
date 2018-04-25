app.controller("nuevoProductoCtrl", ["$scope", "$location", 'FactProductos', 'FacProducto', "Upload", "$rootScope", function ($scope, $location, FactProductos, FacProducto, Upload, $rootScope) {
    $scope.categoria = "Categoría"
    $scope.nuevaImagen = "";
    $scope.agregarProducto = function () {
        var producto = $scope.producto;
        producto.categoria = $scope.categoria;
        producto.imagen = $scope.nuevaImagen;

        FactProductos.agregarProducto(producto).then(function () {
            var categoria = producto.categoria;
            var item = producto.item;
            FacProducto.consultaItems(categoria).then(function (res) {
                var objetoCategoria = res.data[0];
                var items = objetoCategoria.menu;
                var idC = objetoCategoria.id;


                if (items.indexOf(item) == -1) {
                    objetoCategoria.menu.push(item);

                    FacProducto.agregarItem(idC, objetoCategoria).then(function () {
                        // $rootScope.alerta.mensaje("alerta", "Producto", "Se agregó un nuevo item");
                    });
                }
            });

            $rootScope.alerta.mensaje("alerta", "Nuevo producto", "Se agregó el producto correctamente");
        })
    }

    function imagen64(archivo) {
        Upload.base64DataUrl(archivo).then(function (urls) {
            img = urls[0];
            $scope.nuevaImagen = img;
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