fml.define('wap/page/activity/March_apparel_sale_update' , ['wap/zepto', 'wap/app/dialog', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	/*更新版本*/
	$('.shop_box a').live('tap', function(){
		if(fml.vars.isNewest == "false"){
			update();
		}
	});
	var update = function(){
        var tpl = shareTmp('toupdate');
        $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 1000);
		});
	}
});