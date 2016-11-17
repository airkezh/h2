fml.define('wap/page/activity/ocoupon618' , ['wap/zepto/touch', 'wap/app/dialog', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');

	var alertMsgFn = function(msg){
		var data = {msg:msg};
		var tpl = shareTmp('alertMsg', data);
		$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 400);
		});
	}

	$('.get_coupon').on('tap', function(){
		if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
			window.location.href = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/sale/main520/?cid=1435');
		} else if(fml.vars.isLogin == 0) {
			window.MLS = {
				didLogin : function() {
					window.location.reload();
				}
			};
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		} else if(fml.vars.is_dead == 1){
			return alertMsgFn('你没有资格领取这个优惠券~');
		} else {
			if(fml.vars.page_from){
				var url = '/aj/activity/ocoupon618_main';
				var shareTmpId = 'result_1';
			} else {
				var url = '/aj/activity/ocoupon618';
				var shareTmpId = 'result';
			}
			$.post(url, {'act': 'set'}, function(res){
				if(res.code == 0 && res.status == 1){
					var tpl = shareTmp(shareTmpId);
					$.fn.dialog({dialogContent : tpl, dialogTitle : ''});
					$('.delayclose').on('tap', function(){
						setTimeout(function(){
							$('.closeDialog').trigger('tap');
						}, 1000);
					});
				} else {
					alertMsgFn(res.mess);
				}
			}, 'json');
		}
	});
});

