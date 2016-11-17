/*common*/
var $ = require('jquery');    

var init = function($parentObj , btn , $p, ext){
	var $pal = $p
		, $btn
		, timmer
		, ext = ext || {}

	var hidePal = function(g){
		clearTimeout(timmer)
		timmer = setTimeout(function(){
			$btn.removeClass('act');
			$pal.hide();

			fml.vars.im.noKey = 0

			ext.hideExt && ext.hideExt()

		}, ($.type(g) == 'number' ? g : 300))	
	}

	$pal
		.appendTo('body')
		.on('mouseenter', function(){
			clearTimeout(timmer)	
		})
		.on('mouseleave', hidePal)

	$parentObj
		.on('mouseenter click' , btn , function(event){
			$btn = $(this)

			clearTimeout(timmer)	

			$btn.addClass('act');

			var offset = {}

			if(ext.right) offset.left = ($btn.offset().left + ($btn.outerWidth() - $pal.outerWidth()))
			else offset.left = $btn.offset().left		

			if(ext.bottom) offset.top = $btn.offset().top + $btn.outerHeight()
			else offset.top = ($btn.offset().top - $pal.outerHeight())


			$pal
				.css(offset)
				.show()
				.find('.line').hide()

			fml.vars.im.noKey = 1
		})
		.on('mouseleave' , btn , hidePal)

	ext.fn && ext.fn(hidePal)

}
exports.init = init 
