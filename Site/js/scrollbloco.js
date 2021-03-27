$('nav a').click(function(posicao){
    posicao.preventDefault();
    var id = $(this).attr('href'),
    targetOffset = $(id).offset().top,
    menuHeight = $('header').innerHeight();

    $('html,body').animate({
        scrollTop: targetOffset - menuHeight - 95
    }, 700);
});