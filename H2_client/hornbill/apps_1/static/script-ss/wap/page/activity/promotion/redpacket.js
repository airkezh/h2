fml.define("wap/page/activity/promotion/redpacket", ['wap/ui/alert', 'wap/zepto/fastclick', 'wap/component/shareTmp', 'wap/app/shareTo', 'wap/component/callApi'], function (require, exports) {
    var shareTmp = require('wap/component/shareTmp');
    var callApi = require('wap/component/callApi');
    var shareTo = require('wap/app/shareTo');

    //登陆成功后的回掉函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

    $('.redShare').on("click", function(e) {
        e.preventDefault();
        var tpl = shareTmp('shareDialog',{});
        $("body").append(tpl);
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
        if (!fml.vars.isLogin) {
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:'20141025181030d10e5b55b5'}, function(res){
            if(res.code == 0){
                // alert('订单取消成功！')
            }else{
                // alert(res.message)
            }
        });
        $.post("/aj/activity/redpackage_coupon?game_id=5", null, function(data) {
            //alert("红包接口返回的数据：" + JSON.stringify(data));
            if (data.code == -1) {
                alert("您已经发过红包！");
                return;
            }
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
            } else {
                shareTo.shareToPengYouQuan(params);
            }
            $(".shareD").remove();
            $(".shade").remove();

        }, "json");
    }


});
