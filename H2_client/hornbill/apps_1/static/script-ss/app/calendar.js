fml.define('app/calendar', ['jquery'], function(require, exports){
	var $calendar = $('.calendar')
		, $acted = $calendar.find('.acted,.tomorrow')
		, $imgBoxs = $calendar.find('.calImg')
		, $imgs = $imgBoxs.children('img')

	var change = function(){
		var $day = $(this)
			, $imgBox
			, $img

		if(!$day.is('.show')){

			$imgBox = $day.next('.calImg')
			$img = $imgBox.children('img')

			$acted.removeClass('show')
			$imgBoxs.fadeOut()

			if($imgBoxs.data('showed') != '1')
				$img.attr('src',$img.attr('asrc')).data('showed', '1')

			$imgBox.fadeIn()
			$day.addClass('show')
		}

	}

	$acted.on('click', change);
	
	exports.today = function(){ 
		var t = setTimeout(function(){
			if($acted.eq(-1).is('.tomorrow'))
				$acted.eq(-2).click()
			else
				$acted.eq(-1).click()
			t = null;
		}, 300)
	}
	exports.tomorrow = function(){
		var t = setTimeout(function(){
			$acted.eq(-1).click()
			t = null;
		}, 300)
	}

});
