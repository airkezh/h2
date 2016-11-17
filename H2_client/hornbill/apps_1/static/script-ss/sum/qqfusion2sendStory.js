fml.define('sum/qqfusion2sendStory' , ['jquery'] , function(require , exports){
	var $ = require('jquery');	
	return function(opts){
		fusion2.dialog.sendStory ({
			title : opts.title || '',
			summary : opts.summary || '',
			msg : opts.msg || '',
			img : opts.img || '',
			button : opts.button || '进入应用',
			source : opts.source || '',
			context : opts.context || "sendStory",
			onShown : opts.onShown || function () {},
			onSuccess : opts.onSuccess || function () {},
			onCancel : opts.onCancel || function () {},
			onClose : opts.onClose || function () {}
		});
	}
});
