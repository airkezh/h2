fml.define('wap/app/navRoute', ['wap/jquery.mobile'] , function(require , exports){
	var frame = $('#frame')
		, header = $('#navBread')
		, navRoute = $('#navRoute')
		, navRouteBtn = $('#navRouteBtn')

	var show = function(){
	//	frame.attr('status','hidden')
		header.attr('status','opacity');
		navRoute.attr('status','show')
		navRouteBtn.attr('status','action')
	}
	var hide = function(){
	//	frame.attr('status','normal')
		header.attr('status', 'normal');
		navRoute.attr('status','normal')
		navRouteBtn.attr('status','normal')
	}
	return function(){
		navRouteBtn.on('tap', function(){
			if($(this).attr('status') == 'normal') show();
			else hide()
		})
	};

});
