$(document).ready(function () {

    $('.carousel').carousel({
        interval: 2000
    })


    function alerta(tipo, titulo, texto) {
        var item = "<alert tipo='" + tipo + "' titulo='" + titulo + "' texto='" + texto + "'></alert>"
        $("body").append(item)
    }
});