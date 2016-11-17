fml.use('wap/app/countdown' , function(){
	this();	
});
fml.define('wap/page/welfare/welfare_detail' , ['wap/zepto' , 'wap/app/dialog' , 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	$('#nameList').on('tap' , function(){
		var tpl = shareTmp('mingdan');
		$.fn.dialog({dialogContent : tpl , dialogTitle : '中奖名单'});
	});
});
