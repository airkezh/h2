fml.define("wap/page/activity/promotion/test_game", ['wap/ui/alert', 'wap/zepto/fastclick', 'wap/component/shareTmp', 'wap/app/shareTo', 'wap/app/openApp', 'wap/component/callApi'], function (require, exports) {
    var shareTmp = require('wap/component/shareTmp');
    var callApi = require('wap/component/callApi');
    var shareTo = require('wap/app/shareTo');
    var openApp = require('wap/app/openApp');

    var canSendRedPackage = false;
    if (fml.vars.isEndPage) {
        $.ajax({
            url : "/aj/activity/redpackage_coupon?game_id=5&val",
            type : "post",
            dataType : "json",
            async : false,
            success : function(data) {
                //alert(data.code)
                if (data.code == 0) {
                    canSendRedPackage = true;
                    //$(".shareTips").css("display", "block")
                }
            },
            error : function(data) {
               // alert("红包分发失败:" + JSON.stringify(data));
            }
        });
    }

    var isClick = false;
    $(".question a").on("click", function(e) {
        e.preventDefault();
        if (isClick) {
            return;
        }
        isClick = true;
        var _this = $(this);
        _this.css({"border-width" : "8px", "border-color" : "#fc71a6", "border-style" : "solid"});
        setTimeout(function() {
            if (fml.vars.nextPageIndex == 5) {
                window.location.href = "/activity/promotion/game/end?sNum=" + _this.attr("sel");
            } else {
                window.location.href = _this.attr("href");
            }

        }, 300);
    });

    $('.share').on("click", function() {

        var tpl;
        if (fml.vars.mlsApp) {
            if (!fml.vars.canSendRed) {
                return;
            }
            tpl = shareTmp('shareDialog',{});

        } else {
            tpl = shareTmp('weiXinShare',{});
        }
        $("body").append(tpl);

    });


    $("body").on("click", ".toFriend",function() {

        coupon("friend");
    });

    $("body").on("click", ".toGroup", function() {

       coupon();
    });

    $("body").on("click", ".close", function() {
        $(".shareD").remove();
        $(".shade").remove();
    });

    $("body").on("click", ".weiXinShareD", function() {
        $(".weiXinShareD").remove();
        $(".shade").remove();
    })

    function coupon(p) {
        callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:'20141025181030d10e5b55b5'}, function(res){
            if(res.code == 0){
                // alert(JSON.stringify(data));
            }else{
                // alert(res.message)
            }
        });
        //判断是否跳到红包页
       if (canSendRedPackage) {
           setTimeout(function() {
               window.location.href = "/activity/promotion/game/red";
           }, 2000);
       }
        if (p == "friend") {
            shareTo.shareToPengYou(params);
        } else {
            shareTo.shareToPengYouQuan(params);
        }
    }

    if (Meilishuo.config.os.iphone) {
        fml.vars.shareInfo.title = fml.vars.shareInfo.desc;
    }
    var params = {
        'title' : {
            'default' : fml.vars.shareInfo.title
        },
        'text' : {
            'default' : fml.vars.shareInfo.desc
        },
        'pic' : {
            'default' : fml.vars.shareInfo.pic
        },
        'url' : fml.vars.shareInfo.shareLink
    };

    $(".openApp").on("click", function() {
        openApp("http://mapp.meilishuo.com/activity/promotion/game/red?frm=weixin");
    })

});
