fml.use('app/countdown' , function(){
	this();	
});
fml.define('page/calendar', ['jquery'], function(require, exports){
	var $calendar = $('.calendar')
		, $acted = $calendar.find('.acted')
		, $imgBoxs = $calendar.find('.calImg')
		, $imgs = $imgBoxs.children('img')

	$acted.on('click', function(){
		var $day = $(this)

		if($day.is('.show'))
			return;

		var $imgBox = $day.next('.calImg')
			, $img = $imgBox.children('img')

		$acted.removeClass('show')
		$imgBoxs.fadeOut()

		$day.addClass('show')

		if($imgBoxs.data('showed') != '1')
			$img.attr('src',$img.attr('asrc')).data('showed', '1')

		$imgBox.fadeIn()
	})

	$acted.last().click()
	
});
