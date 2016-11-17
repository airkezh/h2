fml.define('wap/page/sq/share' , ['wap/zepto', 'wap/app/tracking', 'wap/zepto/fastclick'] , function(require){
	var tracking = require('wap/app/tracking')

	qw.ui.setActionButton({iconID: "3", hidden: false}, function(){
		$('#js-menu-wrapper').toggleClass('none');
	});

	var share = fml.vars.shareInfo || {
		title: '美丽说购物',
		desc : '时尚的款式 实惠的价格'
	}

	if(!share.share_url) share.share_url = 'http://m.meilishuo.com/sq'
	if(!share.image_url) share.image_url = 'http://i.meilishuo.net/css/images/wap/web/sq/share_logo.jpg'

	var url     = share.share_url || ''
	var uid     = Meilishuo.config.user_id || 0
	var urlPlus = 'http://open.show.qq.com/cgi-bin/login_state_auth_redirect?appid=210915&redirect_uri='
	var url_b   = 'http://m.meilishuo.com/qq/auth?redirect='

	share.back = true
	share.share_type = 0

	if(Meilishuo.config.os && !share.share_type) share.puin = 12345
		
	$('.js-qq-share').on('touchstart', function(event){
		tracking.cr('sq/statistics_action', {'action': 'clickShare', 'value' : 'to_qq'})
		event.stopPropagation()
		share.share_type = 0
		if(url){
			var status = url.indexOf('?')

			if(status == -1){
				url += '?shareFrom=qq&uuuid=' + uid
			}else{
				url += '&shareFrom=qq&uuuid=' + uid
			}

			var urlEncode = url_b + encodeURIComponent(url)

			$.getJSON('/aj/short/getShortUrl', {'url' : urlEncode}, function(data){
				var bAndCShort = encodeURIComponent(data.url)
				
				share.share_url = urlPlus + bAndCShort + '&_wv=5121'
				Gshare(share, 'to_qq')
			})
		}
		return false
	})

	$('.js-zone-share').on('touchstart', function(event){
		tracking.cr('sq/statistics_action', {'action': 'clickShare', 'value' : 'to_qzone'})
		event.stopPropagation()
		share.share_type = 1
		if(url){
			var status = url.indexOf('?')
			if(status == -1){
				url += '?shareFrom=qZone&uid=' + uid
			}else{
				url += '&shareFrom=qZone&uid=' + uid
			}
			var urlEncode = url_b + encodeURIComponent(url)
			$.getJSON('/aj/short/getShortUrl', {'url' : urlEncode}, function(data){
				var bAndCShort = encodeURIComponent(data.url)
				share.share_url = urlPlus + bAndCShort + '&_wv=5121'
				Gshare(share, 'to_qzone')
			})
		}
		return false
	})

	$('.js-to-home').on('touchstart', function(event){
		event.stopPropagation()
		window.location.href = '/sq'
		return false
	})
	$('.js-to-cart').on('touchstart', function(event){
		event.stopPropagation()
		window.location.href = '/sq/cart'
		return false
	})
	$('.js-to-user').on('touchstart', function(event){
		event.stopPropagation()
		window.location.href = '/sq/userCen'
		return false
	})
	$('.js-close').on('touchstart', function(event){
		event.stopPropagation()
		qw.ui.popBack()
		return false
	})

	$('#js-menu-wrapper').on('touchstart', function(){
		$(this).toggleClass('none');
	})

	var Gshare = function(data, source){
		qw.ui.shareMessage(data, function(ret){
			$('#js-menu-wrapper').toggleClass('none');
			if(ret.retCode == 0){
				tracking.cr('sq/statistics_action', {'action': 'clickShare', 'value' : source + '_success'})
			}else if(ret.retCode == 1){
				tracking.cr('sq/statistics_action', {'action': 'clickShare', 'value' : source + '_cancle'})
			}
		});
	}
});
