/*common*/
	var	$ = require('jquery')
	,Alert = require('ui/alert'),scroll = require('component/windowScroll');
    var check = require('app/checkLogin');
    var login = require('app/login');
    var shareTmp = require('component/shareTmp');
    var dialogUI = require('ui/dialog');
    var couponJs = require('page/huodong/promotion/dc_coupon');
    var rightMenu = require('page/huodong/promotion/rightNav');
	var a = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}
    couponJs.couponView({
        "rootUrl" : fml.vars.picHost + "images/biz/promotion/sale_141225/couponBtn/"
        , "codeUrl" : "/promotion/captcha?date="
        , "couponVenue" : "/aj/sale/coupon_venue12"
        , "couponApply" : "/aj/sale/coupon_apply12"
        , "getCaptcha" : "/aj/sale/get_code12"
        , "checkCaptcha" : "/aj/sale/check_code12"
        , "tipName" : "christmas_141220"             //接口参数
        , "activityDay" : "2014-12-23"      //活动当天
    });
    couponJs.clockView({
        "noStartText" : "距离活动开始还有"
        , "startText" : "距离活动结束还有"
        , "endText" : "活动已结束"
        , "startTime" : "2015/1/20 10:00:00"
        , "endTime" : "2015/1/28 00:00:00"
    });
    rightMenu.rNav('/aj/sale/right_nav125');
    $(window).scroll(function(event) {
        var scoll = $(document).scrollTop();
        if (scoll > 180) {
            $('.nav_right').show();
        }else{
            $('.nav_right').hide();
        }
    });
    $(".nav_main .nav_a1").addClass("current");
    $(".go_top").on("click",function(){
        $(window).scrollTop(0);
    });
    //活动规则弹出框
    $.ajax({
        url : '/aj/sale/rule_common125',
        type : "post",
        data : {},
        dataType : "json",
        async : false,
        success : function( data ){
            if( data.code == 0 ){
                var res = data.data;
                activityWin( res );
            }
        },
        error:function(){
            alert('系统繁忙，请稍后再试');
        }
    })

    function activityWin( ele ){
        $(".rule_btn").on("click" , function(){
            var tpl = shareTmp('activity_main');
            var html = tpl;
            var layer = new dialogUI({ 
                'content':html ,
                'width': ele.background.width+'px' , 
                'onStart':function(){
                    $('#overlay').addClass('over');
                },
                'onChange' : function(){
                    var bgImg = ele.background;
                    var winBtn = ele.top_close_btn;
                    var oImg = "<img src="+ bgImg.img +">";
                    $(".ac_main").append(oImg);
                    $(".ac_main").css({'width' : bgImg.width+'px' , 'height' : bgImg.height+'px'})
                    $(".ac_main .ac_close").css({'width': winBtn.width+'px' , 'height' : winBtn.height+'px' , 'left' : winBtn.horizontal+'px' , 'top' : winBtn.vertical+'px' })
                    $('#dialogTitle').hide();
                    $('#dialogLayer').css({'background' : 'none' , 'padding' : '0' , 'top' : '30px'});
                    $('#dialogContent').css({'background' : 'none' , 'padding' : '0'});
                    $(".over").css({'background' : 'rgba(0, 0, 0,.5)'});
                },
                'onClose' : function(){
                    $('#overlay').removeClass('over');
                }
            }); 
            $('.ac_close').on('click' , function(){
                layer.drive.destroyModel();
            });
        });       
    }

