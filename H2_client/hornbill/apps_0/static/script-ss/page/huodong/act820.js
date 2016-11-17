fml.define('page/huodong/act820' , ['app/doota/timedown','jquery','ui/alert'] , function(require, exports){
	var	$ = require('jquery')
	,Alert = require('ui/alert');
	var alert = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}
	var timedown = require('app/doota/timedown');
	var $_this = this;
	var k = fml.vars.k;
	if(k){
		//debugger;
		$(".content > a").eq(k-1).addClass("current").siblings().removeClass("current");
	}
	
	$(window).scroll(function(event) {
		var scoll = $(document).scrollTop();
		if (scoll > 300) {
			$('.rignav').show();
		}else{
			$('.rignav').hide();
		}
	});
    $(".gotop").on("click",function(){
    	$(window).scrollTop(0);
    })
    //定时器
    var cDate = new Date(fml.vars.sTime);
    var sDay = cDate.getDate();
    var currRemainDay = +$("#remainDay").text();
    setInterval(function() {
        cDate.setTime(cDate.getTime() + 1000);
        var cDay = cDate.getDate();
        if (cDay != sDay) {
            if (currRemainDay < 20 && cDay >= 20) {
                if (cDay == 22) {
                    $(".banner_top").html('<span>大促活动最后一天</span>');
                } else if(cDay > 22) {
                    $(".banner_top").html('<span>活动已结束</span>');
                } else {
                    $(".banner_top").html('<span>距活动结束还有<span id="remainDay" style="color: #ff0000">'+ (22 - cDay)+'</span>天</span>');
                }
            } else {
                if (cDay == 19) {
                    $(".banner_top").text("活动开始就在明天");
                    $("#remainDay").text('');
                } else {
                    $("#remainDay").text(20 - cDay);
                }

            }

        }
    }, 1000);
});
