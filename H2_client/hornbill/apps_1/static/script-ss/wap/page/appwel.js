/*common*/
var touch = require('wap/zepto/touch')
  , storage = require('component/iStorage')
  , tracking = require('app/tracking')
  , $skip = $('.closeApp')
  , $download = $('.top_bnr')

var refer = fml.vars.refer;
$download.on('tap',function(){
	var down_url = $download.attr('down_url');
	if(navigator.userAgent.indexOf('MicroMessenger') != -1){
		window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo';
		return ;
	}
	setTimeout(function(){
		window.location.href = down_url;	
	},1000);
	tracking.cr('wap_app_daoliu',{'bi_data':'type:download'});
});
$skip.on('tap',function(){
	setTimeout(function(){
		if (refer.indexOf('meilishuo.com') == -1 || refer == 'undefined' ) {
			window.location.href = '/welcome'
		} else if (refer.indexOf('/appWelcome') != -1) {
			window.location.href = '/welcome'
		} else {
			window.location.href = fml.vars.refer
		}
		
	},1000);
	storage.setCookie('appwel_skip' , new Date().getTime() ,{'duration' : 7200});
	tracking.cr('wap_app_daoliu',{'bi_data':'type:skip'});
});

