fml.define('page/huodong/promotion/act1412' , ['page/huodong/promotion/dc_coupon' , 'ui/dialog' , 'component/shareTmp', 'jquery','ui/alert','app/login','app/checkLogin','component/windowScroll',] , function(require, exports){
	var	$ = require('jquery')
	,Alert = require('ui/alert'),scroll = require('component/windowScroll');
    var check = require('app/checkLogin');
    var login = require('app/login');
    var shareTmp = require('component/shareTmp');
    var dialogUI = require('ui/dialog');
    var couponJs = require('page/huodong/promotion/dc_coupon');
	var a = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}
    couponJs.couponView({
        "rootUrl" : fml.vars.picHost + "images/biz/promotion/sale_141212/couponBtn/"
        , "codeUrl" : "/promotion/captcha?date="
        , "couponVenue" : "/aj/sale/coupon_venue12"
        , "couponApply" : "/aj/sale/coupon_apply12"
        , "getCaptcha" : "/aj/sale/get_code12"
        , "checkCaptcha" : "/aj/sale/check_code12"
        , "tipName" : "reward_141212"             //接口参数
        , "activityDay" : "2014-12-12"      //活动当天
    });
    couponJs.clockView({
        "noStartText" : "距1212年末犒劳节开抢，还有"
        , "startText" : "距1212年末犒劳节结束，还有"
        , "endText" : "活动已结束"
        , "startTime" : "2014/12/11 20:00:00"
        , "endTime" : "2014/12/15 00:00:00"
    });
    $(window).scroll(function(event) {
        var scoll = $(document).scrollTop();
        if (scoll > 180) {
            $('.nav_right').show();
        }else{
            $('.nav_right').hide();
        }
    });
    $(".go_top").on("click",function(){
        $(window).scrollTop(0);
    });
    $(".coupon_main .code_btn").mouseover(function(){
        $(this).next(".code_box").show();
        $(".code_box").on("click",function(){
            return false;
        });
    });
    $("body").on("click",function(){
        $(".code_box").hide();
    });
    //活动规则弹出框
    activityWin();
    function activityWin(){
        $(".activity_btn").on("click" , function(){
            var tpl = shareTmp('activity_main');
            var html = tpl;
            var layer = new dialogUI({ 
                'content':html ,
                'width': '760px' , 
                'onStart':function(){
                    $('#overlay').addClass('over');
                },
                'onChange' : function(){
                    $('#dialogTitle').hide(); 
                    $('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
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
});
