app.controller("productoCtrl", ["$scope", "$location", 'FacProducto', '$rootScope', 'Upload', '$rootScope', function ($scope, $location, FacProducto, $rooteScope, Upload, $rootScope) {
    $scope.producto = {}
    $scope.cantidad = 20;
    $scope.editar = false;
    $scope.imagen = false;
    $scope.productoEditar = {
        "nutricional": {
            "calorias": 1,
            "proteinas": 2,
            "hidratos": 3,
            "grasas": 4
        }

    }


    var url = $location.$$url;
    var id = url.split("/")[2];

    FacProducto.consultaProductoPorId(id).then(function (res) {
        var prod = res.data;
        $scope.producto = prod;
        // $scope.editarProducto();

    });

    $scope.$watch('imagen', function () {
        if (!$scope.imagen == false) {
            Upload.base64DataUrl($scope.imagen).then(function (urls) {
                $scope.productoEditar.imagen = urls;
            });
        }
    });

    $scope.editarProducto = function () {
        $scope.editar = $scope.editar ? false : true;
        var prod = $scope.producto;
        $scope.productoEditar.nombre = prod.nombre;
        $scope.productoEditar.item = prod.item;
        $scope.productoEditar.precio = prod.precio;
        $scope.productoEditar.stock = prod.stock;
        $scope.productoEditar.subtitulo = prod.subtitulo;
        $scope.productoEditar.descripcion = prod.descripcion;
        $scope.productoEditar.categoria = prod.categoria;
        $scope.productoEditar.imagen = prod.imagen;
        $scope.productoEditar.id = prod.id;
        $scope.productoEditar.nutricional.calorias = prod.nutricional.calorias;
        $scope.productoEditar.nutricional.proteinas = prod.nutricional.proteinas;
        $scope.productoEditar.nutricional.hidratos = prod.nutricional.hidratos;
        $scope.productoEditar.nutricional.grasas = prod.nutricional.grasas;
        // $rooteScope.alerta.mensaje("mensaje","Productos","El producto se ha infegiojasoifjasoifajsgo")
    }

    $scope.cancelar = function () {
        $scope.editar = false;
    }
    $scope.guardarProducto = function () {
        var objeto = $scope.productoEditar;
        var id = objeto.id;

        var categoria = objeto.categoria;
        var item = objeto.item;







        FacProducto.guardarProductoPorId(id, objeto).then(function () {
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

            $rootScope.alerta.mensaje("alerta", "Producto", "Se actualizó el producto correctamente");
            $scope.producto = objeto;
            $scope.editar = false;
        });

    }




}]);