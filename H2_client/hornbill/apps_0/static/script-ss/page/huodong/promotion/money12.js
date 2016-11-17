fml.define('page/huodong/promotion/money12' , ['app/doota/timedown','jquery','ui/alert','component/windowScroll','app/subNavUp'] , function(require, exports){
	var	$ = require('jquery')
	,Alert = require('ui/alert')
	,scroll = require('component/windowScroll')
	,subNavUp = require('app/subNavUp')
	var alert = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	};
	var timedown = require('app/doota/timedown');
	var $_this = this;
	
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
    $(".nav_main .nav_a12").on("click" ,function(){
        if(!check()) return false;
        window.location.href = "http://order.meilishuo.com/coupon/";
    });

    //倒计时
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
    })

});
