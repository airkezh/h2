fml.use('wap/page/audio');
fml.define("wap/page/activity/promotion/main_venue_141212", ["wap/component/lazyLoad", "wap/zepto/fastclick", "wap/app/countdown2", "wap/component/urlHandle", "wap/component/shareTmp", "wap/app/countdown2", "wap/app/openApp"], function (require, exports) {
    var shareTmp = require('wap/component/shareTmp');
    var lazyLoad = require('wap/component/lazyLoad');
    var cd = require("wap/app/countdown2");
    var urlHandle = require("wap/component/urlHandle");

    if (!urlHandle.getParams(window.location.search).isFromShare) {
        var url = 'meilishuo://set_title.meilishuo?json_params='  + encodeURIComponent('{"title":"1212主会场"}');
        location.href = url;
    }


    var rootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/meet/";

    lazyLoad.load($('.bs_load_img'), 'asrc');

    initCountDown();
    function initCountDown() {
        var currDate = new Date();
        var  currTime = currDate.getTime()/1000;
        var startTime = new Date("2014-12-11").setHours(20)/1000;
        var endTime = new Date("2014-12-15").setHours(0)/1000;



        var $cd = $(".timeStamp");
        var $bt = $(".bannerText");
        if (currTime < startTime) { //活动预热
            $bt.text("距离1212年末犒劳节开抢");
            $cd.attr("end-date", startTime);
            $cd.attr("now", currTime);
            cd();

        } else if (currTime >= endTime) { //活动结束
            $bt.text("活动结束");
            $bt.css({"position":"absolute", "top":"2%", "width" : "100%", "text-align" : "center"});
            $(".timerArea").hide();

        } else if (currTime >= startTime) { //活动开始
            $bt.text("距离活动结束");
            $cd.attr("end-date", endTime);
            $cd.attr("now", currTime);
            cd();
        }
    }


    var sidebar = {
        initDom : function() {
            //初始化侧边栏
            var pageIndex = urlHandle.getParams(window.location.search).pageIndex;
            if (!pageIndex && location.href.indexOf("main_venue") >= 0) {
                pageIndex = 0;
            }
            var sidebars = [
                {'link' : '/promotion/sale_141212/main_venue/?pageIndex=0'},
                {'link' : '/promotion/sale_141212/sub_venue/?pid=342&type=mob&show_cid=4579&all_cid=4579&r=main12mob_yifu342&pageIndex=1'},
                {'link' : '/promotion/sale_141212/sub_venue/?pid=388&type=mob&show_cid=4595&all_cid=4595&r=main12mob_kuzi388&pageIndex=2'},
                {'link' : '/promotion/sale_141212/sub_venue/?pid=420&type=mob&show_cid=4627&all_cid=4627&r=main12mob_skirt420&pageIndex=3'},
                {'link' : '/promotion/sale_141212/sub_venue/?pid=424&type=mob&show_cid=4625&all_cid=4625&r=main12mob_shoes424&pageIndex=4'},
                {'link' : '/promotion/sale_141212/sub_venue/?pid=360&type=mob&show_cid=4563&all_cid=4563&r=main12mob_bag360&pageIndex=5'},
                {'link' : '/promotion/sale_141212/sub_venue/?pid=358&type=mob&show_cid=4545&all_cid=4545&r=main12mob_peishi358&pageIndex=6'},
                {'link' : '/promotion/sale_141212/sub_venue/?pid=426&type=mob&show_cid=4655&all_cid=4655&r=main12mob_home426&pageIndex=7'}, //居家
                {'link' : 'meilishuo://openURL.meilishuo?json_params='  + encodeURIComponent('{"title":"1212美妆", "url" : "http://mapp.meilishuo.com/biz/beauty/saleDec/?acid=4427&r=hdtrc.mz1212toplist_1212mainfloat"}')},
                {'link' : 'meilishuo://openURL.meilishuo?json_params='  + encodeURIComponent('{"title":"1212团购", "url" : "http://mapp.meilishuo.com/activity/tuan/hd/1289?hdtrc=tuan1289_mobmain"}')}, //团购
                {'link' : '/promotion/sale_141212/coupon/'},
                {'link' : 'meilishuo://coupons.meilishuo'}
            ];
            var tpl = shareTmp('sidebar_tpl',{"sidebars" : sidebars, 'pageIndex' : pageIndex});
            $(".sidebar_data").eq(0).append(tpl);
        },
        initEvent : function() {
            //侧边栏
            $(".sidebar_btn").on("click", function() {
                var htmlStr = "<div class='sidebar_shade'></div>"
                $("body").append(htmlStr);
                $(this).css("right", "-20%")
                $(".sidebar_data").css("right", "0%")
            });

            $("body").on("click", ".sidebar_shade", function() {
                $(".sidebar_data").css("right", "-30%");
                $(".sidebar_btn").css("right", "0%")
                $(this).remove();
            })
        }
    }

    sidebar.initDom();
    sidebar.initEvent();



    //活动规则
    $(".rule").on("click", function() {
        $("body").append($("#rule_tpl").html());
    })

    $("body").on("click", ".rule_dialog_btn", function() {
        $(".rule_dialog").remove();
        $(".shade").remove();
    })

    $("body").on("click", ".rule_close_btn", function() {
        $(".rule_dialog").remove();
        $(".shade").remove();
    })


    var openApp = require('wap/app/openApp');
    $('.intro_page').click(function(e){
        if (urlHandle.getParams(window.location.search).isFromShare) {
            openApp('http://m-promotion.meilishuo.com/promotion/sale_141212/coupon/');
        } else {
            window.location.href = "/promotion/sale_141212/coupon/";
        }
        e.preventDefault();
    });





});