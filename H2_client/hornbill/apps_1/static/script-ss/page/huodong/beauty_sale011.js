/*common*/
require('jquery')

var subNavUp = require('app/subNavUp')
var logTrack = require('app/tracking')
var scroll = require('component/windowScroll')
var lazyload = require('component/lazyLoad')

lazyload.load('.lazyimg', 'asrc');

setTimeout(function(){
	var tabT2 = $('.rec .title').offset().top - 65
	var tabT3 = $('.poster_title').offset().top - 65

	scroll.yIn(tabT2, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.bs_tab_wrap div').eq(1).addClass('p_tab_active')
	}, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.bs_tab_wrap div').eq(0).addClass('p_tab_active')
	});

	scroll.yIn(tabT3, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.bs_tab_wrap div').eq(2).addClass('p_tab_active')
	}, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.bs_tab_wrap div').eq(1).addClass('p_tab_active')
	});
}, 0)

logTrack.cr('beauty_sale1111_pc_main', {'type': 'hot', 'hdtrc': fml.vars.hdtrc});

$('.bs_tab_wrap div').on('click', function(){
	var toDom = $(this).attr('go')
	logTrack.cr('beauty_sale1111_pc_main', {'type': toDom, 'hdtrc': fml.vars.hdtrc});
	$('.p_tab_active').removeClass('p_tab_active')
	$(this).addClass('p_tab_active')
	$('body,html').stop(true , true).animate({ scrollTop: $('.' + toDom).offset().top - 65 }, 300)
})

subNavUp.navBind({
	'secNavCon' : '.tab_wrap',
	'firNavBar' : '.wheader',
	'secNavBar' : '.sec_nav'
});


