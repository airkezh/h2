fml.define('app/huodong/916coupon' , ['jquery','ui/alert','app/login','app/checkLogin','app/checkcode'] , function(require, exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');
	var Alert = require('ui/alert');
	var login = require('app/login');
	var checkcode = require('app/checkcode');
	var alert = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
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

    var inputBox = '<div class="code"><input class="login_txt" id="checkcode" name="checkcode" type="text" placeholder="请输入验证码" maxlength="4" /><div class="checkImage" onselectstart="return false;"><img width="90" height="36" src=""></div></div>';

	function runCode(){
		//更新验证码
		checkcode();
		var isDelay;
		$('.checkImage').click(function(){
			if(isDelay) return;

			checkcode();

			isDelay = 1;
			setTimeout(function(){
				isDelay = 0;
			},500);
		});
	}

	coupon();
	function coupon(){
		$('.get_coupon').click(function(){
			if(!check()) return false;
			var _this = $(this);
			coupon_id = _this.attr('data-code');
			type = _this.attr('data-type');
			var leftAmount = _this.prev("p").find("span").eq(0).text();
			/* 字符串加密*/
			var key = fml.vars.key;
			var strKey = key.split("").reverse().join("") + "*" + (new Date().getTime()/1000);
			var cc = new coder();

            $.ajax({
                url:'/aj/sale/coupon_apply916',
                data:{
                    'type' : type,
                    'code': coupon_id,
                    'key' : cc.encode(strKey)
                },
                type:'post',
                dataType:'json',
                success: function(data){
                    if( data.islogin == 0 ){
                        alert("请登录");
                    }
                    if(data.success == 1){
                        var canUse = data.type;
                        var pClassName40 = _this.parent().hasClass("m40");
                        var pClassName80 = _this.parent().hasClass("m80");
                        var pClassName120 = _this.parent().hasClass("m120");
                        if( pClassName40 ) {
                            if(new Date().getDate() < 16){
                                if( canUse == 1){
                                    _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/2again.jpg");
                                }else{
                                    _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/2again2.jpg");
                                }
                            }else {
                                _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/2active.jpg");
                            };
                            _this.prev("p").find("span").eq(0).text( leftAmount-1 );
                            alert(data.tips);
                        }else if( pClassName80 ){
                            if(new Date().getDate() < 16){
                                if( canUse == 1){
                                    _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/3again.jpg");
                                }else{
                                    _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/3again3.jpg");
                                }

                            }else {
                                _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/3active.jpg");
                            };
                            _this.prev("p").find("span").eq(0).text( leftAmount-1 );
                            alert(data.tips);
                        }else if(pClassName120){
                            if(new Date().getDate() < 16){
                                if( canUse == 1){
                                    _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/4again.jpg");
                                }else{
                                    _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/4again4.jpg");
                                }

                            }else {
                                _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/4active.jpg");
                            };
                            _this.prev("p").find("span").eq(0).text( leftAmount-1 );
                            alert(data.tips);
                        }
                    }else{
                        alert(data.tips);
                    }
                },
                error:function(){
                    alert('系统繁忙，请稍后再试');
                }
            })

			

		});
	}
});
