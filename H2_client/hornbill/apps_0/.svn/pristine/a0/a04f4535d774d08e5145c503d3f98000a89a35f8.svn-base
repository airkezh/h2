fml.use('wap/page/audio');
fml.define("wap/page/activity/promotion/meet11", ["wap/component/lazyLoad", "wap/zepto/fastclick", "wap/app/countdown2", "wap/component/urlHandle", "wap/component/shareTmp", "wap/app/countdown2"], function (require, exports) {
    var shareTmp = require('wap/component/shareTmp');
    var urlHandle = require("wap/component/urlHandle");
    var lazyLoad = require('wap/component/lazyLoad');
    var cd = require("wap/app/countdown2");

    var bgColors = ["#ffe6e5","#f4fbfe","#fff7fe","#fff8f8","#f2fbf8", "#fffbe5"];
    var rootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/meet/";

    //init();

    lazyLoad.load($('.bs_load_img'), 'asrc');


    $(".tab").on("click", function() {
        if (fml.vars.$c) {
            fml.vars.$c.css("display", "none");
        }
        var index = $(this).attr("index");

        window.location.hash = index;
        if (index == 6) {
            $("#ban_rule").addClass("rule_act");
        } else {
            $("#ban_rule").removeClass("rule_act");
        }
        $(".menu  img").attr("src", rootUrl + "mm_"+index + ".jpg");
        $(".banner img").attr("src", rootUrl + "nnb_" + index + ".jpg")
        $("body").css("background-color", bgColors[index-1]);

        var tpl = shareTmp('temp_poster',{"posters" : fml.vars.tabsData[index].falls});
        $(".postWall").eq(0).html(tpl);

        lazyLoad.load($('.bs_load_img'), 'asrc');

    });

    jump();
    function jump() {
        var tabHash = window.location.hash.substr(1);
        if (tabHash > 0 && tabHash < 7) {
            $(".tab[index='"+tabHash+"']").click();
            return;
        }
        var tabIndex = urlHandle.getParams(window.location.search).tab;
        if (tabIndex && tabIndex < 7 && tabIndex > 0) {$(".tab[index='"+tabIndex+"']").click(); return;}

        $(".banner img").attr("src", rootUrl + "nnb_6.jpg");
    }



    //吸顶
    function menuFixed() {
        var $nav = $(".menu");
        var nTop = parseInt($nav.offset().top);
        var $c = $nav.clone();
        fml.vars.$c = $c;
        $("body").append($c);

        $c.css({"position" : "fixed", "top": "0", "width" :"100% ", "display" : "none"})
       // alert($c.css("opacity"));
        $c.isShow = false;
        $(window).on("scroll", function (event){
            action();
        });
        if (Meilishuo.config.os.iphone) {
            $(window).on("touchmove", function() {
                $c.css("display", "none");
            })
        }

        function action() {
            if ($(window).scrollTop() >= nTop) {
                    $c.css("display", "block")
            } else {
                    $c.css("display", "none");
            }
        }
    }

    function init() {
        var actid = urlHandle.getParams(window.location.search).actid;
        //$(".menu .bs_load_img").attr("asrc", menus[actid]);
        //$(".banner .bs_load_img").attr("asrc", banners[actid]);
        $.ajax({
            url : "/aj/huodong/meetFor11",
            data : {"actid" : actid},
            dataType : "json",
            type : "post",
            async : false,
            timeout : 5000,
            success : function(data) {
                alert(JSON.stringify(data));
                if (data.code == 0) {
                    for (var i in data.data) {
                        if (i == actid) {
                            var posters = data.data[i];
                            var tpl = shareTmp('temp_poster',{"posters" : posters});
                            $(".postWall").eq(0).append(tpl);
                        }

                    }
                }
            }
        });
    }

    // initCountDown();

    function initCountDown() {
        var currDate = new Date();
        var  currTime = currDate.getTime()/1000;
        var startTime = new Date("2014-11-11").setHours(0)/1000;
        var endTime = new Date("2014-11-12").setHours(0)/1000;



        var $cd = $(".timeStamp");
        var $bt = $(".bannerText");
        //alert(currTime > startTime);
        if (currTime < startTime) { //活动预热
            $bt.text("距离11.11还有");
            $cd.attr("end-date", startTime);
            $cd.attr("now", currTime);
            cd();

        } else if (currTime >= endTime) { //活动结束
            var bannerHtml = '<img src="http://i.meilishuo.net/css/images/wap/activity/promotion/11/meet/banner1.jpg" >';

            $(".banner").html(bannerHtml + '<div class="bannerText" style="width: 100%; text-align: center; top:58%">活动结束</div>');
            $(".bannerText").css({"position":"absolute", "top":"2%"});
        } else if (currTime >= startTime) { //活动开始
            $bt.text("距离年度最强大促结束还有");
            $cd.attr("end-date", endTime);
            $cd.attr("now", currTime);
            cd();
        }
    }


    $("body").on("click", ".rule_act", function() {
        window.location.href = "http://mapp.meilishuo.com/activity/four_years/prepare/?cid=3887";
    })
});