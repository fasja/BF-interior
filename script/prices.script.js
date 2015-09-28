/**
 * Created by dmitry on 10.09.15.
 */
$(document).ready(function(){
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
    })
});
