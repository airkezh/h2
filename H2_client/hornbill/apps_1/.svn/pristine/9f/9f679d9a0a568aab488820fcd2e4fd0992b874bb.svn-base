fml.define('wap/page/activity/ncoupon618' , ['wap/zepto/touch', 'wap/app/dialog', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');

	var update = function(){
		var tpl = shareTmp('toupdate');
		$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 1000);
		});
	};
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
		/*版本判断*/
		if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
			window.location.href = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/sale/main520/?cid=1435');
		} else if(fml.vars.isNewest == "false"){
			setTimeout(function(){ update(); } , 500);
			return;
		} else if(fml.vars.isLogin == 0){
			window.MLS = {
				didLogin : function() {
					window.location.reload();
				}
			};
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		} else {
			var url = '/aj/activity/june_coupon_newuser';
			var data = {
				code : fml.vars.coupon_code
			};
			$.post(url, data, function(res){
				if(res.code == 0 && res.data == 1){
					var tpl = shareTmp('result');
					$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
					$('.delayclose').on('tap' , function(){
						setTimeout(function(){
							$('.closeDialog').trigger('tap');
						}, 1000);
					});
				} else {
					alertMsgFn(res.msg);
				}
			}, 'json');
		}
	});
});

