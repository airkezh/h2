fml.define('wap/page/activity/penny' , ['wap/zepto/touch','wap/app/doota/timedown'] , function(require, exports){

	//活动说明
	$('.intro_cont').hide();
	$('.intro_title').on('tap',function(){
		var $that = $(this);
		$that.siblings('.intro_cont').toggle();	
	});

	/*倒计时*/
	window.timedown = require('timedown');
	$('.time').each(function(){
        var _this = $(this);
        _this.removeClass('time');
        timedown.down(this, _this.attr('remain') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
        .onTimeOver(function(){
            //window.location.reload();   
        }).correct(); 
    });

    //获取订单量
    var twitter_id_arr = []
    $('.goods_num').map(function(idx, data){
    	twitter_id_arr.push($(data).attr('twitter_id'));
    })

    var tid = twitter_id_arr.join(',')
	$.get('/aj/doota/orderNum?twitter_id='+tid,function(data){
		if(data.info){
			data.info.map(function(t, idx){
				$('.apply_num_' + t.twitter_id).text(t.order_num);
			})
		}
	},'json');
});

