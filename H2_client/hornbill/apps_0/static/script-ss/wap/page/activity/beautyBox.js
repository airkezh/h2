fml.use('wap/app/countdown' , function(){
	this();	
});
fml.define('wap/page/activity/beautyBox' , ['wap/zepto' , 'wap/zepto/touch' , 'wap/component/shareTmp' , 'wap/app/dialog' ] , function(require , exports){ 
	var shareTmp = require('wap/component/shareTmp');
	$('.beautyBtn').on('touchend' , function(event){
		event.preventDefault();
	});
	$('#buy').on('tap' , function(event){
		event.preventDefault();
		if(fml.vars.isNewest == "true"){
			var tpl = shareTmp('tobuy');
			$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		}else{
			var tpl1 = shareTmp('toupdate');
			$.fn.dialog({dialogContent : tpl1 , dialogTitle : ''});
		}
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');	
			} , 1000);
		});	
	});
	$('#try').on('tap' , function(event){
		event.preventDefault();
		var tpl = shareTmp('totry');
		$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	});
	$('#zero').on('tap' , function(event){
		event.preventDefault();
		var tpl = shareTmp('tozero');
		$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	});


});
