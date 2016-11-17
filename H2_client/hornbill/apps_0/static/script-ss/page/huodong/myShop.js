fml.define('page/huodong/myShop' , ['jquery', 'app/tracking'] , function(require , exports){
	var $ = require('jquery'),
		track = require('app/tracking');

	$('.shops').on('mouseenter', function(){
		$(this).find('.cover').fadeIn(400);
	}).on('mouseleave', function(){
		$(this).find('.cover').hide();
	});
});