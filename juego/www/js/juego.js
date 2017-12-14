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

$("#video-wrap").css({
    'height': vidHeight
});

$('#video').videoBG({
    mp4: 'assets/bg.mp4',
    ogv: 'assets/bg.ogv',
    webm: 'assets/bg.webm',
    poster: 'assets/poster.jpg',
    scale: true,
    zIndex: 0,
    height: vidHeight
});

// Navbar fixing

$("#nav-menu").stick_in_parent()


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
var BASURERO_TIPO_GENERAL = 0;
var BASURERO_TIPO_ORGANICO = 1;
var BASURERO_TIPO_VIDRIO = 2;
var BASURERO_TIPO_PLASTICO = 3;
var BASURERO_TIPO_PAPEL = 4;
var BASURERO_TIPO_INFECCIOSO = 5;

function Basurero(x, y, t) {
    this.posicion = {
        x: x,
        y: y
    };
    this.tipo = t;
    this.imagen = new Image(); //imagen del muñeco
    this.imagen.src = "assets/basurero.png";
}

Basurero.prototype.paint = function (ctx) {
    ctx.drawImage(this.imagen, this.posicion.x, this.posicion.y);
};

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="LETRAS">
function Letra(x, y, t, ti) {
    this.posicion = {
        x: x,
        y: y
    };
    this.texto = t;
    this.mover = true;
    this.tipo = ti;
    this.basurero;
}

Letra.prototype.paint = function (ctx) {
    ctx.fillStyle = "black";
    ctx.strokeRect(this.posicion.x, this.posicion.y, 100, 50);
    ctx.font = "bold 12px arial";
    ctx.fillText("texto", this.posicion.x, this.posicion.y);
};
//</editor-fold>

var canvas, ctx;
function init() {
    //INICIALIZAR CANVAS
    canvas = document.getElementById("lienzo");
    ctx = canvas.getContext("2d");
    canvas.addEventListener('onmousedown', mousedown, false); //presiona
    canvas.addEventListener('onmousemove', mousemove, false); //mueve
    canvas.addEventListener('onmouseup', mouseup, false); // suelta
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var rel = 354 / 450;
    // INICIALIZAR BASUREROS
    var basureros = [];
    var xx, yy, bas;
    for (var i = 0; i < basureros.length; i++) {
        bas = new Basurero(10, 10, i);
        bas.paint(ctx);
        basureros.push(bas);
    }

    basureros.push(new Basurero(80, 10, BASURERO_TIPO_INFECCIOSO));
    basureros.push(new Basurero(10, 80, BASURERO_TIPO_ORGANICO));
    basureros.push(new Basurero(80, 80, BASURERO_TIPO_PAPEL));
    basureros.push(new Basurero(80, 80, BASURERO_TIPO_PLASTICO));
    basureros.push(new Basurero(80, 80, BASURERO_TIPO_VIDRIO));
    // PINTAR BASUREROS
    for (var i = 0; i < basureros.length; i++) {
        basureros[i].paint(ctx);
    }
    // INICIALIZAR LETRAS
    var letras = [];
    letras.push(new Letra(10, 10, "DESECHOS EN GENERAL"));
    letras.push(new Letra(10, 10, "ORGÁNICA"));
    letras.push(new Letra(10, 10, "ENVASES DE VIDRIO"));
    letras.push(new Letra(10, 10, "PLÁSTICOS Y ENVASES DE VIDRIO"));
    letras.push(new Letra(10, 10, "PAPEL"));
    letras.push(new Letra(10, 10, "HOSPITALARIOS INFECCIOSOS"));
}

function paint() {

}

function mousedown(e) {

}
function mousemove(e) {

}
function mouseup(e) {

}


