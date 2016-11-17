fml.define('page/shop_rating' , [ 'jquery' ] , function(require , exports){
	var $ = require('jquery')
	$('.score_list').on('mouseover','.score_item',function(){
		var self = $(this)
		if(self.hasClass('score_selected')){
			return;
		}
		var $score = $('.shop_score [data-score-name='+self.attr('data-score-name')+']')
		$('.shop_score .score_selected').removeClass('score_selected');
		$score.addClass('score_selected')
	})
	$('.service_list').on('mouseover','.service_item',function(){
		var self = $(this)
		if(self.hasClass('service_selected')){
			return;
		}
		var $service = $('.recent_service [data-service-name='+self.attr('data-service-name')+']')
		$('.recent_service .service_selected').removeClass('service_selected');
		$service.addClass('service_selected')
	});
});
