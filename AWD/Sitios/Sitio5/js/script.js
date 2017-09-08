$(document).ready(function () {
    altura();



    $(window).resize(function () {
        altura();
    })

    function altura() {
        var altura = $(window).height();
        $(".slider").height(altura);
    }
});