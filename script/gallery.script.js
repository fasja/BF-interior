function setGalleryHeight() {
    $(".work").css("height", $(".content").height() - $(".navbar__menu").height());
};

//ждем полной загрузки документа
$(document).ready(function () {
    $(".work").css("height", $(".content").height() - $(".navbar__menu").height());
    $(function () {
        //console.log($(".content").height() - $(".navbar__menu").height())
        $('.fotorama').fotorama(
            {
                fit: 'cover',
                nav: 'thumbs',
                loop: 'true',
                height: ($(".content").height() - $(".navbar__menu").height() - 64 - 4),
                thumbheight: '64',
                resize: 'true'
            }
        );
    });
    $('.fotorama').on('fotorama:ready', function (e, fotorama) {
        $('.work__description__navigation').css('height', 64 + 4 - 1);
        $('.work__description__navigation__counter__item').text(fotorama.activeIndex+1);
        $('.work__description__navigation__counter__total').text(fotorama.size);
        $('.previous').click(function() {
            fotorama.show('<')
        });
        $('.next').click(function() {
            fotorama.show('>')
        });
    });
    $('.fotorama').on('fotorama:show', function (e, fotorama) {
        console.log(fotorama.activeIndex+1 + " of " + fotorama.size);
        $('.work__description__navigation__counter__item').text(fotorama.activeIndex+1);
        $('.work__description__navigation__counter__total').text(fotorama.size);
    });

    //изменяем размеры контента при ресайзе окна
    var $fotoramaDiv = $('.fotorama').fotorama();
    $( window ).resize(function() {
        setGalleryHeight();
        var fotorama = $fotoramaDiv.data('fotorama');
        fotorama.resize({
            height: ($(".content").height() - $(".navbar__menu").height() - 64 - 4)
        });
    });
});