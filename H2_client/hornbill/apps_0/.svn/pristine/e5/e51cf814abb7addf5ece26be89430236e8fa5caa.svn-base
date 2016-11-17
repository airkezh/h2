fml.define('wap/page/biz/mz_box', ['wap/zepto', 'wap/app/dialog', 'wap/component/shareTmp', 'wap/component/callApi'], function(require, exports){
	var shareTmp = require('wap/component/shareTmp');
	var callApi = require('wap/component/callApi');
	/*更新版本*/
	var update = function(){
		var tpl = shareTmp('toupdate');
		$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 1000);
		});
	}

	var alertMsgFn = function(msg){
		var data = {msg:msg};
		var tpl = shareTmp('alertMsg', data);
		$.fn.dialog({dialogContent : tpl , dialogTitle : '提示'});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 400);
		});
	}
	$('.get_coupon').on('tap', function(){
		if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
			var href = '/biz/shareact/beautyBox/?cid=1603';
			window.location.href = '/goto/open/?appUrl='+encodeURIComponent(href);
		}
		if(fml.vars.isNewest == 'false'){
			setTimeout(function(){ update(); } , 500);
			return;
		}
		/*登录*/
		if(fml.vars.isLogin == 0){
			window.MLS = {
				didLogin : function() {
					// 成功登录，跳转到下一步
					window.location.reload();
				}
			};
			if (navigator.userAgent.indexOf('MicroMessenger') == -1 ) {
				window.location.href = 'meilishuo://login.meilishuo/';
			}else {
				window.location.href = '/goto/open?url='+ encodeURIComponent('meilishuo://login.meilishuo/')
				}
			return;
		}
		callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:fml.vars.coupon_apply_code_1}, function(data){
			if (data.code == 3) {
				alertMsgFn('已经领取过了');
			} else if(data.code){
				alertMsgFn(data.message);
			} else {
				callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:fml.vars.coupon_apply_code_2}, function(data){
					if (data.code) {
						alertMsgFn(data.message);
					}else{
						alertMsgFn('领取成功！');
					}
				});
			}
		});
	});
	$('.unfold').on('tap', function(){
		$(this).parents('.fold_wrap_top').find('.hide_pic').addClass('show_pic').removeClass('hide_pic');
		$(this).hide().parents('.fold_wrap').find('.fold').show();
	});
	$('.fold').on('tap', function(){
		$(this).parents('.fold_wrap_top').find('.show_pic').addClass('hide_pic').removeClass('show_pic');
		$(this).hide().parents('.fold_wrap').find('.unfold').show();
	});
});
