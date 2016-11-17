/*common*/
require('m/zepto/touch')
var header = $('#header')
	, navTop = $('#navTop')
	, navCon = navTop.find('.nav_box ul')
	, routeNav = $('#navRoute')
	, routeBtn = $('#navRouteBtn')
	, searchBtn = $('#searchBtn')
	, cancelBtn = $('#cancelBtn')
	, keyword0 = $('#search').find('input[name="keyword"]')
	, n_type = header.attr('status')
	, win = $(window)


var noscroll = function(event){
	event.preventDefault();
}
exports.routeFn = function(){
	routeBtn
		.on('touchstart touchend', function(event){
			event.preventDefault();
		})
		.on('tap', function(event){
			event.preventDefault();
			if(routeNav.attr('status') != 'show'){
				routeNav.attr('status','show')
				keyword0.blur()
				win.on('touchmove', noscroll)

			}else{
				routeNav.attr('status','normal')
				win.off('touchmove', noscroll)

			}
		})
}

exports.openClosedFn = function(){
	$('#openClosed')
		.on('touchstart touchend', function(event){
			event.preventDefault();
		})
		.on('tap', function(event){
			event.preventDefault();
			if(header.attr('status') == 'open'){
				header.attr('status',n_type)
				navTop.css({'height':''})	

			}else{
				header.attr('status','open')
				navTop.css({'height':navCon.height()})

			}
		})
}

exports.searchFn = function(){
	searchBtn
		.on('touchstart touchend', function(event){
			event.preventDefault();
		})
		.on('tap', function(event){
			event.preventDefault();
			if(routeNav.attr('status') == 'show'){
				routeNav.attr('status','normal')
				win.off('touchmove', noscroll)
				if(header.attr('status') == 'search')
					return;

			}

			if(header.attr('status') != 'search'){
				header.attr('status','search')
				navTop.css({'height':''})	

			}else{ 
				keyword0.blur()
				header.attr('status', n_type)

			}
		})

	cancelBtn
		.on('touchstart touchend', function(event){
			event.preventDefault();
		})
		.on('tap', function(event){
			event.preventDefault();
			keyword0.blur()
			header.attr('status', n_type)

		})
}
