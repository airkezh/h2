fml.define('wap/app/fixed', ['wap/zepto'] , function(require , exports){
	var layout = $('#layout')
		, wrapper = $('#wrapper_main')
		, header = $('#header')

	var search = $('#search')
		, searchBtn = $('#searchBtn')
		, cancelBtn = $('#cancelBtn')
		, keyword = search.find('.input')
		, keyword0 = keyword.find('input[name="keyword"]')

	var win = $(window)
		, w_top

	var noscroll = function(event){
		event.preventDefault();
	}
	var fixed = function(){ 
		var t = setTimeout(function(){
			window.scrollTo(0, w_top)
			win.on('touchstart touchmove touchend', noscroll)
			var t = setTimeout(function(){
				window.scrollTo(0, w_top)
			}, 10)
		}, 10)
	}

	return function(){
		if(!$.os.ios)
			return;

		keyword.attr('status','normal')
		keyword
			.on('click', function(){

				w_top = win.scrollTop()
				keyword.attr('status','active')
				header.css({'position':'absolute', 'top':w_top})
			//	var t = setTimeout(function(){
					keyword0.focus();
			//	}, 10, true)
				fixed()

            })

		keyword0
		//	.on('focus', fixed)
			.on('blur', function(){

				keyword.attr('status','normal')
				win.off('touchstart touchmove touchend', noscroll)	
				header.attr('style', '');

			})

	}

});
