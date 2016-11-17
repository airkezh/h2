fml.define('page/huodong/promotion/dc_coupon' , ['app/doota/timedown','jquery','ui/dialog','component/shareTmp',  'ui/alert','app/login','app/checkLogin','component/windowScroll','ui/encrypt'] , function(require, exports){
	var	$ = require('jquery')
	,Alert = require('ui/alert'),scroll = require('component/windowScroll');
    var check = require('app/checkLogin');
    var encrypt = require('ui/encrypt');
    var shareTmp = require('component/shareTmp');
    var dialogUI = require('ui/dialog');
    var login = require('app/login');
    var timedown = require('app/doota/timedown');
	var a = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}

	var waitsTime , codeMobTimer,captcha_type,current_time,userLogin; 
    var btnUrl,codePicUrl,couponReady,couponApply,getCaptcha,checkCaptcha,tipName,activityDay;  //参数变量
    //图片弹出框
    function codePicWin(){
            var tpl = shareTmp('code_pic_main');
            var html = tpl;
            var layer = new dialogUI({ 
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
                layer.drive.destroyModel();    
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
            var layer = new dialogUI({ 
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
                layer.drive.destroyModel();
                clearTimeout(codeMobTimer);
            });
            $(".code_mob_input").on("click" ,function(){
                if($(this).val() == '输入手机验证码'){
                    $(this).val('');
                }
            });
    }
    //领劵成功弹出框
    function couponSuccess(){
            var tpl = shareTmp('coupon_success');
            var html = tpl;
            var layer = new dialogUI({
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
                layer.drive.destroyModel();  
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
    // 获取短信验证
    function getMobInfo(){
        $.post( getCaptcha , function(data){
            if( data.islogin == 0){
                a("请登录");
            }
            if( data.status ==0 ){
                $(".code_mob_tips").text( data.tips );
            }
        },'json')
        waitTime();
    }
    // 加载优惠券状态
    function couponVenue( obj ){
        btnUrl = obj.rootUrl || '';
        codePicUrl = obj.codeUrl || '';
        couponReady = obj.couponVenue || '';
        couponApply = obj.couponApply || '';
        getCaptcha = obj.getCaptcha || '';
        checkCaptcha = obj.checkCaptcha || '';
        activityDay = obj.activityDay || '';
        tipName = obj.tipName || '';
        $.ajax({
            url: couponReady ,
            type:"post",
            data:{},
            dataType:"json",
            async : false,
            success:function(data){
                if( data.error_code == 0) {
                    userLogin = data.data.islogin;
                    captcha_type = data.data.captcha_type;
                    var coupons = data.data.coupon;
                    current_time = data.data.timestamp;     //保存时间
                    $.each( coupons ,function( k , couponDate){
                        couponDate.couponType = couponDate.threshold+":"+couponDate.credit+":"+couponDate.id;
                        couponDate.code = couponDate.coupon_code;
                        couponDate.pic = btnUrl;
                        couponDate.key = data.data.key;
                        switch ( couponDate.state ){
                            case 'can_apply' :
                                couponDate.pic += 'ing.png';
                                couponDate.ing = "get_coupon";
                            break;
                            // case 'not_start' :
                            //     couponDate.pic += 'no.png';
                            // break;
                            case 'applied' :
                                couponDate.pic += 'active.png';
                            break;
                            case 'apply_once_more' :
                                couponDate.pic += 'again.png';
                            break;
                            case 'tomorrow' :
                                couponDate.pic += 'tomorrow.png';
                            break;
                            case 'empty' :
                                couponDate.pic += 'empty.png';
                            break;
                            default:
                                couponDate.pic += couponDate.state + 'time.png';
                        }
                    });
                    var tpl = shareTmp("coupon_wrap" , {
                        "coupons" : coupons
                    });
                    $("#coupons_main").append(tpl);
                    // 抢优惠券
                    coupon();
                }
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
            // 验证码
            if( captcha_type == 1 ){
                codePicWin();
                // 检测图片验证码
                function checkCode(_this){
                    var _this = _this;
                    var getPicCode = $(".input_box").val();
                    $.ajax({
                        url : checkCaptcha,
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
                                checkCoupon(_this);
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
                    checkCode(_this);
                })
            }else if( captcha_type == 2 ){
                codeMobWin();
                // 检测手机验证码
                function checkMobCode(_this){
                    var _this = _this;
                    var getMobCode = $(".code_mob_input").val();
                    $.ajax({
                        url : checkCaptcha,
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
                                checkCoupon(_this);
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
                    checkMobCode(_this);
                });
                //获取短信
                $(".code_mob_btn").on("click",function(){
                    getMobInfo();
                });
                
            }else{
                checkCoupon(_this);
            }
            
        });
    }
    // 抢券验证
            function checkCoupon(_this){
                var imgPic = _this.find('img').attr('src');
                var getCouponType =  _this.attr('data-type');
                var getCouponCode = _this.attr('data-code');
                var getCouponKey = _this.attr('data-key');
                var strKey = encode2( getCouponKey , 2 );   /* 字符串加密*/
                var leftAmount = _this.next("p").find("span").eq(0).text();
                if( imgPic.indexOf('ing.png') <= 0 ){return;}

                $.ajax({
                    url: couponApply,
                    data:{
                        'type' : getCouponType,
                        'name' : tipName,
                        'code': getCouponCode,
                        'key' : strKey
                    },
                    type:'post',
                    dataType:'json',
                    success: function(data){
                        if( data.error_code == 0 ){
                            if( data.data.islogin == 0 ){
                                alert("请登录");
                            }
                            if(data.data.success == 1){
                                couponSuccess();
                                if( new Date().getTime() < new Date( activityDay ).setHours(0) ){
                                    _this.find("img").attr("src", btnUrl + "again.png");
                                }else{
                                    _this.find("img").attr("src", btnUrl + "active.png");
                                }
                                leftAmount --;
                                if( leftAmount > 0 ){
                                    _this.next("p").find("span").eq(0).text( leftAmount );
                                    // _this.next("p").html("还剩<span>" + leftAmount + "</span>张")
                                }else{
                                    _this.next("p").remove();
                                }
                            }else{
                                a( data.data.tips );
                            }
                        }  
                    },
                    error:function(){
                        a('系统繁忙，请稍后再试');
                    }
                });
            }
 
    //倒计时
    function getClock( opts ){
        var end_time = opts.endTime || ''
            , s_time = opts.startTime || ''
            , start_time,tips,countdown_text,countdown_time;
        cur_time = new Date( current_time );
        start_time = new Date(s_time);
        end_time = new Date(end_time);
        if( cur_time < start_time ){
            tips = "nostart";
            countdown_text = opts.noStartText || '距离活动开始';
            countdown_time = start_time;
        }else if(cur_time >= start_time && cur_time <= end_time){
            tips = "ing";
            countdown_text = opts.startText || '距离活动结束';
            countdown_time = end_time;
        }else{ 
            tips = "end";
            countdown_text = opts.endText || '活动已结束';
        }
        if(tips != "end"){
            $(".clock").find("em").html(countdown_text);
            $(".time").attr("time", new Date(countdown_time).getTime()/1000 - new Date( current_time ).getTime() / 1000)
        }else{
            $(".clock").html(countdown_text).css("text-align","center");
        }
        $('.time').each(function(){
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
    }
    exports.couponView = couponVenue;
    exports.clockView = getClock;
    
});
