fml.use('app/clubAction' , function(){
	this.clubLike('.cl_like', '.cnt_item');
	this.replyDelete('.cl_delete', '.cnt_item', '.cnt_item');
	this.clubLikeHover('.cl_like', '.cnt_item');
});
fml.define('page/huodong/mz_beautyBox' , ['jquery', 'ui/alert','app/checkLogin', 'component/callApi'] , function(require , exports){
	var alertUI = require('ui/alert');
	var check = require('app/checkLogin');
	var callApi = require('component/callApi');
	$('#goTopBtn').bind('click' , function(){
		$('body,html').stop(true , true).animate({ scrollTop: 0 }, 250);
		return false;
	});
	var alertMsg = function(text){
		new alertUI({
			content : text,
			width : '370px'
		});
	};
	$('.get_coupon').on('click', function(){
		if(!check()) return false;

		callApi.write({'url': '/coupon/coupon_apply'}, {coupon_apply_code: fml.vars.coupon_apply_code_1}, function(data){
			if(data.code == 3){
				alertMsg('已经领取过了');
			} else if (data.code) {
				alertMsg(data.message);
			}else{
				callApi.write({'url': '/coupon/coupon_apply'}, {coupon_apply_code: fml.vars.coupon_apply_code_2}, function(data){
					if (data.code) {
						alertMsg(data.message);
					}else{
						alertMsg('领取成功！');
					}
				});
			}
		});
	});
});
