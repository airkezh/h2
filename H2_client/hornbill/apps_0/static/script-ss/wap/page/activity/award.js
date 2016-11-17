/*common*/
require('wap/zepto/fastclick')
var openApp = require('wap/app/openApp');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')
	, btn = $('.lineBox')

/*登陆成功后的回掉函数*/
	window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };
btn.on('click',function(){
	if(weixinBrowser != -1) {
		openApp(window.location.href)
		return;
	}
	if(fml.vars.mlsApp == 'undefined' && weixinBrowser == -1) {
		window.location.href = '/act/bdapp/userinfo?banner_id=' + fml.vars.bannerId
		return;
	}

	//在app里面，直接调起登录
	if(fml.vars.mlsApp && fml.vars.isLogin == '0') {
	    window.location.href = "meilishuo://login.meilishuo/";
	    return;
	} else {
		window.location.href = '/act/bdapp/userinfo?banner_id=' + fml.vars.bannerId
	}
	
})