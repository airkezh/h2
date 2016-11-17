fml.define('sum/qqfusion2invite' , ['jquery'] , function(require , exports){
	var $ = require('jquery');	
	return function(opts){
		fusion2.dialog.invite ({
			msg  : opts.msg || "邀请你来玩~",
			img : opts.img || '', 
			source : opts.source || '',
			context : opts.context || 'invite',
			onSuccess : opts.onSuccess || function (ret) { },
			onCancel : opts.onCancel || function () { },
			onClose : opts.onClose || function () { }
		});
	}
});
