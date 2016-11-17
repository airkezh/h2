fml.use('wap/app/countdown' , function(){
	this();  
});
fml.define('wap/page/activity/beauty99' , ['wap/zepto'] , function(require , exports){
	/*var notice = [];
	$('.wakebox').each(function(i){
		notice[i]= $(this).attr('notice_name');
	});
	notice = notice.join(',');*/
	$.get('/aj/activity/wakeup' , {'type' : '' , 'act_name' : 'beauty99' , 'app_access_token' : Meilishuo.config.app_access_token} , function(){} , 'json');
	$('.wake_btn').on('click' , function(){
		var wake = $(this);
		$.get('/aj/activity/wakeup' , {'type' : 'add' , 'act_name' : 'beauty99' , 'app_access_token' : Meilishuo.config.app_access_token} , function(res){
			if(res.data == 1) wake.attr('class' , 'waked_btn').html('√ 提醒我')		
		} , 'json');	
	});
	$('#login').on('click' , function(){
		$(this).html('领特权');
		var login_url = $(this).attr('href');
		location.href = login_url;
		$(this).attr('href' , '');
		return false;
	});

});
