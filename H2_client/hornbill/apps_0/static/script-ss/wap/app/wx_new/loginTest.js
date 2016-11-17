/*common*/
var ShareTo = require('wap/app/shareTo'),
	Alert = require('wap/ui/alert');
return function(opt, cbk){
	window.MLS = {
		didLogin : function() {
			this.callback || this.callback() || window.location.reload();
		},
		callback : cbk
	};
	var _opt = opt || {},
		isWx = navigator.userAgent.indexOf('MicroMessenger') > -1;
	
	if(_opt && isWx){
		var signWX = require('wx/sign'),
			shareWX = require('wx/share');
		signWX();
		fml.vars.shareData = {
			'desc' : _opt.text,
			'imgUrl' : _opt.src,
			'title' : _opt.title
		};
		shareWX.bind(fml.vars.shareData);
	}
	if (!Meilishuo.config.user_id && Meilishuo.config.os.mlsApp) {
	    window.location.href = 'meilishuo://login.meilishuo/?json_params=';
	};
}