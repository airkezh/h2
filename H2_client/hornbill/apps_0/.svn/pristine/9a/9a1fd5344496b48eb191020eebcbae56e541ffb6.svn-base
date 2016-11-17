fml.define("wap/page/activity/promotion/main11", ['wap/zepto/fastclick', 'wap/component/shareTmp', 'wap/app/encrypt', 'wap/app/countdown2', 'wap/component/urlHandle','wap/ui/alert', 'component/iStorage'], function (require, exports) {

    var shareTmp = require('wap/component/shareTmp');
    var urlHandle = require('wap/component/urlHandle');
    var encrypt = require('wap/app/encrypt');
    var cd = require("wap/app/countdown2");
    var a = require('wap/ui/alert');
    var cookie = require('component/iStorage');

    //登陆成功后的回掉函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };


    var currDate;
    var currTime;
    var startTime = new Date("2014-11-11").setHours(0)/1000;
    var endTime = new Date("2014-11-12").setHours(0)/1000;
    var picRootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/coupon/";


    if (!fml.vars.isCompleteStatic) {
        init();
    } else {
        fml.vars.MLS_S_RZ = urlHandle.getParams(window.location.search)["MLS_S_RZ"];
        if (!fml.vars.MLS_S_RZ) { //不能存在该参数视为未登陆
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        initCountDown();
        if (new Date().getDate() < 11) {
            fml.vars.MLS_S_RZ += "_11"
        }
        var usrInfo = cookie.getCookie(fml.vars.MLS_S_RZ);
        if (!usrInfo) {
            cookie.setCookie(fml.vars.MLS_S_RZ, "[]", {"duration" : 3600*24*20});
            usrInfo = [];
        } else {
            usrInfo = JSON.parse(usrInfo)
        }


        var $couponBtns = $(".couponBtn");
        if (usrInfo.length > 0) {
            for (var u = 0; u < usrInfo.length; u++) {
                if (usrInfo[u]) {
                    $couponBtns.eq(u).attr("src", picRootUrl + (new Date().getDate() < 11 ? "already_get_11.png" : "already_get.png"));
                }
            }

        }
        fml.vars.usrInfo = usrInfo;
    }

    $("img[type]").on("click", function() {
        if ($(this).attr("src").indexOf("/get.png") < 0) return;
        if(!fml.vars.isLogin && !fml.vars.isCompleteStatic){
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        fml.vars.$couponBtnObj = $(this);
        if (fml.vars.captcha_type != 0 && !fml.vars.isNotNeedCaptcha && !fml.vars.isCompleteStatic) {
            if (fml.vars.captcha_type == 1) {
                imgCaptchaValidate();
            } else if (fml.vars.captcha_type == 2) {
                mesCaptchaValidate();
            }
        } else {
            getCoupon(fml.vars.$couponBtnObj);
        }



    });


    function getCoupon(_this) {
        var cType = _this.attr("type");
        var cCode = _this.attr("code");
        var cName = "encore_11";
        var cKey = fml.vars.isCompleteStatic ? "" : encodeNew(fml.vars.couponKey);
        $.ajax({
            url : "/aj/huodong/getCouponFor11",
            data:{
                'type': cType,
                'code' : cCode,
                'key' : cKey,
                'name' : cName
            },
            type : "post",
            dataType : "json",
            timeout : 5000,
            async: false,
            success : function(data) { //data.captcha_type = 0/1/2
                if (data.islogin != 1) {
                    window.location.href = "meilishuo://login.meilishuo/";
                    return;
                }
                if (data.success == 1) { //领取成功
                    var picUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/coupon/";
                    var cDate = new Date();
                    var cTime = parseInt(cDate.getTime()/1000);
                    if (cTime < startTime) {

                        picUrl += "already_get_11.png"
                    } else {
                        picUrl += "already_get.png";
                    }
                    _this.attr("src", picUrl);
                    //剩余券数减1
                    var la = _this.parent().find(".leftAmount").eq(0);
                    la.text(+la.text() - 1);

                    var tpl = shareTmp('temp_get_succ');
                    $("body").append(tpl);

                    if (fml.vars.MLS_S_RZ) {
                        var usrInfo = JSON.parse(cookie.getCookie(fml.vars.MLS_S_RZ));
                        usrInfo[$(".couponBtn").index(_this)] = true;
                        cookie.setCookie(fml.vars.MLS_S_RZ, JSON.stringify(usrInfo), {"duration" : 3600*24*20});
                    }
                } else if (data.success == 0 && data.captcha_type == 1) {
                    imgCaptchaValidate();
                } else if(data.success == 0 && data.captcha_type == 2) {
                    mesCaptchaValidate();
                }else { //没抢到
                    new a({
                        content : data.tips,
                        onSure : function () {
                            return;
                        }
                    });

                    if (data.tips == "已经领取过") {
                        if (fml.vars.MLS_S_RZ) {
                            var usrInfo = JSON.parse(cookie.getCookie(fml.vars.MLS_S_RZ));
                            usrInfo[$(".couponBtn").index(_this)] = true;
                            cookie.setCookie(fml.vars.MLS_S_RZ, JSON.stringify(usrInfo), {"duration" : 3600*24*20});
                            _this.attr("src", picRootUrl + (new Date().getDate() < 11 ? "already_get_11.png" : "already_get.png"));
                        }
                    }
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
    }

    function init() {
        //获取优惠券信息
        $.ajax({
            url : "/aj/huodong/couponInfoFor11",
            dataType : "json",
            type : "post",
            timeout : 5000,
            async : false,
            success : function(data) {
                //alert(JSON.stringify(data));

                fml.vars.serverCurrTime = data.timestamp;
                fml.vars.isLogin = data.islogin;
                fml.vars.captcha_type = data.captcha_type;
                fml.vars.couponKey = data.key;
                initCountDown();

                var coupons = data.coupon;
                if (!coupons  || coupons.length <= 0) {
                    return;
                }
                for (var i = 0; i < coupons.length; i++) {
                    var coupon = coupons[i];

                    coupon.bgPic = picRootUrl + "c" + i + ".png";

                    coupon.btnPic = picRootUrl;
                    switch(coupon.can_use) {
                        case 0 : //可以使用  活动开始前该值也为0
                            if (!coupon.left_amount) { //这个数据为空时，说明活动还没开始
                                coupon.btnPic += "8.png";
                            } else if(fml.vars.isLogin == 0) { //用户没登陆
                                coupon.btnPic += "get.png";
                            } else {
                                //立即抢券
                                coupon.btnPic += "get.png";
                            }
                            break;
                        case 1 : //抢光
                            if (coupon.next) {
                                var nextDate = coupon.next.begin.split(" ");
                                var d = new Date(nextDate[0]);
                                d.setHours(parseInt(nextDate[1]));
                                if (d.getDate() == currDate.getDate()) { //日期相同说明今天还有抢券机会
                                    var hours = d.getHours();
                                    coupon.btnPic += hours + ".png";
                                } else { //明天再来
                                    coupon.btnPic += "tomorrow.png";
                                }
                            } else {
                                coupon.btnPic += "over.png";
                            }

                            break;
                        case 2 : //领过
                            if (currTime < startTime) { //号前显示 已领取，11.11再领一次
                                coupon.btnPic += "already_get_11.png";
                            } else {
                                coupon.btnPic += "already_get.png";
                            }
                            break;
                        case 3 : //不符合领取条件
                            coupon.btnPic += "no_get.jpg";
                            break;
                    }
                }
                var tpl = shareTmp('temp_coupons',{"coupons" : coupons});
                $(".couponArea").eq(0).append(tpl);

            },
            complete : function() {
                if (status == "timeout") {
                    alert("请求超时！");
                } else if (status == "error") {
                    alert("请求超时:" + xhr.responseText);
                }
            }
        });

    }

    function encodeNew(key) {
        var pos = key.length - 4;
        key = key.substr(4) + key.substring(0, 4);
        return new coder().encode(key);
    }


    function initCountDown() {
        if (fml.vars.serverCurrTime) {
            currDate = new Date(fml.vars.serverCurrTime);
        } else {
            currDate = new Date( );
        }

        currTime = currDate.getTime()/1000;
        return;
        var $cd = $(".timeStamp");
        var $bt = $(".bannerText");
        //alert(currTime > startTime);
        if (currTime < startTime) { //活动预热
            $bt.text("距离11.11还有");
            $cd.attr("end-date", startTime);
            $cd.attr("now", currTime);
            cd();

        } else if (currTime >= endTime) { //活动结束
            $(".banner").html('<div class="bannerText" style="width: 100%; text-align: center; top:58%">活动结束</div>');
            $(".bannerText").css({"position":"absolute", "top":"2%"});
        } else if (currTime >= startTime) { //活动开始
            $bt.text("距离年度最强大促结束还有");
            $cd.attr("end-date", endTime);
            $cd.attr("now", currTime);
            cd();
        }
    }



    function coder() {

        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }

        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }


    }

    function removeShade() {
        $(".shade").remove();
        $(".checkBox").remove();
    }


    function imgCaptchaValidate(isZhiJian) {
        var imgCaptchaUrl = "/customactivity/captcha?";
        if (isZhiJian) {
            imgCaptchaUrl += "purchase=1&"
        }
        var tpl = shareTmp('temp_captcha2_img',{"picUrl" : imgCaptchaUrl + 'timestamp=' + new Date().getTime()});
        $("body").append(tpl);
        //更换图片
        $(".newImg").on("click", function() {
            $(".captchaImg").attr("src", imgCaptchaUrl + 'timestamp=' + new Date().getTime())
        })
        $(".imgCaptchaClose").on("click", function() {
            removeShade();
        });
        //验证图片
        $(".imgCaptchaCheck").on("click", function() {
            var p = {"check_code" : $(".captchaInput").val()};
            if (isZhiJian) {
                p.purchase = 1;
            }
            $.post("/aj/huodong/checkCaptchaFor11", p, function(data) {

                //alert(JSON.stringify(data));
                if (data.status == 1) {
                    fml.vars.isNotNeedCaptcha = true;
                    removeShade();
                    if (isZhiJian) {
                        zhiJianEexc();
                    } else {
                        getCoupon(fml.vars.$couponBtnObj);
                    }

                } else {
                    $(".imgCenter").css("display", "block");
                    $(".captchaImg").attr("src", imgCaptchaUrl + 'timestamp=' + new Date().getTime());
                }
            }, "json");
        })
    }

    function mesCaptchaValidate(isZhiJian) {
        var tpl = shareTmp('temp_short_mes',{"picUrl" : '/aj/huodong/getCaptchaFor11'});
        $("body").append(tpl);

        //获取短信验证码
        var canGetMes = true;
        $(".getMesCaptcha").on("click", function() {
            if (!canGetMes) {return};
            canGetMes = false;
            var _this = $(this);
            _this.mesTime = 59;
            $.get("/aj/huodong/getCaptchaFor11", function(data){
                if (data.status == 0){
                    canGetMes = true;
                    alert(data.tips);
                } else {
                    changeMesStatus(_this);
                    //验证短信
                    $(".captchaCheck").css("background-color", "#ff94b7");
                }
            }, "json");


        });
        function changeMesStatus(_this) {

            _this.text("60秒后重新发送");
            _this.css({"border-color" : "#ccc2c9", "color" : "#ccc2c9"});
            var iTimer = setInterval(function() {
                if (_this.mesTime == 0) {
                    clearInterval(iTimer);
                    canGetMes = true;
                    _this.text("点击发送");
                    _this.css({"border-color" : "#ff94b7", "color" : "#ff95b6"});

                } else {
                    _this.text(_this.mesTime + "秒后重新发送");
                    _this.mesTime--;
                }

            }, 1000)
        }
        $(".captchaCheck").on("click", function() {

            $.post("/aj/huodong/checkCaptchaFor11", {"check_code" : $(".captchaInput").val()}, function(data) {

                if (data.status == 1) {
                    fml.vars.isNotNeedCaptcha = true;
                    removeShade();
                    if (isZhiJian) {
                        zhiJianEexc();
                    } else {
                        getCoupon(fml.vars.$couponBtnObj);
                    }
                }  else {
                    $(".mesCenter").css("display", "block");
                }
            }, "json");
        });
    }

    //alert(window.localStorage);
    if (cookie.getCookie("remind")) {

        $(".remind_switch").addClass("remind_o");
    }
    $(".remind_switch").on("click", function() {
       $(this).toggleClass("remind_o");

        var title = "亲，你的美丽说双11优惠券可以用了，快去美丽说买新款冬装吧！";
        var sTime = "2014-11-10 20:00:00";
        var eTime = "2014-11-12 00:00:00";
        var alarmOffset = 0;
        var recurrenceType = 0;
        if ($(this).hasClass("remind_o")) {
            cookie.setCookie("remind", true, {"duration" : 3600*24*20});
            var jsonParams='{"actionType":"add","eventTitle":'+'"'+title+'"'+', "startTime":'+'"'+sTime+'"'+',"endTime":'+'"'+eTime+'"'+',"alarmOffset":'+'"'+alarmOffset+'"'+',"recurrenceType":'+'"'+recurrenceType+'"'+'}';
            //alert(jsonParams);
            window.location.href = 'meilishuo://calendar_event.meilishuo?json_params=' + encodeURIComponent(jsonParams);
        } else {
            cookie.removeCookie("remind");
            var jsonParams='{"actionType":"remove","eventTitle":'+'"'+title+'"'+'}';
            window.location.href = 'meilishuo://calendar_event.meilishuo?json_params=' + encodeURIComponent(jsonParams);
        }
    });


    $("body").on("click", ".sure_get_succ", function() {
        $(".shade").remove();
        $(".get_success").remove();
    })

    $("body").on("click", ".close_get_succ", function() {
        $(".sure_get_succ").click();
    })



    $(".zhijian").on("click", function() {
        zhiJianEexc();
    });

    function zhiJianEexc() {
        $.ajax({
            url : "/aj/huodong/zhiJianFor11",
            dataType : "json",
            async : false,
            data : {
                key : (fml.vars.isCompleteStatic ? "" : encodeNew(fml.vars.couponKey))
            },
            success : function(data) {
                if (data.success == 1) {
                    goToZhiJianPage();
                }  else if(data.success == 0 && data.captcha_type == 2) {
                    mesCaptchaValidate(true);
                } else if (data.success == 0 && data.captcha_type == 1) {
                    imgCaptchaValidate(true);
                } else {
                    new a({
                        content : data.tips,
                        onSure : function () {
                            return;
                        }
                    });
                }
            }
        });
    }


    function goToZhiJianPage() {
        window.location.href = "meilishuo://twitter_single.meilishuo?json_params=%7B%22twitter_info%22%3A%7B%22twitter_id%22%3A%223284569645%22%2C%22is_doota%22%3A%221%22%7D%7D";
    }



});
