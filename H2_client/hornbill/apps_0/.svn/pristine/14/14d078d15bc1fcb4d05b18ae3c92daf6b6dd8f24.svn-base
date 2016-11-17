fml.define('sum/qqfusion2share' , ['jquery'] , function(require , exports){
	var $ = require('jquery');	
	return function(opts){
		fusion2.dialog.share ({
			appid : opts.appid || '',
			desc : opts.desc || '',
			summary : opts.summary || '',
			title : opts.title || '',
			pics : opts.pics || '',
			context : 'share',
			onSuccess : opts.onSuccess || function () {},
			onCancel : function () {},
			onClose : opts.onClose || function () {}
		});
	}
});
