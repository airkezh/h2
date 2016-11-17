fml.define('wap/component/callQQ' ,['wap/zepto','wap/zepto/touch'] , function(require,exports){
	return function(btn, qq){
		btn = $(btn)
		qq = qq || btn.html()
		if(Meilishuo.config.isNewest){
			var jsonParams = '{"qq":"'+qq+'"}';
			btn.attr('href','meilishuo://qq.meilishuo?json_params=' + encodeURIComponent(jsonParams));
			return;
		}
		if(Meilishuo.config.os.phone && Meilishuo.config.os.android){
			btn.attr('href','mqqwpa://im/chat?chat_type=wpa&uin='+qq+'&version=1&src_type=web&web_src=null')
			return;
		}
		btn.on('tap' , function(){
			var url = 'http://wpa.qq.com/msgrd?v=3&uin='+qq+'&site=qq&menu=yes'
			var ifrId = (new Date()).getTime()
			var ifr = $('<iframe id="'+ifrId+'" name="'+ifrId+'" src="'+url+'"></iframe>')
					.hide()
					.appendTo('body')
			ifr.bind('load',function(){
				ifr.remove();
			});

		})
	}
});
