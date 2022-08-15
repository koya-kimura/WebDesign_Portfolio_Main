$(function () {
    $('a[href^=#]').click(function () {
        var speed = 700; // スクロール速度(ミリ秒)
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('html').animate({
            scrollTop: position
        }, speed, 'swing');
        return false;
    });
});