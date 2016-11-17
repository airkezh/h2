fml.define('page/beauty' ,['jquery'] ,function(require, exports){
	var $ = require('jquery');
	var $logo = $('.brand_logo');
	var $up = $('.arrow_up'), $down = $('.arrow_down');
	$up.click(function(){
		$logo.stop(true,true).animate({'height':49});
		$(this).hide();
		$down.show();
	});
	var $temp = $logo.clone().css({'height':'auto'}).appendTo('body');
	var height = $temp.css('height');
	$temp.remove();
	$down.click(function(){
		$logo.stop(true,true).animate({'height':height});
		$(this).hide();
		$up.show();
	});
});
