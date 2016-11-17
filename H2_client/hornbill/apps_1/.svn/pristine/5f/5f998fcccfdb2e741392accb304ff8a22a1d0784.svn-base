fml.define("wap/page/activity/nightPrice", ["wap/component/lazyLoad", "wap/zepto", "wap/app/countdown2"], function (require, exports) {
    var cd = require("wap/app/countdown2");
    var lazyLoad = require('wap/component/lazyLoad');
    lazyLoad.load($('.bs_load_img'), 'asrc');

    function random(min,max){
        return Math.floor(min+Math.random()*(max-min));
    }
    $(".sales").each(function() {
        $(this).text(sales.pop());
    });

    !function() {
        var $nav = $(".countdown").eq(0);
        var $copyTime = $("#copyTime");
        $("body").append($nav.clone());
        var c1 = $(".countdown").eq(1);
        c1.css("position", "fixed").css("top", "0").css("bottom", "auto").css("display", "none");
        var nTop = parseInt($nav.offset().top);
        var i = 0;
        $(window).on("scroll", function (event){
            action();
        });
        function action() {
            if ($(window).scrollTop() >= nTop) {
                c1.css("display", "block");
            } else {
                c1.css("display", "none");
            }
        }
    }();
    cd();
});