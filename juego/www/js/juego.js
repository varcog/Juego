//<editor-fold defaultstate="collapsed" desc="INIT">
var $ = jQuery;

jQuery(document).ready(function ($) {

    $(window).load(function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

});

// Setting up Video

var $ = jQuery;
var vidWidth = $(window).width(), vidHeight = $(window).height();

//$("#video-wrap").css({
//    'height': vidHeight
//});

$('#video').videoBG({
    mp4: 'assets/bg.mp4',
    ogv: 'assets/bg.ogv',
    webm: 'assets/bg.webm',
    poster: 'assets/poster.jpg',
//    scale: true,
    fullscreen: true,
    zIndex: -2
//    height: vidHeight
});

// Navbar fixing

$("#nav-menu").stick_in_parent();


// Calling Wow

new WOW().init();


// Count Down Timer

//$('.countdown').final_countdown({
//    start: 1360000000, //Here use Milisecond. To convert your time you can go to this(https://currentmillis.com/) website. 
//    end: 1390000000,
//    now: 1385000000,
//    seconds: {
//        borderColor: '#5677fc',
//        borderWidth: '3'
//    },
//    minutes: {
//        borderColor: '#7e57c2',
//        borderWidth: '3'
//    },
//    hours: {
//        borderColor: '#4db6ac',
//        borderWidth: '3'
//    },
//    days: {
//        borderColor: '#d81b60',
//        borderWidth: '3'
//    }}, function () {
//});


// rotating text

(function () {

    var quotes = $(".quotes");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
                .fadeIn(1000)
                .delay(1000)
                .fadeOut(1000, showNextQuote);
    }

    showNextQuote();

})();

// smooth mouse wheel
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="BASURERO">
var TIPO_GENERAL = 0;
var TIPO_ORGANICO = 1;
var TIPO_VIDRIO = 2;
var TIPO_PLASTICO = 3;
var TIPO_PAPEL = 4;
var TIPO_INFECCIOSO = 5;

var nivel, cantidad_niveles;


function drag_drop() {
    $(".draggable").draggable({
        cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document",
        helper: function (event) {
            var clone = $(this).clone(true);
            clone.width($(this).width());
            clone.height($(this).height());
            clone.removeClass("original");
            return clone;
        },
        start: function (event, ui) {
            $(this).css("opacity", "0");
        },
        stop: function (event, ui) {
            $(this).css("opacity", "1");
        },
        cursor: "move"
    });

    $(".droppable").droppable({
        accept: ".draggable",
        hoverClass: "droppable_hover",
        drop: function (event, ui) {
            var $this = $(this);
            if ($this.data("tipo") === ui.draggable.data("tipo")) {
                ui.draggable.css("visibility", "hidden");
                ui.draggable.data("ok", true);
                if (nivel === 1) {
                    switch ($this.data("tipo")) {
                        case TIPO_GENERAL:
                            $this.attr("src", "assets/basurero_letra_general.png");
                            break;
                        case TIPO_INFECCIOSO:
                            $this.attr("src", "assets/basurero_letra_infeccionso.png");
                            break;
                        case TIPO_ORGANICO:
                            $this.attr("src", "assets/basurero_letra_organico.png");
                            break;
                        case TIPO_PAPEL:
                            $this.attr("src", "assets/basurero_letra_papel.png");
                            break;
                        case TIPO_PLASTICO:
                            $this.attr("src", "assets/basurero_letra_plastico.png");
                            break;
                        case TIPO_VIDRIO:
                            $this.attr("src", "assets/basurero_letra_vidrio.png");
                            break;

                    }
                } else {
                    ui.draggable.css("display", "none");
                }
                if (finalizo_nivel()) {
                    next_nivel();
                }
            }
        }
    });
}

$(document).ready(function () {
    $(".basurero_amarillo, .residuo_plastico, #letra_plastico").data("tipo", TIPO_PLASTICO);
    $(".basurero_azul, .residuo_papel, #letra_papel").data("tipo", TIPO_PAPEL);
    $(".basurero_gris, .residuo_general, #letra_general").data("tipo", TIPO_GENERAL);
    $(".basurero_naranja, .residuo_organico, #letra_organico").data("tipo", TIPO_ORGANICO);
    $(".basurero_rojo, .residuo_infeccioso, #letra_infeccioso").data("tipo", TIPO_INFECCIOSO);
    $(".basurero_verde, .residuo_vidrio, #letra_vidrio").data("tipo", TIPO_VIDRIO);

    drag_drop();

    nivel = 1;
    cantidad_niveles = 5;
    cargar_nivel();
    $("#cerrar-btn").click(function () {
        location.href = "index.html";
    });
});

function cargar_nivel() {
    if (nivel === 1) {
        $(".lienzo").css("display", "none");
        $(".lienzo_n1").css("display", "");
        $(".letra").css({
            opacyti: 1,
            visibility: "",
            display: ""
        }).data("ok", false);
    } else {
        $(".lienzo_n1").css("display", "none");
        $(".lienzo").css("display", "");
        $(".n2, .n3, .n4, .n5").css({
            opacyti: 1,
            visibility: "",
            display: "none"
        }).data("ok", false);
        $(".n" + nivel).css({
            opacyti: 1,
            visibility: "",
            display: ""
        });
    }
}


function finalizo_nivel() {
    var fin = true;
    if (nivel === 1) {
        $(".letras .letra.original").each(function (i, res) {
            if (!$(res).data("ok")) {
                fin = false;
                return false;
            }
        });
    } else {
        $(".residuos .n" + nivel + ".original").each(function (i, res) {
            if (!$(res).data("ok")) {
                fin = false;
                return false;
            }
        });
    }
    return fin;
}

function next_nivel() {
    nivel++;
    if (nivel <= cantidad_niveles) {
        cargar_nivel();
    } else {
        $("#modalGanaste").modal("show");

    }
}