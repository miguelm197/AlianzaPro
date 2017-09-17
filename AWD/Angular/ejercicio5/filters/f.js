app.filter('f', function () {

    return function (input) {
        var salida = "";
        var letra = "";
        for (var i = 0; i < input.length; i++) {
            letra = input[i];

            if (i == 0 || i == input.length - 1) {
                letra = input[i].toUpperCase();
            }
            salida += letra;
        }
        return salida;
    }
});