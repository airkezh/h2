/*common*/
require('wap/zepto')
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');
var lazy = require('wap/component/lazzyLoad')
var urlHandle = require("wap/component/urlHandle");
var _alert = require('wap/ui/alert');

var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.load().scroll()

var a = function(msg){
    return new _alert({
        content : msg
    })
}

var tpl = shareTmp('goods-block-tpl', {'goodsBlock' : fml.vars.goodsBlock});
$('.center').eq(0).append(tpl);

//第二弹弹层
$(".act2").on("click", function() {
    var tpl = shareTmp('temp_get_succ');
    $("body").append(tpl);
});

$("body").on("click", ".sure_get_succ", function() {
    $(".shade").remove();
    $(".get_success").remove();
})


//活动规则
$(".rule").on("click", function() {
    $("body").append($("#rule_tpl").html());
});

$("body").on("click", ".rule_dialog_btn", function() {
    $(".rule_dialog").remove();
    $(".shade").remove();
});

$("body").on("click", ".rule_close_btn", function() {
    $(".rule_dialog").remove();
    $(".shade").remove();
});


$.fn.snow = function(options){
    var $flake = $('<div class="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('&#10052;'),
        documentHeight = $(document).height(),
        documentWidth = $(document).width(),
        defaults = {
            minSize	: 10,		//雪花的最小尺寸
            maxSize	: 20,		//雪花的最大尺寸
            newOn : 10000,		//雪花出现的频率
            flakeColor : "#FFFFFF"
        },
        options	= $.extend({}, defaults, options);
    setInterval( function(){
        var startPositionLeft 	= Math.random() * documentWidth - 25,
            startOpacity		= 0.5 + Math.random(),
            sizeFlake			= options.minSize + Math.random() * options.maxSize,
            endPositionTop		= documentHeight - 40,
            endPositionLeft		= startPositionLeft - 100 + Math.random() * 500,
            durationFall		= documentHeight * 10 + Math.random() * 5000;
        $flake.clone().appendTo('body').css({
            left: startPositionLeft,
            opacity: startOpacity,
            'font-size': sizeFlake,
            color: options.flakeColor
        }).animate({
                top: endPositionTop,
                left: endPositionLeft
            },durationFall,'linear',function(){
                $(this).remove()
            }
        );
    }, options.newOn);
};

$.fn.snow({
    minSize: 8,		//雪花的最小尺寸
    maxSize: 20, 	//雪花的最大尺寸
    newOn: 420		//雪花出现的频率 这个数值越小雪花越多
});


// gotop
var $gotop = $('.gotop'),
    onscroll = require('wap/component/windowScroll');
$gotop.on("click" , function(){
    document.body.scrollTop = 0;
});
function gotop(pos,isDown){
    if(pos < 30){
        $gotop.hide();
    } else {
        $gotop.show();
    }
}
onscroll.bind(gotop,'gotop');