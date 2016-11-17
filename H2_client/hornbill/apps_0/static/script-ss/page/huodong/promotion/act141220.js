fml.define('page/huodong/promotion/act141220' , ['page/huodong/promotion/dc_coupon' , 'ui/dialog' , 'component/shareTmp', 'jquery','ui/alert','app/login','app/checkLogin','component/windowScroll',] , function(require, exports){
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
        "rootUrl" : fml.vars.picHost + "images/biz/promotion/sale_141220/couponBtn/"
        , "codeUrl" : "/promotion/captcha?date="
        , "couponVenue" : "/aj/sale/coupon_venue12"
        , "couponApply" : "/aj/sale/coupon_apply12"
        , "getCaptcha" : "/aj/sale/get_code12"
        , "checkCaptcha" : "/aj/sale/check_code12"
        , "tipName" : "christmas_141220"             //接口参数
        , "activityDay" : "2014-12-23"      //活动当天
    });
    //活动规则弹出框
    activityWin();
    $(".coupon_main .code_btn").mouseover(function(){
        $(this).next(".code_box").show();
        $(".code_box").on("click",function(){
            return false;
        });
    });
    $("body").on("click",function(){
        $(".code_box").hide();
    });
    // 气泡效果
    $(".menu_box div").mouseover(function(){
        $(this).addClass("add_action");
    });
    $(".menu_box div").mouseout(function(){
        $(this).removeClass("add_action");
    });
    // 商品列表
    var shopData = fml.vars.shopData;
    var shopInfo = [];
    for( var i in shopData){
        shopInfo[i] = shopData[i].tInfo;
        var tpl = shareTmp("posterWall",{ 'info' : shopInfo});
        $('.nav_main' + i).append(tpl);
    }

    snowUp({
            minSize: 5,     //雪花的最小尺寸
            maxSize: 30,    //雪花的最大尺寸
            newOn: 500      //雪花出现的频率 这个数值越小雪花越多
    });
    function snowUp (options){
        var $flake= $('<div class="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('&#10052;'),
                documentHeight  = $(document).height(),
                documentWidth   = $(document).width(),
                defaults        = {
                                    minSize     : 10,       //雪花的最小尺寸
                                    maxSize     : 20,       //雪花的最大尺寸
                                    newOn       : 1000,     //雪花出现的频率
                                    flakeColor  : "#FFFFFF"
                                },
                options         = $.extend({}, defaults, options);
                var interval        = setInterval( function(){
                    var startPositionLeft   = Math.random() * documentWidth - 100,
                    startOpacity        = 0.5 + Math.random(),
                    sizeFlake           = options.minSize + Math.random() * options.maxSize,
                    endPositionTop      = documentHeight - 40,
                    endPositionLeft     = startPositionLeft - 100 + Math.random() * 500,
                    durationFall        = documentHeight * 10 + Math.random() * 5000;
                    $flake.clone().appendTo('body').css({
                            left: startPositionLeft,
                            opacity: startOpacity,
                            'font-size': sizeFlake,
                            color: options.flakeColor
                        }).animate({
                            top: endPositionTop,
                            left: endPositionLeft,
                            
                        },durationFall,'linear',function(){
                            $(this).remove()
                        }
                    );       
                }, options.newOn);
    }
    function activityWin(){
        $(".activity_link").on("click" , function(){
            var tpl = shareTmp('activity_main');
            var html = tpl;
            var layer = new dialogUI({ 
                'content':html ,
                'width': '890px' , 
                'onStart':function(){
                    $('#overlay').addClass('over');
                },
                'onChange' : function(){
                    $('#dialogTitle').hide();
                    $('#dialogLayer').css({'background' : 'none' , 'padding' : '0' ,'top' :'0'});
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
        })     
    }
});
