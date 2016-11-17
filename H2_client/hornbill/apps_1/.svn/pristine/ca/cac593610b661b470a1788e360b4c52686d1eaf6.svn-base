fml.use('app/userFollow', function(){
	this('.addFollow', '.removeFollow', '.removeFollow', 'btn_fol', 'btn_unfol');
})

fml.define('page/club/club', ['jquery', 'app/checkLogin'], function(require, exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');

	$('.nav_create').click(function(){
		if(!check()) return false;
		if($(this).attr('href').indexOf('javascript')>-1){
			$('.write_off').show();
		}
	});
	$('.write_closed').click(function(){
		$('.write_off').hide();
	});
})