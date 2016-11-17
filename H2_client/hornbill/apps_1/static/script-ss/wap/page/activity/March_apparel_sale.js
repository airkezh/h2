fml.define('wap/page/activity/March_apparel_sale' , ['wap/zepto', 'wap/app/dialog', 'wap/component/shareTmp', 'wap/app/doota/timedown'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	window.timedown = require('timedown');
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

	$('.coupon_100 .coupon_con').live('tap', function(){
		if($(this).hasClass('has_get')){
			alertMsgFn('已经领过咯');
		} else if($(this).hasClass('has_over')){
			alertMsgFn('已经抢完了，等待下一场吧');
		} else if($(this).hasClass('no_timeStamp')) {
			alertMsgFn('还没开始，等一会儿吧');
		}
	})

	$('.coupon_box .coupon_con').live('tap', function(){
		if($(this).hasClass('has_get')){
			alertMsgFn('已经领过咯');
		} else if($(this).hasClass('zero')){
			alertMsgFn('已经抢完了，稍后再来吧');
		}
	})

	$('.can_get').live('tap' , function(){
		if($(this).hasClass('has_get')){
			return;
		}
		if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
			var href = '/activity/sale/main520/';
			window.location.href = '/goto/open/?appUrl='+encodeURIComponent(href);
		}
		if(fml.vars.isNewest == "false"){
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
				window.location.href = "meilishuo://login.meilishuo/";
			}else {
				window.location.href = "/goto/open?url="+ encodeURIComponent("meilishuo://login.meilishuo/")
				}
			return;
		}
		var data = {
			type_coupon : $(this).attr('type_coupon'),
			type : 'wap',
			code : $(this).attr('code'),
			coupon : $(this).attr('coupon')
		};
		var url = '/aj/activity/spring_carnival_add';
		$.post(url, data, function(res){
			var tpl = shareTmp('result', res);
			$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
			$('.delayclose').on('tap' , function(){
				setTimeout(function(){
					$('.closeDialog').trigger('tap');
				} , 500);
			});
		}, 'json');
	});
	timedown.down($('.coupon_timeStamp'), $('.coupon_timeStamp').attr('time'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
		if(t.h != undefined) $('#hour').html(t.h<10 ? '0'+t.h : t.h);
		if(t.i != undefined) $('#sec').html(t.i<10 ? '0'+t.i : t.i);
		$('#min').html(t.s<10 ? '0'+t.s : t.s);
	}).onTimeOver(function(){
		$('#min').html('00');
		var coupon_con = $('.coupon_100 .coupon_con');
		coupon_con.removeClass('no_timeStamp').addClass('can_get');
		if(!coupon_con.hasClass('has_get')){
			coupon_con.find('.btn_status').html('立即领取');
		}
	}).correct();
});
