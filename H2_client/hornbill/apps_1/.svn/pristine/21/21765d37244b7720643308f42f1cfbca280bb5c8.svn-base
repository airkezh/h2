fml.define('wap/page/biz/bs_girls', ['wap/zepto', 'wap/app/dialog', 'wap/component/shareTmp', 'wap/component/callApi'], function(require, exports){
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
	$('.coupon_wrap').on('click', '.has_get', function(){
		alertMsgFn('已经领过咯');
	});
	$('.has_over').on('click', function(){
		alertMsgFn('已经抢完了，下一场明日10点开始~');
	});
	$('.can_get').on('click', function(){
		if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
			var href = '/biz/shareact/girls/?ac_id=' + fml.vars.ac_id + '&cid=' + fml.vars.cid;
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
		callApi.write({'url':'/coupon/coupon_apply'}, {coupon_apply_code:fml.vars.coupon_apply_code}, function(data){
			if (data.code) {
				alertMsgFn(data.message);
			}else{
				alertMsgFn('领取成功');
				$('.can_get').html('已领取').addClass('has_get').removeClass('can_get').off('click');
				$('.left_num').html(fml.vars.left_num-1 > 0 ? fml.vars.left_num-1 : 0 );
			}
		});
	});
});
