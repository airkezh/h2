fml.define('wap/page/activity/promotion/new_promotion_poster', ['wap/zepto/fastclick', 'wap/component/windowScroll', 'wap/zepto/scroll', 'wap/component/waterfall', 'wap/app/posterWalls1', 'wap/component/shareTmp', 'wap/app/doota/timedown', 'wap/component/urlHandle', 'wap/page/activity/promotion/sidebar', 'wap/page/activity/promotion/sidebar_data_141220'], function(require, exports) {
    var shareTmp = require('wap/component/shareTmp'),
        pin = require('wap/component/waterfall'),
        colFlag = $('.goods_wall').siblings('.colFlag').css('z-index'),
        timedown = require('wap/app/doota/timedown'),
        urlHandle = require("wap/component/urlHandle");

    //var sidebar = require("wap/page/activity/promotion/sidebar");
    //var sidebarData = require("wap/page/activity/promotion/sidebar_data_141220");

    /*if (new Date().getTime() > new Date("2014-12-22").setHours(20)) {
        sidebar.build({
            "picRootUrl" : Meilishuo.config.picture_url + "images/wap/activity/promotion/1220/sidebar/s",
            "sidebars" : sidebarData.data
        });
    }*/


    var pullUp = $('.pullUp');


    var onTop = false;

    var $i = $(".bannar  img")[0];
    if ($i) {
        if ($i.complete) {
            menuFixed();
        } else {
            $i.onload = function() {
                menuFixed();
            }
        }
    }





    fml.vars.poster.totalColNum = colFlag || 2
    pin.init({
        containerId: '.goods_wall',
        containerWidth: document.body.clientWidth
    });
    var posterWall = require('wap/app/posterWalls1');



    if (fml.vars.pid) {
        var urlData = {
            'frame': 1,
            'pid': fml.vars.pid,
            'type': 'mob'
        }

        var pullUpAction = function() {
            posterWall.ajaxPoster('/aj/huodong/promotion_poster_data');
        }
        Meilishuo.config.poster0 = '';
        posterWall.testPoster0(urlData, pullUpAction);
        posterWall.scrollPoster(true);
        fml.vars.toLogPoster = true

        fml.vars.poster.scale = pin.getAttr('scale')
        fml.vars.poster.colWidth = pin.getAttr('colWidth')
        if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0) {
            pin.append(shareTmp('posterWall', Meilishuo.config.poster0))
            pullUp.attr('status', 'tap');
        }
    }



    // gotop
    var $gotop = $('.gotop'),
        onscroll = require('wap/component/windowScroll');
    $gotop.on("click", function() {
        $.scrollTo({
            endY: 0,
            duration: 300
        });
    });

    function gotop(pos, isDown) {
        if (pos < 30) {
            $gotop.hide();
        } else {
            $gotop.show();
        }
    }
    onscroll.bind(gotop, 'gotop');


    function menuFixed() {
        var $c,$c2, c2Top;
        var $nav = $(".headline").eq(0);
        if ($nav.length) {
            var nTop = parseInt($nav.offset().top);
            $c = $nav.clone();
            $("body").append($c);
            var c2Top;
            c2Top = $nav.height();
            $c.css({"z-index" : "7","position" : "fixed", "top": "0", "width" :"100% ", "display" : "none"});
            if (Meilishuo.config.os.iphone) {
                $(window).on("touchmove", function() {
                    $c.css("display", "none");
                })
            }
        }

        var $nav2 = $(".banner_word").eq(0);
        var nTop2 = parseInt($nav2.offset().top);
        c2Top = c2Top? c2Top : 0
        nTop2 -= c2Top;
        $c2 = $nav2.clone();
        $("body").append($c2);
        $c2.css({"z-index" : "7", "position" : "fixed", "top": (c2Top+"px") , "width" : 60/64*100 + "%", "display" : "none"});
        if (Meilishuo.config.os.iphone) {
            $(window).on("touchmove", function() {
                $c2.css("display", "none");
            })
        }

        $(window).on("scroll", function (event){
            action();
        });

        function action() {
            if ($c) {
                if ($(window).scrollTop() >= nTop) {
                    $c.css("display", "block");
                } else {
                    $c.css("display", "none");
                }
            }

            if ($(window).scrollTop() >= nTop2) {
                $c2.css("display", "block");
            } else {
                $c2.css("display", "none");
            }
        }
    }

    $(".js_nav").on("click", function(e) {
        window.location.replace($(this).attr("href"));
        e.preventDefault();
    });
});