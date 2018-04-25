app.controller("chatCtrl", ["$scope", "chatFact", function ($scope, chatFact) {

    $scope.mensajes = [];
    $scope.palabras = [];
    $scope.frases = [];

    $scope.cargarMensajes = function () {
        chatFact.consultaMensajes().then(function (data) {
            var resultado = [];
            data = data.data;
            $scope.mensajes = data;
        })
    }

    $scope.cargarPalabras = function () {
        chatFact.consultaPalabras().then(function (data) {
            var resultado = [];
            data = data.data;
            $scope.palabras = data;
        })
    }

    $scope.cargarFrases = function () {
        chatFact.consultaFrases().then(function (data) {
            var resultado = [];
            data = data.data;
            $scope.frases = data;
        })
    }



    $scope.cargarMensajes();
    $scope.cargarPalabras();
    $scope.cargarFrases();


    //Función que se ejecuta al enviar un mensaje
    $scope.enviarMensaje = function () {
        var mens = $scope.msjUsuario;
        if (mens != "" && mens != " ") {
            $scope.msjUsuario = "";
            mostrarMensaje(mens, "yo");
            setTimeout(function () {
                calcularRespuesta(mens);
            }, 200)
        }
    }


    //Detecta el enter al escribir NO EJECUTA SI SE PRESIONA SHIFT Y ENTER
    $scope.pulsar = function (e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            $scope.enviarMensaje()
        }
    }

    function calcularRespuesta(mensaje) {
        var palabras = mensaje.split(" ");
        var tipos = []
        var respuesta = "";
        respuesta = buscarRespuesta(mensaje);
        console.log(respuesta)

        if (respuesta) {
            mostrarMensaje(respuesta, "otro");
        }

        for (var i = 0; i < palabras.length; i++) {
            var palabra = palabras[i];
            var tipo = tipoDePalabra(palabra);
        }


    }

    function buscarRespuesta(frase) {
        var fraseRes = false;
        for (var i = 0; i < $scope.frases.length; i++) {
            var fraseObj = $scope.frases[i];
            var fraseBd = fraseObj.frase;

            if (frase == fraseBd) {
                fraseRes = fraseObj;
                break;
            } else {
                for (var b = 0; b < fraseObj.opciones.length; b++) {
                    var opcion = fraseObj.opciones[b];
                    if (opcion == frase) {
                        fraseRes = fraseObj;
                        break;
                    }
                }
            }
        }

        if (fraseRes) {
            var ran = getEnteroRandom(0, fraseRes.respuestas.length - 1);
            var respuesta = fraseRes.respuestas[ran];
            return respuesta;
        }
    }


    function tipoDePalabra(palabra) {
        var tipo = false;
        for (var i = 0; i < $scope.palabras.length; i++) {
            var palabraObj = $scope.palabras[i];
            var palabraBd = palabraObj.palabra;

            if (palabra == palabraBd) {
                tipo = palabraObj.tipo;
                break;
            } else {
                for (var b = 0; b < palabraObj.opciones.length; b++) {
                    var opcion = palabraObj.opciones[b];
                    if (opcion == palabra) {
                        tipo = palabraObj.tipo;
                        break;
                    }
                }
            }
        }
        return tipo;
    }


    function palabraPorTipo(tipo) {
        for (var i = 0; i < $scope.palabras.length; i++) {
            var palabraObj = $scope.palabras[i];
            // console.log(palabra + " - " + palabraObj.palabra)

        }
    }


    function mostrarMensaje(mens, quien) {
        var msjObj = {
            mensaje: mens,
            pers: quien
        }

        $scope.mensajes.push(msjObj);

        // chatFact.agregarMensaje(msjObj)
    }

    function getEnteroRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}]);
