fml.define("wap/page/activity/main820", ['wap/ui/alert', 'wap/zepto'], function (require, exports) {
    var a = require('wap/ui/alert');


    //登陆成功后的回掉函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

    //定时器
    var cDate = new Date(sTime);
    var sDay = cDate.getDate();
    setInterval(function() {
        cDate.setTime(cDate.getTime() + 1000);
        var cDay = cDate.getDate();
        if (cDay != sDay) {
            if (cDay >= 20) {
                if (cDay == 22) {
                    $(".banner_top").html('<span>大促活动最后一天</span>');
                } else if(cDay > 22) {
                    $(".banner_top").html('<span>活动已结束</span>');
                } else {
                    $(".banner_top").html('<span>距离活动结束还有<span id="remainDay" style="color: #ff0000">'+ (22 - cDay)+'</span>天</span>');
                }
            } else {
                if (cDay == 19) {
                    $(".banner_top").html('<span>活动开始就在明天</span>');
                } else {
                    $("#remainDay").text(20 - cDay);
                }

            }

        }
    }, 1000);


    $(".coupon_btn img").on("tap", function() {
        if ($(this).attr("src").indexOf("/get.png") < 0) return;
        if(!isLogin){
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        var _this = $(this);

        var cType = _this.attr("type");
        var cCode = _this.attr("code");
        //alert(cType + " : " + cCode);

        $.ajax({
            url : "/aw/sale/get820Coupon",
            data:{
                'type': cType,
                'code' : cCode
            },
            type : "post",
            dataType : "json",
            timeout : 5000,
            success : function(data) {
                //alert(JSON.stringify(data));
                if (data.success == 1) { //领取成功
                    var picUrl = "http://i.meilishuo.net/css/images/wap/activity/august_act/820_mob/";
                    if (cDate.getDate() < 20) {

                        picUrl += "already_get_820.png"
                    } else {
                        picUrl += "already_get.png";
                    }
                    _this.attr("src", picUrl);
                    //剩余券数减1
                    var la = _this.parent().find(".leftAmount").eq(0);
                    la.text(+la.text() - 1);
                } else { //没抢到
                    var alt = new a({
                        content : data.tips,
                        onSure : function () {
                            return;
                        }
                    });
                }
            },
            complete : function(xhr, status) {
                if (status == "timeout") {
                    alert("请求超时！");
                } else if (status == "error") {
                    alert("请求出错:" + xhr.responseText);
                }
            }
        });
    });

});
