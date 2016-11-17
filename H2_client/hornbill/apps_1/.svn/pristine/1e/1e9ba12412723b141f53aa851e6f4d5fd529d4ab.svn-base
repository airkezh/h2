fml.use(['wap/zepto', 'wap/app/alert'], function(){
	var status = fml.vars.reg_status
		,m_alert = this.alert;
	if(fml.vars.headTag.indexOf('old') >= 0){
		if(fml.vars.reload == 1){
			window.location.href = $('.apply_coupon').attr('dataUrl');
		}
		$('.apply_coupon').click(function(){
			if(status != 0){
				window.location.href = $(this).attr('dataUrl');
			} else {
				window.MLS = {
					didLogin : function() {
						window.location.href = '/biz/reg_feedback/page/'+fml.vars.headTag+'?reload=1';
					}
				};
				window.location.href = 'meilishuo://login.meilishuo/';
			}
		});
		return ;
	}
	if(status == 3 && fml.vars.headTag != 'reg_ss'){
		window.location.href = '/biz/reg_feedback/page/reg_ss'
	}
	$('.closeDialog').live('touchstart', function(){
		$('.j_close').attr('href', 'javascript:;');
	});
	if(status == 4 && fml.vars.headTag != 'complete'){
		setTimeout(function(){
			m_alert({
				dialogContent : '你已经领取过该优惠劵了！'
				,onClose : function(){
					window.location.href = 'meilishuo://close.meilishuo/';
				}
			});
		}, 300);
	}
	if(status == 2 || status == 1){
		setTimeout(function(){
			m_alert({
				dialogContent : '本福利为新人专享，只有新用户才可以领哦！'
				,onClose : function(){
					window.location.href = 'meilishuo://close.meilishuo/';
				}
			});
		}, 300);
	}
	if(fml.vars.headTag == 'welcome'){
		window.MLS = {
			didLogin : function() {
				// 成功登录，跳转到下一步
				location.href = '/biz/reg_feedback/page/reg_ss';
			}
		};
	}
	$('.apply_coupon').click(function(){
		var data = {}
		,url = '/aj/coupon/register_apply'
		,cb_url = $(this).attr('dataUrl')
		$.post(url, data, function(res){
			if(res.code === 0){
				m_alert({
					dialogContent : '领取成功'
					,onClose : function(){
						window.location.href = cb_url;
					}
				});
			} else{
				alert(res.message)
			}
		}, 'json')
	});
});
fml.define('wap/page/biz/reg_feedback', ['wap/zepto'], function(require, exports){});