app.controller("parametrosCtrl", ["$scope", "FacParametros", "Upload", "$timeout", "$location", "$rootScope", function ($scope, FacParametros, Upload, $timeout, $location, $rootScope) {
    $scope.imagenes = {
        logo: "",
        icono: "",
        slide1: "",
        slide2: "",
        slide3: ""
    }
    $scope.editar = {
        nombre: false,
        direccion: false,
        telefono: false,
        titulo: false,
        logo: false,
        icono: false,
        slide1: false,
        slide2: false,
        slide3: false
    }
    $scope.imgProcesadas = {
        logo: false,
        icono: false,
        slide1: false,
        slide2: false,
        slide3: true
    };
    $scope.slides = {
        slide1: { btndisabled: false },
        slide2: { btndisabled: false },
        slide3: { btndisabled: false }
    }
    // OBSERVACION LOGO
    $scope.$watch('sistema.logo', function () {
        $scope.imgProcesadas.logo = false;
        if ($scope.editar) {
            try {
                if ($scope.sistema.logo[0] != null)
                    imagen64("logo", $scope.sistema.logo);
            } catch (error) { }
        }
    });

    // OBSERVACION ICONO
    $scope.$watch('sistema.icono', function () {
        $scope.imgProcesadas.icono = false;

        try {
            if ($scope.sistema.icono != null)
                imagen64("icono", $scope.sistema.icono);
        } catch (error) { }
    });

    // OBSERVACION SLIDE 1
    $scope.$watch('sistema.slide1', function () {
        try {
            if ($scope.sistema.slide1 != null) {
                $scope.imgProcesadas.slide1 = true;
                $scope.slides.slide1.btndisabled = true;
                imagen64("slide1", $scope.sistema.slide1);
            }
        } catch (error) { }
    });

    // OBSERVACION SLIDE 2
    $scope.$watch('sistema.slide2', function () {
        try {
            if ($scope.sistema.slide2 != null) {
                $scope.imgProcesadas.slide2 = true;
                $scope.slides.slide2.btndisabled = true;
                imagen64("slide2", $scope.sistema.slide2);
            }
        } catch (error) { }
    });

    // OBSERVACION SLIDE 3
    $scope.$watch('sistema.slide3', function () {
        try {
            if ($scope.sistema.slide3 != null) {
                $scope.imgProcesadas.slide3 = true;
                $scope.slides.slide3.btndisabled = true;
                imagen64("slide3", $scope.sistema.slide3);
            }
        } catch (error) { }
    });


    function imagen64(variable, archivo) {
        Upload.base64DataUrl(archivo).then(function (urls) {
            img = urls[0];
            $scope.imagenes[variable] = img;
            $scope.imgProcesadas[variable] = false;
            $scope.slides[variable].btndisabled = false;
        });
    }





    $scope.guardarnombre = function () {
        var nombre = $scope.sistema.nombre;
        var objeto = $scope.parametros;
        objeto.nombre = nombre;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó el nombre correctamente");

            $scope.editar.nombre = false;
        })
    }



    $scope.guardarDireccion = function () {
        var direccion = $scope.sistema.direccion;
        var objeto = $scope.parametros;
        objeto.direccion = direccion;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó la dirección correctamente");
            
            $scope.editar.direccion = false;
        })
    }


    $scope.guardarTelefono = function () {
        var telefono = $scope.sistema.telefono;
        var objeto = $scope.parametros;
        objeto.telefono = telefono;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó el teléfono correctamente");
            
            $scope.editar.telefono = false;
        })
    }



    $scope.guardarTitulo = function () {
        var titulo = $scope.sistema.titulo;
        var objeto = $scope.parametros;
        objeto.titulo = titulo;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó el título correctamente");
            
            $scope.editar.titulo = false;
        })
    }

    $scope.guardarLogo = function () {
        var logo = $scope.imagenes.logo;
        var objeto = $scope.parametros;
        objeto.logo = logo;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó el logo correctamente");
            
            $scope.editar.logo = false;
        })
    }

    $scope.guardarIcono = function () {
        var icono = $scope.imagenes.icono;
        var objeto = $scope.parametros;
        objeto.icono = icono;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó el ícono correctamente");
            
            $scope.editar.icono = false;
        })
    }
    $scope.guardarSlide1 = function () {
        var slide1 = $scope.imagenes.slide1;
        var objeto = $scope.parametros;
        objeto.slide1 = slide1;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó el slide correctamente");
            
            $scope.editar.slide1 = false;
        })
    }
    $scope.guardarSlide2 = function () {
        var slide2 = $scope.imagenes.slide2;
        var objeto = $scope.parametros;
        objeto.slide2 = slide2;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó el slide correctamente");
            
            $scope.editar.slide2 = false;
        })
    }
    $scope.guardarSlide3 = function () {
        var slide3 = $scope.imagenes.slide3;
        var objeto = $scope.parametros;
        objeto.slide3 = slide3;
        FacParametros.guardarParametros(objeto).then(function () {
            $rootScope.alerta.mensaje("alerta", "Parámetros", "Se actualizó el slide correctamente");
            
            $scope.editar.slide3 = false;
        })
    }

    FacParametros.consultaParametros().then(function (res) {
        var parametros = res.data[0];
        $scope.parametros = parametros;
    });


}]);

