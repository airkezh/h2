/*common*/
require('jquery')

var logTrack = require('app/tracking')
var scroll = require('component/windowScroll')
var lazyload = require('component/lazyLoad')

lazyload.load('.lazyimg', 'asrc');

setTimeout(function(){
	var tabT1 = $('.hot_title').offset().top - 40
	var tabT2 = $('.rec_title').offset().top - 40
	var tabT3 = $('.poster_title').offset().top - 40

	scroll.yIn(tabT1, function(){
		$('.sec_nav_wrap').show()
	}, function(){
		$('.sec_nav_wrap').hide()
	});

	scroll.yIn(tabT2, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.sec_nav_wrap div').eq(1).addClass('p_tab_active')
	}, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.sec_nav_wrap div').eq(0).addClass('p_tab_active')
	});

	scroll.yIn(tabT3, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.sec_nav_wrap div').eq(2).addClass('p_tab_active')
	}, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.sec_nav_wrap div').eq(1).addClass('p_tab_active')
	});
}, 0)

logTrack.cr('beauty_sale1212_pc_main', {'type': 'hot', 'hdtrc': fml.vars.hdtrc});

$('.sec_nav_wrap div').on('click', function(){
	var toDom = $(this).attr('go')
	logTrack.cr('beauty_sale1212_pc_main', {'type': toDom, 'hdtrc': fml.vars.hdtrc});
	$('.p_tab_active').removeClass('p_tab_active')
	$(this).addClass('p_tab_active')
	$('body,html').stop(true , true).animate({ scrollTop: $('.' + toDom + '_title').offset().top - 40 }, 300)
})


