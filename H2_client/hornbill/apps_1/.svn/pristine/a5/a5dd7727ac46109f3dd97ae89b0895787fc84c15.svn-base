fml.define('wap/page/biz/zero',['wap/zepto/touch', 'wap/component/shareTmp', 'wap/app/dialog'] ,function(require){
	var shareTmp = require('wap/component/shareTmp');

	$('.disable1 .zero_btn').on('tap', function(){
		$.fn.dialog({
			dialogContent : shareTmp('zero_login')
		})
	});
	$('.disable2 .zero_btn').on('tap', function(){
		$.fn.dialog({
			dialogContent : shareTmp('zero_buy')
		})
	});
	$('.available .zero_btn').on('tap', function(){
		var twitter_id = $(this).parents('.poster_wall').attr('twitter_id')
		$.fn.dialog({
			dialogContent : shareTmp('zero_confirm')
			, dialogTitle : ''
			, onLoad : function(){
				$('.zeroAddBtn').on('tap', function(event){
					event.preventDefault();
					var data = {
						twitter_id : twitter_id
						, type : 'mob'
						, app_access_token : Meilishuo.config.app_access_token
					}
					$.get('/aj/biz/zero_add' , data , function(res){
						if(res.data.status == 1){
							$('body').html(shareTmp('zero_success', res.data))	
							$('.zeroSuccessBtn').on('tap', function(){
								window.location.reload();
							});
						}else if(res.data.status == 2){
							$('#dialogContent').html(shareTmp('zero_done'))
						}else if(res.data.status == 0){
							$('#dialogContent').html(shareTmp('zero_fail'))
						}
					} , 'json');
				})
				$('.zeroAddBtn, .closeDialog').on('touchend', function(event){
					event.preventDefault();
				});	
			}
		});
	})
	
	
});
