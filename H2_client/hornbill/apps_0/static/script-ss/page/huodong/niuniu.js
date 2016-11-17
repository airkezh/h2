fml.define('page/huodong/niuniu' , ['jquery'] , function(require, exports){
	var	$ = require('jquery');
	$('.phone2').hide();
	$('.bg_box').hover(function(){
		$('.phone1').hide();
		$('.phone2').show();
	},function(){
		$('.phone2').hide();
		$('.phone1').show();
	});

});	