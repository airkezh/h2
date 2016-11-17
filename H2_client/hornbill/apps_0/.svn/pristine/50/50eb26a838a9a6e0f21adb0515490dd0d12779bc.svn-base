fml.define('wap/page/activity/March_apparel_sale_1' , ['wap/zepto', 'wap/app/dialog', 'wap/component/shareTmp', 'wap/app/doota/timedown'] , function(require , exports){
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
		$('.closeDialog').trigger('tap');
		var data = {msg:msg};
		var tpl = shareTmp('alertMsg', data);
		$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 400);
		});
	}

	$('.oc_has_get').on('tap', function(){
		alertMsgFn('你已经在复活的名单中了~');
	});
	$('.nc_has_get').on('tap', function(){
		alertMsgFn('优惠券已发到你的账户，现在就用掉它吧！</br>今天不用就真的过期了！');
	});
	$('.on_no_get').on('tap', function(){
		alertMsgFn('亲，你是我们的老顾客<br>去领其他券吧');
	});
	$('.zero_c').on('tap', function(){
		alertMsgFn('今天已抢完');
	})
	$('.js_login').on('tap', function(){
		if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
			window.location.href = '/goto/open/?appUrl='+encodeURIComponent('/activity/sale/main520/?cid=1435');
			return ;
		}
		if(fml.vars.isLogin == 0){
			window.MLS = {
				didLogin : function() {
					window.location.reload();
				}
			};
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
	});

	$('.coupon_box .coupon_con').live('tap' , function(){
		if($(this).hasClass('has_get')){
			return alertMsgFn('已经领过咯');
		} else if($(this).hasClass('zero')){
			return alertMsgFn('已经抢完了，稍后再来吧');
		} else if($(this).hasClass('again_get')){
			return alertMsgFn('已经领取过了，618再来领取吧~');
		}

		if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
			window.location.href = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/sale/main520/?cid=1435');
		}
		if(fml.vars.isNewest == "false"){
			setTimeout(function(){ update(); } , 500);
			return;
		}
		if(fml.vars.isLogin == 0){
			window.MLS = {
				didLogin : function() {
					window.location.reload();
				}
			};
			window.location.href = "meilishuo://login.meilishuo/";
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
			$('.closeDialog').trigger('tap');
			var tpl = shareTmp('alertMsg', res);
			$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
			if(res.data == 1){
				$('.delayclose').on('tap' , function(){
					window.location.reload();
				});
			} else {
				$('.delayclose').on('tap' , function(){
					setTimeout(function(){
						$('.closeDialog').trigger('tap');
					} , 500);
				});
			}
		}, 'json');
	});
	timedown.down($('.coupon_timeStamp'), $('.coupon_timeStamp').attr('time'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
		if(t.h != undefined) $('.hour').html(t.h<10 ? '0'+t.h : t.h);
		if(t.i != undefined) $('.sec').html(t.i<10 ? '0'+t.i : t.i);
		$('.min').html(t.s<10 ? '0'+t.s : t.s);
	}).onTimeOver(function(){
		$('.min').html('00');
		var coupon_con = $('.coupon_100 .coupon_con');
		coupon_con.removeClass('no_timeStamp').addClass('can_get');
		if(!coupon_con.hasClass('has_get')){
			coupon_con.find('.btn_status').html('立即领取');
		}
	}).correct();
});
