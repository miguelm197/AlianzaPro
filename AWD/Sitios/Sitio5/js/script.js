$(document).ready(function () {
    altura();



    $(window).resize(function () {
        altura();
    })



    $(window).scroll(function () {
        
    })

    function moverSlider(numSlider) {
        $('html, body').animate({
            scrollTop: $(".slider" + numSlider).offset().top
        }, 1000);
    }

    function altura() {
        var altura = $(window).height();
        $(".slider").height(altura);
    }
});