/**
 * Created by dmitry on 10.09.15.
 */
$(document).ready(function(){
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false
    });

    //$('#tabs').tab();
    $(".ad--t > .ad__content > .ad__content__text > b").click(function() {
        $('html, body').animate({
            scrollTop: $("#scroll-anchor").offset().top
        }, 1000);
    });
    $(".payment__method > a").click(function() {
        if ( !($(this).find('img').hasClass('rotate'))) {
            $(this).find("img").addClass("rotate");
        }
        else {
            $(this).find('img').removeClass('rotate');
        }
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
