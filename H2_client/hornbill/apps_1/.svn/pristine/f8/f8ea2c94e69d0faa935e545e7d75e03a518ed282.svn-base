fml.define('md/app/notice', ['wap/zepto/touch', 'wap/zepto/scroll', 'wap/zepto/fx_methods'], function(requires, exports){
	var $notice = $('#propNotice')
		, t = null 

	var show = function(txt, anchor){
		clearTimeout(t)

		if(anchor){
			var url = window.location.href;
			if(url.indexOf('#') < 0)
				window.location.href += '#' + anchor; 
		}

		if($notice.attr('shown') != '1')
			$notice.attr('shown', '1').fadeIn()	

		$notice.html(txt)

		t = setTimeout(function(){
			$notice.attr('shown', '0').fadeOut()
		}, 3000)
	}

	exports.show = show;
});