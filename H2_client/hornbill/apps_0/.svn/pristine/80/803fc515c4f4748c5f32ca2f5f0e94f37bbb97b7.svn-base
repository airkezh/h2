fml.define('wap/page/activity/bell' , ['wap/zepto/touch', 'wap/app/dialog', 'wap/component/shareTmp'] , function(require , exports){
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

	$('.pic_box').on('tap', '.js_approve', function(){
		/*登录*/
		if(fml.vars.isLogin == 0){
			window.MLS = {
				didLogin : function() {
					// 成功登录，跳转到下一步
					window.location.reload();
				}
			};
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
		var mSelf = this,
			data = {
				stid: $(this).attr('data_id')
			},
			url = '/aw/twitter/like';
		$.post(url, data, function(res){
			if(res.data){
				var old_num = $(mSelf).removeClass('approve').addClass('approved').find('.nums');
				old_num.html(parseInt(old_num.html())+1).next().html('已赞');
			} else {
				var old_num = $(mSelf).removeClass('approved').addClass('approve').find('.nums');
				old_num.html(parseInt(old_num.html())-1).next().html('赞');
			}
		}, 'json');
	});
	$('.share').on('tap', function(){
		/*版本判断*/
		if (!fml.vars.isApp){
			var href = '/activity/sale/bell/';
			window.location.href = '/goto/open/?appUrl='+encodeURIComponent(href)

		} else if(fml.vars.isNewest == "false"){
			setTimeout(function(){ update(); } , 500);
			return;
		} else {
			window.location.href = $(this).attr('data_href');
			setTimeout(function(){
				var tpl = shareTmp('next');
				$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
				$('.delayclose').on('tap' , function(){
					$('.closeDialog').trigger('tap');
				});
				$('.check_coupon').on('tap', function(){
					var coupon_this = this;
					$.post('/aj/may_sale/add_love', {}, function(res){
						if(res.success == 1 && $(coupon_this).attr('data')){
							$('.closeDialog').trigger('tap');
							setTimeout(function(){
								var tpl = shareTmp('invite');
								$.fn.dialog({dialogContent : tpl , dialogTitle : '分享成功'});
								$('.closeDialog').on('tap' , function(){
									window.location.reload();
								});
							}, 300);
							setTimeout(function(){
								var tpl = shareTmp('invite_no');
								$.fn.dialog({dialogContent : tpl , dialogTitle : '分享成功'});
								$('.closeDialog').on('tap' , function(){
									window.location.reload();
								});
							}, 300);
						} else if(res.success == 2){
							$('.closeDialog').trigger('tap');
							setTimeout(function(){
								var tpl = shareTmp('invite_ok');
								$.fn.dialog({dialogContent : '' , dialogTitle : '每位爱美丽最多上传6张男神的520萌照哦。'});
								$('.closeDialog').on('tap' , function(){
									window.location.reload();
								});
							}, 300);
						} else if(res.success == 3){
							$('.closeDialog').trigger('tap');
							setTimeout(function(){
								var tpl = shareTmp('invite_no');
								$.fn.dialog({dialogContent : '' , dialogTitle : '分享成功'});
								$('.delayclose').on('tap' , function(){
									window.location.reload();
								});
							}, 300);
						} else {
							$('.closeDialog').trigger('tap');
						}
					}, 'json');
				});
			}, 500);
		}
	});
});

fml.define('wap/page/activity/bell' , ['wap/zepto', 'wap/app/dialog', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	/*更新版本*/
	$('.shop_box a').live('tap', function(){
		if(fml.vars.isNewest == "false"){
			update();
		}
	});
	var update = function(){
        var tpl = shareTmp('toupdate');
        $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 1000);
		});
	}
});
