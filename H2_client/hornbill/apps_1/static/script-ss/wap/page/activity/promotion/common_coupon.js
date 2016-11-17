fml.define("wap/page/activity/promotion/common_coupon", ['wap/zepto/fastclick', 'wap/component/shareTmp', 'wap/app/encrypt', 'wap/app/countdown2', 'wap/component/urlHandle','wap/ui/alert', 'component/iStorage'], function (require, exports) {


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
    var opt = {
        /*startTimeStr : "2014-11-11",
        endTimeStr : "2014-11-12",
        startTime : new Date(this.startTimeStr).setHours(0)/1000,
        endTime : new Date(this.endTimeStr).setHours(0)/1000,
        picRootUrl : "http://i.meilishuo.net/css/images/wap/activity/promotion/11/coupon/",
        cdPreStartText : "距离活动开始",
        cdStartText : "距离活动结束",
        cdEndText : "活动结束",
        promotionMark : "rd_test"*/
    }



    $("body").on("click", "img[type]", function() {
        if ($(this).attr("src").indexOf("/get.png") < 0) return;
        if(!fml.vars.isLogin){
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        fml.vars.$couponBtnObj = $(this);
        if (fml.vars.captcha_type != 0 && !fml.vars.isNotNeedCaptcha ) {
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
        var cName = opt.promotionMark;
        var cKey = encodeNew(fml.vars.couponKey);
        $.ajax({
            url : "/aj/huodong/getCoupon",
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
                if (data.error_code != 0) {
                    new a({
                        content : data.message,
                        onSure : function () {
                            return;
                        }
                    });
                    return;
                }
                data = data.data;
                if (data.islogin != 1) {
                    window.location.href = "meilishuo://login.meilishuo/";
                    return;
                }
                if (data.success == 1) { //领取成功
                    var picUrl = opt.picRootUrl;
                    var cDate = new Date();
                    var cTime = parseInt(cDate.getTime()/1000);
                    if (cTime < opt.startTime) {

                        picUrl += "already_get_more.png"
                    } else {
                        picUrl += "already_get.png";
                    }
                    _this.attr("src", picUrl);
                    //剩余券数减1
                    var la = _this.parent().find(".leftAmount").eq(0);
                    la.text(+la.text() - 1);

                    var tpl = shareTmp('temp_get_succ');
                    $("body").append(tpl);
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
            url : "/aj/huodong/couponInfo?name=" + opt.promotionMark,
            dataType : "json",
            type : "post",
            timeout : 5000,
            async : false,
            success : function(data) {
                //alert(JSON.stringify(data));
                data = data.data;
                //console.log(JSON.stringify(data));
                fml.vars.serverCurrTime = data.timestamp;
                fml.vars.isLogin = data.islogin;
                fml.vars.captcha_type = data.captcha_type;
                fml.vars.couponKey = data.key;
                if (opt.showCD) {
                    initCountDown();
                }


                var coupons = data.coupon;
                if (!coupons  || coupons.length <= 0) {
                    return;
                }
                for (var i = 0; i < coupons.length; i++) {
                    var coupon = coupons[i];

                    coupon.bgPic = opt.picRootUrl + "nc" + i + ".png";

                    coupon.btnPic = opt.picRootUrl;
                    switch(coupon.state) {
                        case 'can_apply' : //可以使用  活动开始前该值也为0
                                coupon.btnPic += "get.png";
                            break;
                        case 'applied' : //领过
                            coupon.btnPic += "already_get.png";
                            break;
                        case 'apply_once_more' :
                            coupon.btnPic += "already_get_more.png";
                            break;
                        case 'tomorrow' :
                            coupon.btnPic += "tomorrow.png";
                            break;
                        case 'empty' :
                            coupon.btnPic += "over.png";
                            break;
                        case 'not_start' : //活动未开始
                            break;
                        default :
                            var c = +coupon.state;
                            if (c > 0 && c <= 23) {
                                coupon.btnPic += coupon.state + ".png";
                            }
                    }
                }
                var tpl = shareTmp('temp_coupons',{"coupons" : coupons});
                $(".couponArea").eq(0).append(tpl);

            },
            complete : function(xhr, status) {
                if (status == "timeout") {
                    alert("请求超时！");
                } else if (status == "error") {
                    alert("请求超时:" + xhr.responseText);
                }
            }
        });

        remind();

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
        var $cd = $(".timeStamp");
        var $bt = $(".bannerText");
        if (currTime < opt.startTime) { //活动预热
            $bt.text(opt.cdPreStartText);
            $cd.attr("end-date", opt.startTime);
            $cd.attr("now", currTime);
            cd();

        } else if (currTime >= opt.endTime) { //活动结束
            $(".banner").html('<div class="bannerText" style="width: 100%; text-align: center; top:4%">' + opt.cdEndText + '</div>');
            $(".bannerText").css({"position":"absolute", "top":"2%"});
        } else if (currTime >= opt.startTime) { //活动开始
            $bt.text(opt.cdStartText);
            $cd.attr("end-date", opt.endTime);
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
        var imgCaptchaUrl = "/promotion/captcha?";
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
            $.post("/aj/huodong/checkCaptcha", p, function(data) {

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
        var tpl = shareTmp('temp_short_mes',{"picUrl" : '/aj/huodong/getCaptcha'});
        $("body").append(tpl);

        $(".mes-close").on("click", function() {
            $(".captchaMesBox").remove();
            $(".shade").remove();
        });

        //获取短信验证码
        var canGetMes = true;
        $(".getMesCaptcha").on("click", function() {
            if (!canGetMes) {return};
            canGetMes = false;
            var _this = $(this);
            _this.mesTime = 59;
            $.get("/aj/huodong/getCaptcha", function(data){
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

            $.post("/aj/huodong/checkCaptcha", {"check_code" : $(".captchaInput").val()}, function(data) {

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


    function remind () {
        if (cookie.getCookie("remind") == 'on_01') {
            $(".remind_switch").addClass("remind_o");
        } else if (cookie.getCookie("remind") != "off_01") {
            cookie.setCookie("remind", "on_01", {"duration" : 3600*24*10});
            $(".remind_switch").addClass("remind_o");
            ios_calendar_event(true);
        }

        $(".remind_switch").on("click", function() {
            $(this).toggleClass("remind_o");
            if ($(this).hasClass("remind_o")) {
                cookie.setCookie("remind", "on_01", {"duration" : 3600*24*10});
                ios_calendar_event(true);
            } else {
                cookie.setCookie("remind", "off_01", {"duration" : 3600*24*10});
                ios_calendar_event(false);
            }
        });

        function ios_calendar_event (state) {
            var title = opt.calendarTitle;
            var sTime = opt.calendarStartTime;
            var eTime = opt.calendarEndTime;
            if (!title || !sTime || !eTime) {
                return;
            }
            var alarmOffset = 0;
            var recurrenceType = 0;
            if (state) {
                var jsonParams='{"actionType":"add","eventTitle":'+'"'+title+'"'+', "startTime":'+'"'+sTime+'"'+',"endTime":'+'"'+eTime+'"'+',"alarmOffset":'+'"'+alarmOffset+'"'+',"recurrenceType":'+'"'+recurrenceType+'"'+'}';
            } else {
                var jsonParams='{"actionType":"remove","eventTitle":'+'"'+title+'"'+'}';
            }

            window.location.href = 'meilishuo://calendar_event.meilishuo?json_params=' + encodeURIComponent(jsonParams);
        }
    }



    $("body").on("click", ".sure_get_succ", function() {
        $(".shade").remove();
        $(".get_success").remove();
    })

    $("body").on("click", ".close_get_succ", function() {
        $(".shade").remove();
        $(".get_success").remove();
    })


    initZhiJianCoupon();
    function initZhiJianCoupon() {
        var cDate = new Date();
        var tDate = new Date();
        tDate.setHours(11);
        tDate.setMinutes(59);
        if (cDate.getHours() < 11) {
            var btnHtml = '<div class="zhijian_btn_no" />';
        } else if(cDate.getTime() > tDate.getTime()) {
            var btnHtml = '<div class="zhijian_btn_over" />';
        } else {
            var btnHtml = '<div class="zhijian_btn" />';
        }

        $(".zhijian").append(btnHtml);
    }

    $("body").on("click", ".zhijian_btn", function() {
        zhiJianEexc();
    });

    function zhiJianEexc() {
        $.ajax({
            url : "/aj/huodong/zhiJian",
            dataType : "json",
            async : false,
            data : {
                key : encodeNew(fml.vars.couponKey)
            },
            success : function(data) {
                if (data.error_code != 0) {
                    new a({
                        content : data.message,
                        onSure : function () {
                            return;
                        }
                    });
                    return;
                }
                data = data.data;
                if (data.islogin != 1) {
                    window.location.href = "meilishuo://login.meilishuo/";
                    return;
                }
                if (data.success == 1) {
                    goToZhiJianPage(data.url);
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


    function goToZhiJianPage(couponUrl) {
        window.location.href = couponUrl;
    }


    exports.launch = function(_opt) {
        if (_opt) {
            opt = _opt;
            init();
        }
    }
});
