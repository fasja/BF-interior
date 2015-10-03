$(document).ready(function () {
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false
    });
    $('.popup-ajax').magnificPopup({
        type: 'ajax',
        //mainClass: 'mfp-fade',
        alignTop: true,
        overflowY: 'scroll'
    });

    var initialOpacity = parseFloat(
        $('.background > .background__overlay').css('background-color').split(',')[3], 10
    );

    var myMap;
    ymaps.ready(init);
    function init () {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMap = new ymaps.Map('map', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [55.821, 37.611], // Москва
            zoom: 11,
            controls: []
        });
        myMap.behaviors.disable('scrollZoom');
        var zoomControl = new ymaps.control.ZoomControl({
            options: {
                size: "small"
            }
        });
        myMap.controls.add(zoomControl);
        myMap.geoObjects
            .add(new ymaps.Placemark([55.906, 37.576], {
                balloonContent: 'Абрамцевская улица, 30'
            }, {preset: 'islands#dotIcon',
                iconColor: 'red'
            }))
            .add(new ymaps.Placemark([55.814, 37.693], {
                balloonContent: 'Краснобогатырская улица, 2'
            }, {preset: 'islands#dotIcon',
                iconColor: 'red'
            }))
            .add(new ymaps.Placemark([55.807, 37.649], {
                balloonContent: 'Новоалексеевская улица, 16'
            }, {preset: 'islands#dotIcon',
                iconColor: 'red'
            }))
            .add(new ymaps.Placemark([55.721, 37.695], {
                balloonContent: 'Волгоградский проспект, 32'
            }, {preset: 'islands#dotIcon',
                iconColor: 'red'
            }));
        myMap.events.add('actionend', function(e){
            console.log(myMap.getCenter());
        });

    }
    $(window).scroll(function (event) {
        if ($(window).scrollTop() > 0) {
            $(".start-screen__bouncing-arrow").fadeOut();
            //console.log("scrolled");
        }
        if ($(window).scrollTop() == 0) {
            $(".start-screen__bouncing-arrow").fadeIn();
            //console.log("scrolled to top");
        }

        if (($(window).scrollTop() > 0)) {
            var ratioForBackground = initialOpacity + ((1 - initialOpacity) * ($(window).scrollTop()/(($(".start-screen")).height() + $(".quality").height())));
            //console.log(0.7 + 0.3 * ratioForBackground);
            //var ratioForBackground = 0.7 + ( 0.3 * ($(window).scrollTop()/(($(".start-screen")).height() + $(".quality").height())));
            if (ratioForBackground < 1) {
                $(".background__overlay").css("background-color", "rgba(0,0,0," + ratioForBackground + ")");
            }
            else {
                $(".background__overlay").css("background-color", "rgba(0,0,0,1)");
            }

        }

        if (($(window).scrollTop() > 0)) {
            //console.log($(window).scrollTop()/(($(".start-screen")).height() + $(".quality").height()));
            var ratioForNavbar = 4 * $(window).scrollTop()/($(window).height());
            if (ratioForNavbar < 1) {
                $(".navbar__menu").css("background-color", "rgba(0,0,0," + ratioForNavbar + ")");
            }
            else {
                $(".navbar__menu").css("background-color", "rgba(0,0,0,1)");
            }
        }

        if ($(window).scrollTop() == 0) {
            $(".navbar__menu").css("background-color", "rgba(0,0,0,0)");
            $(".background__overlay").css("background-color", "rgba(0,0,0," + initialOpacity + ")");
        }
    });
    $("#gallery-scroll-activator").click(function() {
        $('html, body').animate({
            scrollTop: $("#gallery-scroll-anchor").offset().top - 100
        }, 1000);
    });
    $("#contact-scroll-activator").click(function() {
        $('html, body').animate({
            scrollTop: $("#contact-scroll-anchor").offset().top - 100
        }, 1000);
    });

    $(".button").click(function send(){
        $.post(
            "./mail.php",
            {
                name: $('.name').val(),
                phone: $('.phone').val(),
                email: $('.email').val()
            }
        );
        //alert('Имя: ' + name + '\n' + 'Почта: ' + email + '\n' + 'Телефон: ' + phone );
        alert("Ваша заявка получена. Мы скоро свяжемся с вами.");
        $('.name').val('');
        $('.email').val('');
        $('.phone').val('');
        $.magnificPopup.close();
    });
});