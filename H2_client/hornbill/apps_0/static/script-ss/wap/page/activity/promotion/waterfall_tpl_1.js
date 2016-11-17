/*common*/
require('wap/zepto')
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');
var shareTmp = require('wap/component/shareTmp'),
    pin = require('wap/component/waterfall'),
    colFlag = $('.goods_wall').siblings('.colFlag').css('z-index'),
    timedown = require('wap/app/doota/timedown'),
    urlHandle = require("wap/component/urlHandle");
var sidebar = require("wap/page/activity/promotion/sidebar");
var s = require("wap/page/activity/promotion/scrollX");

$(".bannar").css("margin-top", $("#bannerWord").height());
var $dialogNavDiv = $("#banner_inner_float").children("div");
$("#bannerInner").children("div").each(function(i) {
    $dialogNavDiv.eq(i).attr("ol", $(this).offset().left);
});
$("#bannerInner").css("margin-left", urlHandle.getParams(window.location.search).ni || 0);

//侧边栏数据
var currentDate = new Date();
$.post("/aj/huodong/navi_data", {"actid" : (new Date().getTime() < new Date("2015-01-23").setHours(18)? 53 : 59)}, function(data) {
    sidebar.build({
        "picRootUrl" : Meilishuo.config.picture_url + "images/wap/activity/promotion/1220/sidebar/s",
        "sidebars" : data.data.navis,
        "sidebarBtn" : {"header" : data.data.header, "back" : data.data.back}
    });
}, "json");

var cl = parseInt($("#bannerInner").width());
var max = document.body.clientWidth - cl;
if (max <= -10) {
    fml.vars.ss = new s.SimulationScrollX({
        tContain : 'bannerWord', //必选：滑动区域id
        tMove : 'bannerInner', //必选：移动区域id
        notScrollOut : false
    }, onmoveend);
    $(".nav_more").show();
    $(".js_nav").on("click", function(e) {
        var offsetLeft = $(this).parent().attr("ol");
        if (offsetLeft) {

            var cl = parseInt($("#bannerInner").width());
            var max = document.body.clientWidth - cl;
            console.log(max + " " + offsetLeft*-1);
            if (max < (offsetLeft*-1)) {
                window.location.replace($(this).attr("href") + "&ni=" + (offsetLeft*-1)+"px");
            } else {
                window.location.replace($(this).attr("href") + "&ni=" + max +"px");
            }
        } else {
            window.location.replace($(this).attr("href") + "&ni=" + $("#bannerInner").css("margin-left"));
        }
        e.preventDefault();
    });
}


function onmoveend(p) {
    console.log(p);
}

$(".nav_more").on("click", function() {

   var $bw = $(".banner_word");
    $bw.show();
});

$(".nav_close").on("click", function() {
    $(".banner_word").hide();
})


var pullUp = $('.pullUp');


var onTop = false;

/*
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
*/





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


