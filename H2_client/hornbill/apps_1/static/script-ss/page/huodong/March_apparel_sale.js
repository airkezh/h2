fml.define('page/huodong/March_apparel_sale' , ['jquery' , 'app/checkLogin' , 'ui/alert' , 'component/shareTmp'] , function(require , exports){
	$ = require('jquery');
	var check = require('app/checkLogin');
	var alertUI = require('ui/alert');
	var shareTmp = require('component/shareTmp');
	
	$('.can_get').on('click' , function(){
		if(!check()) return;
		var mSelf = this;
		var data = {
			type_coupon : $(this).attr('type_coupon'),
			type : 'pc',
			code : $(this).attr('code'),
			coupon : $(this).attr('coupon')
		};
		var url = '/aj/huodong/spring_carnival_add';
		$.post(url, data, function(res){
			if(res.code == 0){
				new alertUI({
					content : res.msg,
					title : '领取结果',
					width : '370px',
					onClose : function(){
						if(res.data != 1){
							window.location.href = '/biz/March_sale/apparel/';
						}
					}
				});
				if(res.data == 1){
					var left_num = parseInt($(mSelf).nextAll('.left_num').find('span').html());
					if(left_num == 1){
						$(mSelf).removeClass('can_get').addClass('zero');
						$(mSelf).nextAll('.left_zero').show();
						$(mSelf).nextAll('.left_num').hide();
					} else {
						$(mSelf).removeClass('can_get').addClass('has_get');
						$(mSelf).nextAll('.left_num').find('span').html(left_num-1);
					}
				} else {
					$('.sure').on('click' , function(){
						window.location.href = '/biz/March_sale/apparel/';
					});
				}
			}
		}, 'json');
	});
});
