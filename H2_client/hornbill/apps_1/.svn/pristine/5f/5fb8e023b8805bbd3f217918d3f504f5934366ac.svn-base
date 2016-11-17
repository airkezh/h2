fml.define('page/huodong/shop1111' , ['app/doota/timedown','jquery','ui/dialog','component/shareTmp',  'ui/alert','app/login','app/checkLogin','component/windowScroll','ui/encrypt'] , function(require, exports){
    var $ = require('jquery')
    ,Alert = require('ui/alert'),scroll = require('component/windowScroll');
    var check = require('app/checkLogin');
    var encrypt = require('ui/encrypt');
    var shareTmp = require('component/shareTmp');
    var dialogUI = require('ui/dialog');
    var login = require('app/login');
    var a = function(msg){
        return new Alert({
            content:msg,
            width:380
        });
    }
    
    var imgUrl = "http://i.meilishuo.net/css/images/huodong/shop1111/";
    $(".couponBox"+1).find("img").attr("src",imgUrl+"ing_11.png");
    $(".couponBox"+2).find("img").attr("src",imgUrl+"ing_11.png");
    $(".couponBox"+3).find("img").attr("src",imgUrl+"ing_11.png");
    
    $('.mls_coupon .get_btn').on('click', function(){
        window.open('http://qiang.meilishuo.com/biz/sale/act11/')
    })
    
    var codePicUrl = 'http://qiang.meilishuo.com/customactivity/captcha?date=';
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
    //图片弹出框
    function couponSuccess(){
            var tpl = shareTmp('coupon_success');
            var html = tpl;
            var lenovo_dia = new dialogUI({ 
                'content':html , 
                'width': '460px' , 
                'onStart':function(){
                    $('#overlay').addClass('over');
                },
                'onChange' : function(){
                    $('#dialogTitle').hide(); 

                },
                'onClose' : function(){
                    $('#overlay').removeClass('over');
                }
            }); 
            $('.coupon_close,.c_suc_btn').on('click' , function(){
                lenovo_dia.drive.destroyModel();    
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
    var captcha_type,current_time,userLogin;
    couponVenue();
    // 加载优惠券状态
    function couponVenue(){
        $.ajax({
            url:"/aj/sale/coupon_venue11",
            type:"post",
            data:{},
            dataType:"json",
            async : false,
            success:function(data){
                userLogin = data.islogin;
                captcha_type = data.captcha_type;
                var coupons = data.coupon;
                var imgUrl = "http://i.meilishuo.net/css/images/huodong/shop1111/";
                current_time = data.timestamp;
                $.each(coupons, function( k , couponDate ){
                    var i = k + 1;
                    couponType = couponDate.threshold+":"+couponDate.credit+":"+couponDate.id;
                    $(".couponBox"+ i).find('a').attr('data-type', couponType);
                    $(".couponBox"+ i).find('a').attr('data-code', couponDate.coupon_code);
                    $(".couponBox"+ i).find('a').attr('data-key', data.key);
                    $(".couponBox"+ i).find('a').attr('data-name', 'dacu_1111');
                    /*if( couponDate.left_amount > 0 ){
                        $(".couponBox"+ i).find('p').html("还剩<span>" + couponDate.left_amount + "</span>张");
                    }*/
                    // switch (couponDate.can_use){
                    //     case 0:
                    //         if( !couponDate.left_amount){
                    //             $(".couponBox"+i).find("img").attr("src",imgUrl+"8time_11.png");
                    //         }else{
                    //             $(".couponBox"+i).find("img").attr("src",imgUrl+"ing_11.png");
                    //             $(".couponBox"+i).find("a").addClass("get_coupon");
                    //         }
                    //     break;
                    //     case 1:
                    //         var nextTime = couponDate.next.begin;
                    //         var nextT = nextTime.split(" ");
                    //         var t = parseInt(nextT[1]);
                    //         var nowH = new Date().getHours();
                    //         if( nowH >= 21 && nowH <=24 ){
                    //             $(".couponBox"+i).find("img").attr("src",imgUrl+"tomorrow_11.jpg");
                    //         }else{
                    //             $(".couponBox"+i).find("img").attr("src",imgUrl+ t +"time_11.png");   
                    //         }
                    //     break;
                    //     case 2:
                    //         if( new Date().getTime() < new Date('2014-11-11').setHours(0) ){
                    //             $(".couponBox"+i).find("img").attr("src",imgUrl+"again_11.jpg");
                    //         }else{
                    //             $(".couponBox"+i).find("img").attr("src",imgUrl+"active_11.jpg");
                    //         }
                    //     break;
                    // }
                })
                // 抢优惠券
                coupon();
            },
            error:function(){
                a('系统繁忙，请稍后再试');
            }
        });
        
    }

    function encode2(key,type) {
        switch(type) {
            case 2 : 
                var pos = key.length - 4;
                key = key.substr(4) + key.substring(0, 4);
                return new coder().encode(key);
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
    function coupon(){
        $('.get_coupon').on('click',function(event){
            if( userLogin == 0){
                event.preventDefault();
                window.location.href = "/user/login";
                return false;
            }
            var _this = $(this);
            var imgPic = _this.find('img').attr('src');
            var getCouponType =  _this.attr('data-type');
            var getCouponCode = _this.attr('data-code');
            var getCouponName = _this.attr('data-name');
            var getCouponKey = _this.attr('data-key');
            var strKey = encode2( getCouponKey , 2 );
            var leftAmount = _this.next("p").find("span").eq(0).text();
            // 验证码
            if( captcha_type == 1 ){
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
            }else if( captcha_type == 2 ){
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
                
            }else{
                checkCoupon();
            }
            
            /* 字符串加密*/

            function checkCoupon(){
                if( imgPic != 'http://i.meilishuo.net/css/images/huodong/shop1111/ing_11.png'){return;}
                $.ajax({
                    url:'/aj/sale/coupon_apply11',
                    data:{
                        'type' : getCouponType,
                        'name' : getCouponName,
                        'code': getCouponCode,
                        'key' : strKey
                    },
                    type:'post',
                    dataType:'json',
                    success: function(data){
                        if( data.islogin == 0 ){
                            alert("请登录");
                        }
                        if(data.success == 1){
                            couponSuccess();
                            if( new Date().getTime() < new Date('2014-11-11').setHours(0) ){
                                _this.find("img").attr("src","http://i.meilishuo.net/css/images/huodong/shop1111/again_11.jpg");
                            }else{
                                _this.find("img").attr("src","http://i.meilishuo.net/css/images/huodong/shop1111/active_11.jpg");
                            }
                            leftAmount --;
                            if( leftAmount > 0 ){
                                _this.next("p").find("span").eq(0).text( leftAmount );
                            }else{
                                _this.next("p").remove();
                            }
                        }else{
                            a( data.tips );
                        }
                    },
                    error:function(){
                        a('系统繁忙，请稍后再试');
                    }
                });
            }
            
        });
    }
   
});
