fml.define("wap/page/activity/wxRed", ['wap/ui/alert', 'wap/zepto/fastclick', 'wap/component/shareTmp', 'wap/app/shareTo','wap/app/dialog','wap/component/callApi'], function (require, exports) {
    var shareTmp = require('wap/component/shareTmp');
    var callApi = require('wap/component/callApi');
    var shareTo = require('wap/app/shareTo');
    var Alert = require("wap/ui/alert");
    require('wap/app/dialog')
    var a = function(msg, callback) {
        return new Alert({
            content: msg,
            onSure: function() {
                callback && callback();
            }
        });
    };

    // //登陆成功后的回掉函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

    $('.redShare').on("click", function(e) {
        e.preventDefault();
        a('活动已结束')
        // if(isLogin == 0){
        //     window.location.href = 'meilishuo://login.meilishuo';
        //         return;
        // }
        // if(!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
        //     if(isLogin == 1){
        //         coupon(3)
        //     }
        // }else{
        //     if(isLogin == 0){
        //         window.location.href = 'meilishuo://open.meilishuo';
        //         return;
        //     }else{
        //         var tpl = shareTmp('shareDialog',{});
        //         $("body").append(tpl);
        //     }
        // }
    });


    $("body").on("click", ".toFriend",function() {
        coupon(1);
    });

    $("body").on("click", ".toGroup", function() {
        coupon(2);
    });

    $("body").on("click", ".close", function() {
        $(".shareD").remove();
        $(".shade").remove();
    });

    function coupon(p) {
        $.post("/aj/activity/redpackage_coupon", null, function(data) {
            //alert("红包接口返回的数据：" + JSON.stringify(data));
            if (data.code == -1) {
                a("你今天已经发过红包了，记得明天再来哦！");
                return;
            }else if(data.code == -2){
                a("系统繁忙！");
                return;
            }
            $.ajax({
                url : "/aj/activity/getCouponInfo?act_id=3",
                type : "post",
                dataType : "json",
                async : false,
                success : function(data) {
                     //alert(data.data[0].code);
                      callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:data.data[0].code}, function(data){
                          //alert(JSON.stringify(data));
                      });
                },
                error : function(data) {
                    // alert("error:" + JSON.stringify(data));
                }
            });
            var params = {
                'title' : {
                    'default' : data.shareData.weixin_timeline.title
                },
                'text' : {
                    'default' : data.shareData.weixin_timeline.text
                },
                'pic' : {
                    'default' : data.shareData.weixin_timeline.pic
                },
                'url' : data.shareData.weixin_timeline.url
            };
            if (p == 1) {
                shareTo.shareToPengYou(params);
            } else if( p==2 ) {
                shareTo.shareToPengYouQuan(params);
            }else{
                var tpl = shareTmp('share_md');
                $.fn.dialog({dialogContent : tpl , dialogTitle : '',dialogWidth : 320}); 
                $('#dialogLayer').css('top',$(window).scrollTop())
                $('#dialogLayer').css('height','240px')
                $('#dialogLayer .dialogTitle .close').text('');
            }
            $(".shareD").remove();
            $(".shade").remove();
        }, "json");
    }


});
