fml.define('wap/page/wx/scratch' , ['wap/zepto/touch', 'wap/app/dialog', 'wap/component/shareTmp', 'wap/app/scrash'] , function(require,exports){
	var shareTmp = require('wap/component/shareTmp');
	var scrash = require('wap/app/scrash');

	$('.share').on('tap',function(){
		var tpl = shareTmp('share_lead');
        $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
        $('#dialogLayer').css({'top':'50px'});
		$('#maskLayer').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 500);
		});
	});

	$('.rescratch').on('tap',function(){
		initScratch()
	})

	function initScratch(){
		scrash.createScratchCard('.try_cnt',50,function(f,t ,cvs){
			if (cvs){
				cvs.parentNode && cvs.parentNode.removeChild(cvs)
			}
		},true)
	}
	initScratch()
});