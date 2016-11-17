fml.define('page/huodong/act11static' , ['app/doota/timedown','jquery','ui/dialog','component/shareTmp', 'component/storage' , 'ui/alert','app/login','app/checkLogin','component/windowScroll','ui/encrypt'] , function(require, exports){
	var	$ = require('jquery')
	,Alert = require('ui/alert'),scroll = require('component/windowScroll');
    var check = require('app/checkLogin');
    var encrypt = require('ui/encrypt');
    var shareTmp = require('component/shareTmp');
    var dialogUI = require('ui/dialog');
    var login = require('app/login');
    var storage = require('component/storage');
	var a = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}

	var timedown = require('app/doota/timedown');
	var $_this = this , waitsTime , codeMobTimer;
    //nav_right导航
    $('.nav_right').show();
    $(".go_top").on("click",function(){
        $(window).scrollTop(0);
    });
    // cookie设置
    var picUrl="http://i.meilishuo.net/css/images/biz/salePrice/";
    var getCookie = storage.getCookie('MLS_S_RZ');
    if( !getCookie ){
        window.location.href = "/user/login";
        return;
    }
    if ( new Date().getDate() < 11){
        getCookie += '_10';
    }
    var getNewCookie = storage.getCookie( getCookie );
    if( getNewCookie ){
        var newCookie = JSON.parse(getNewCookie);
        var getCouponBtn = $(".get_coupon");
            for(var i = 0;i < getCouponBtn.length;i++){
                if( newCookie[i] == 1 ){
                    if(new Date().getDate() <11 ){
                        getCouponBtn[i].find("img").attr("src", picUrl + 'again_11.png');
                    }else{
                        getCouponBtn[i].find("img").attr("src", picUrl + 'active_11.png');
                    }
                    
                }
            }
    }else{
        storage.setCookie( getCookie , "[]")
    }
    



    var codePicUrl = '/customactivity/captcha?date=';
    //图片弹出框
    function codePicWin(){
            var tpl = shareTmp('code_pic_main');
            var html = tpl;
            var lenovo_dia = new dialogUI({ 
                'content':html , 
                'width': '460px' , 
                'onStart':function(){
                    $('#overlay').addClass('over');
                },
                'onChange' : function(){
                    $('#dialogTitle').hide(); 
                    $('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
                    $(".img_code").attr('src', codePicUrl + new Date().getTime());

                },
                'onClose' : function(){
                    $('#overlay').removeClass('over');
                }
            }); 
            $('.code_reset,.code_main_close').on('click' , function(){
                lenovo_dia.drive.destroyModel();    
            });
            $(".input_box").on("click" ,function(){
                if($(this).val() == '输入验证码'){
                    $(this).val('');
                }
            });
            $(".code_reload").on("click" ,function(){
                $(".img_code").attr('src', codePicUrl + new Date().getTime());
            })  
    }
    //短信弹出框
    function codeMobWin(){
            var tpl = shareTmp('code_mob_main');
            var html = tpl;
            var lenovo_dia = new dialogUI({ 
                'content':html ,
                'width': '460px' , 
                'onStart':function(){
                    $('#overlay').addClass('over');
                },
                'onChange' : function(){
                    $('#dialogTitle').hide(); 
                    $('#dialogLayer').css({'background' : 'none' , 'padding' : '0'}); 
                },
                'onClose' : function(){
                    $('#overlay').removeClass('over');
                }
            }); 
            $('.code_main_close').on('click' , function(){
                lenovo_dia.drive.destroyModel();
                clearTimeout(codeMobTimer);
            });
            $(".code_mob_input").on("click" ,function(){
                if($(this).val() == '输入手机验证码'){
                    $(this).val('');
                }
            });
    }
    //短信弹出框倒计时
    waitsTime = 60;
    function waitTime(){ 
        if( waitsTime > 1){
            waitsTime --;
            $(".code_mob_btn").html( waitsTime  + "<span>秒后重新发送</span>" );
            codeMobTimer = setTimeout(waitTime,1000);
            $(".code_mob_btn").unbind("click");
        }else{
            clearTimeout( codeMobTimer );
            $(".code_mob_btn").text( "发送" );
            waitsTime = 60;
            $(".code_mob_btn").on("click",function(){
                getMobInfo();
            });
        }
    }
    function getMobInfo(){
        $.post('/aj/sale/get_code11' , function(data){
            if( data.islogin == 0){
                a("请登录");
            }
            if( data.status ==0 ){
                $(".code_mob_tips").text( data.tips );
            }
        },'json')
        waitTime();
    }
    var captcha_type,current_time;

    //加密。上线后删除该代码，用encode函数
    function encode2(key,type) {

        switch(type) {
            case 1 : //key.reverse+*+timestamp的base64编码
                var nKey = key.split('').reverse().join('') + '*' +new Date().getTime();
                var cc = new coder();
                return cc.encode(nKey);
                break;
            case 2 : //key循环左移4位的base64编码
                var pos = key.length - 4;
                key = key.substr(4) + key.substring(0, 4);
                return new coder().encode(key);
                break;
            case 3 : //key的sha1摘要 + #，循环右移3位的base64编码
                key = encrypt.HmacSHA1(key,'').toString() + "#";
                var pos = key.length - 3;
                key = key.substr(pos) + key.substring(0, pos);
                return  new coder().encode(key)
                break;
            case 4 : //key的md5编码 + %，循环右移4位的base64编码
                key = encrypt.MD5(key).toString() + "%";
                var pos = key.length - 4;
                key = key.substr(pos) + key.substring(0, pos);
                return new coder().encode(key)
                break;
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
    // 抢券
    coupon();
    function coupon(){
        $('.get_coupon').on('click',function(event){
            var _this = $(this);
            var imgPic = _this.find('img').attr('src');
            var getCouponType =  _this.attr('data-type');
            var getCouponCode = _this.attr('data-code');
            var getCouponKey = _this.attr('data-key');
            var strKey = encode2( getCouponKey , 2 );
            var leftAmount = _this.next("p").find("span").eq(0).text();
            
            /* 字符串加密*/
            checkCoupon();
            function checkCoupon(){
                if( imgPic != 'http://i.meilishuo.net/css/images/biz/salePrice/ing_11.png'){return false;}
                $.ajax({
                    url:'/aj/sale/coupon_apply11',
                    data:{
                        'type' : getCouponType,
                        'name' : 'encore_11',
                        'code': getCouponCode,
                        'key' : strKey
                    },
                    type:'post',
                    dataType:'json',
                    success: function(data){
                        var neq = _this.index();
                        if( data.islogin == 0 ){
                            window.location.href = "/user/login";
                            return false;
                        }
                        if( data.tips == '已经领取过'){
                            if( getCookie ){
                                var nc = JSON.parse(storage.getCookie(getCookie));
                                nc[neq] = 1;
                                storage.setCookie(getCookie, JSON.stringify(nc));
                                _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/" + (new Date().getDate() < 11 ? 'again_11.png' : 'active_11.png'));
                            }   
                        }
                        if( data.success == 1 ){
                            var nTime = new Date().getDate();
                            if( nTime < 11 ){
                                _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/again_11.png");
                            }else{
                                _this.find("img").attr("src","http://i.meilishuo.net/css/images/biz/salePrice/active_11.png");
                            }
                            leftAmount --;
                            if( leftAmount > 0 ){
                                _this.next("p").find("span").eq(0).text( leftAmount );
                            }else{
                                _this.next("p").remove();
                            }
                            if( getCookie ){
                                var nc = JSON.parse(storage.getCookie(getCookie));
                                nc[neq] = 1;
                                storage.setCookie( getCookie ,  JSON.stringify( nc ));
                            }
                            
                        }else{
                            if( data.captcha_type == 1 ){
                                codePicWin();
                                // 检测图片验证码
                                function checkCode(){
                                    var getPicCode = $(".input_box").val();
                                    $.ajax({
                                        url : '/aj/sale/check_code11',
                                        type : 'post',
                                        data : {
                                            'check_code' : getPicCode
                                        },
                                        dataType : 'JSON',
                                        async : false,
                                        success:function(data){
                                            if( data.islogin == 0 ){
                                                a("请登录");
                                            }
                                            if( data.status == 1){
                                                $('.code_reset').trigger('click');
                                                captcha_type = 0;
                                                checkCoupon();
                                            }else{
                                                $(".code_main .code_tips").show();
                                                $(".img_code").attr('src', codePicUrl + new Date().getTime())
                                                $(".code_tips").text("输错啦，请重新输入，要仔细点哦！")
                                            }   
                                        },
                                        error:function(){
                                            a('系统繁忙，请稍后再试');
                                        }
                                    })
                                }
                                $(".code_submit").on("click",function(){
                                    checkCode();
                                })
                            }else if( data.captcha_type == 2 ){
                                codeMobWin();
                                // 检测手机验证码
                                function checkMobCode(){
                                    var getMobCode = $(".code_mob_input").val();
                                    $.ajax({
                                        url : '/aj/sale/check_code11',
                                        type : 'post',
                                        data : {
                                            'check_code' : getMobCode
                                        },
                                        async : false,
                                        dataType : 'JSON',
                                        success:function(data){
                                            if( data.islogin == 0 ){
                                                a("请登录");
                                            }
                                            if( data.status == 1){
                                                $('.code_main_close').trigger('click');
                                                captcha_type = 0;
                                                checkCoupon();
                                            }else{
                                                $(".code_mob_tips").text("输入错误，请重新发送输入");
                                            }   
                                        },
                                        error:function(){
                                            a('系统繁忙，请稍后再试');
                                        }
                                    })
                                }
                                $(".code_mob_submit").on("click",function(){
                                    checkMobCode();
                                });
                                //获取短信
                                $(".code_mob_btn").on("click",function(){
                                    getMobInfo();
                                });
                            }
                        }
                    },
                    error:function(){
                        a('系统繁忙，请稍后再试');
                    }
                });
            }
            
        });
    }

    
    $('.time').each(function($_this){
        var _this = $(this);
        _this.removeClass('time');
        timedown.down(this, _this.attr('time') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
        .onAction(function() {
            var t = arguments[2];
            day = t.d && t.d != 0 ? (t.d < 10 ? "0" + t.d : t.d) : "00";
            hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
            min = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
            sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
            _this.html("<b>" + day + "</b>" + "天" + "<b>"+ hour +"</b>" + "时" + "<b>" + min + "</b>" + "分" + "<b>" + sec + "</b>" + "秒");
        }).onTimeOver(function(){
            window.location.reload();
        });
    });

    

   
});
