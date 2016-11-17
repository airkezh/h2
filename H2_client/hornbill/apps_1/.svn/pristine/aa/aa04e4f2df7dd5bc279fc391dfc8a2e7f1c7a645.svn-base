fml.define('wap/page/activity/bedook' , ['wap/zepto' , 'wap/app/doota/timedown' , 'wap/app/alert'] , function(require , exports){
	var m_alert = require('wap/app/alert');
	window.MLS = {
		didLogin : function() {
			// 成功登录，跳转到下一步
			window.location.reload();
		}
	};
	$('.coupon').on('click' , function(event){
		event.preventDefault();
		/*登录*/
		if(fml.vars.isLogin == 0){
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
		var tid = $(this).attr('tid');
		$.ajax({
			'url' : '/aj/activity/bedook',
			'data' : { 'tid' : tid },
			'dataType' : 'json',
			'type' : 'post',
			'success' : function(data){
				m_alert({ dialogContent : data.message });
			},
			'error' : function(){
				alert('系统错误，领取失败');	
			}
		});
	});

	/*倒计时*/
	window.timedown = require('timedown');
	$('.time').each(function(){
        var _this = $(this);
        _this.removeClass('time');
        timedown.down(this, _this.attr('remain') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
        .onTimeOver(function(){
            window.location.reload();   
        }).correct(); 
    }); 


})
