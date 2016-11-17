fml.define("wap/page/activity/promotion/main916", ['wap/ui/alert', 'wap/zepto', 'wap/ui/confirm', 'wap/app/findPwd'], function (require, exports) {
    var a = require('wap/ui/alert');
    var confirm = require('wap/ui/confirm');
    var checkCode = require('wap/app/findPwd');

    //登陆成功后的回掉函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

    //alert("后台返回登陆code：" + fml.vars.isLogin);
    var cc = new coder();

    $("img[type]").on("click", function() {
        if ($(this).attr("src").indexOf("/get_btn") < 0) return;

        if(!fml.vars.isLogin){
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        var _this = $(this);

        var cType = _this.attr("type");
        var cCode = _this.attr("code");

        $.ajax({
            url : "/aw/sale/get916Coupon",
            data:{
                'type': cType,
                'code' : cCode,
                'key' : cc.encode(fml.vars.signKey.split("").reverse().join("") + "*" + (new Date().getTime()/1000))
            },
            type : "post",
            dataType : "json",
            timeout : 5000,
            success : function(data) {
                //alert(JSON.stringify(data));
                if (data.success == 1) { //领取成功
                    var picUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/916/";
                    var btnPicSuffix;
                    switch(+cType) {
                        case 1 : btnPicSuffix = "100"; break;
                        case 2 : btnPicSuffix = "40"; break;
                        case 3 : btnPicSuffix = "80"; break;
                        case 4 : btnPicSuffix = "120";
                    }
                    if (new Date(fml.vars.sTime).getDate() < 16) {
                        if (data.type == 1) {
                            picUrl += "916_get_btn" + btnPicSuffix + ".jpg";
                        } else {
                            picUrl += "916_get_btn" + btnPicSuffix + "_01.jpg";
                        }

                    } else {
                        picUrl += "already_get_btn"  + btnPicSuffix + ".jpg";
                    }
                    _this.attr("src", picUrl);
                    //剩余券数减1
                    var la = _this.parent().find(".leftAmount").eq(0);
                    la.text(+la.text() - 1);

                    new a({
                        content : data.tips,
                        onSure : function () {
                            return;
                        }
                    });
                } else { //没抢到
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


    });

    /*alert($(".sign img").length);
    $(".sign img").on("tap", function() {
        alert(11);
        window.location.href = "http://mapp.meilishuo.com/activity/sign/sign_in/?frm=916dacu";
    })*/


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


});
