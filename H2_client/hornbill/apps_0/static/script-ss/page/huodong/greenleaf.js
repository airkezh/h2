fml.define('page/huodong/greenleaf' , ['jquery','ui/alert','component/shareTmp','ui/dialog','app/checkLogin','component/callApi'] , function(require, exports){
  	
	var check = require('app/checkLogin'),
		shareTmp = require('component/shareTmp'),
		Alert = require('ui/alert'),
		dialog = require('ui/dialog'),
		callApi = require('component/callApi');


	var alert = function(msg){
		return new Alert({
			content:msg,
			width:370
		});
	}

	$('.cont a').on('click',function(){
		if (!check()) return false;
		var ccode=$(this).attr("cid");
		callApi.write({'url': '/coupon/coupon_apply'}, {coupon_apply_code: ccode}, function(data){
			if (data.code) {
				alert(data.message);
			}else{
				alert('领取成功');
			}
		});
	});

});
