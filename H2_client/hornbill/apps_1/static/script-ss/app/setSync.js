fml.define('app/setSync' , ['jquery'] , function(require , exports){
	var $ = require('jquery');	

	/* #2150 发布器分享同步 */
	exports.setShareTips = function(){
		var tip_words = {
			'weibo' : {'not_auth':'你还没有绑定新浪微博，点击去绑定','not_syn':'未同步到新浪微博','syn':'取消同步到新浪微博'},
			'qzone' : {'not_auth':'你还没有绑定QQ空间，点击去绑定','not_syn':'未同步到QQ空间','syn':'取消同步到QQ空间'}
		};
		var click_urls = {'weibo':{'not_auth':'/settings/bind/weibo'},'qzone':{'not_auth':'/settings/bind/qzone'}};
		var css_hack = {'weibo':'sina', 'qzone':'qzone'};
		var $share = $('.share_published');
		function setTips(share_type, $share_obj, share_name) {
			$share_obj.attr('s_type', share_type);
			var css_n = css_hack[share_name];
			switch (share_type) {
				case 0:		//未互联
					$share_obj.attr('title', tip_words[share_name]['not_auth']);
					$share_obj.removeClass('i_'+css_n).addClass('g_'+css_n);
					break;
				case 1:		//互联并绑定
					$share_obj.attr('title', tip_words[share_name]['syn']);
					$share_obj.removeClass('g_'+css_n).addClass('i_'+css_n);
					break;
				case 2:		//互联未绑定
					$share_obj.attr('title', tip_words[share_name]['not_syn']);
					$share_obj.removeClass('i_'+css_n).addClass('g_'+css_n);
					break;
				case 3:		//绑定过期
					$share_obj.attr('title', tip_words[share_name]['not_syn']);
					$share_obj.removeClass('i_'+css_n).addClass('g_'+css_n);
					break;
			}
		}
		function setClicks(share_type, $share_obj, share_name) {
			switch (share_type) {
				case 0:
					setTips(1, $share_obj, share_name);
					fml.vars[share_name] = 1;
					window.open(click_urls[share_name]['not_auth'], 'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(screen.width-620)/2,',top=',(screen.height-450)/2].join(''));
					break;
				case 1:
					setTips(2, $share_obj, share_name);
					$.get('/aj/setting/sync_button', {'op': 'remove', 'type': share_name});
					fml.vars[share_name] = 2;
					break;
				case 2:
					setTips(1, $share_obj, share_name);
					$.get('/aj/setting/sync_button', {'op': 'add', 'type':share_name});
					fml.vars[share_name] = 1;
					break;
				case 3:
					setTips(1, $share_obj, share_name);
					fml.vars[share_name] = 1;
					window.open(click_urls[share_name]['not_auth'], 'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(screen.width-620)/2,',top=',(screen.height-450)/2].join(''));
					break;
			}
		}
		$share.children('span').each(function(){
			var $s_obj = $(this);
			var s_type = $s_obj.attr('s_type');
			var s_name = $s_obj.attr('s_name');
			s_type = s_type == 'undefined' ? 0 : parseInt(s_type);
			if (typeof fml.vars[s_name] != 'undefined') s_type = fml.vars[s_name];
			setTips(s_type, $s_obj, s_name);
			$s_obj.unbind('click').click(function(){
				s_type = parseInt($(this).attr('s_type'));
				setClicks(s_type, $s_obj, s_name);
			});
		});
	}
})
