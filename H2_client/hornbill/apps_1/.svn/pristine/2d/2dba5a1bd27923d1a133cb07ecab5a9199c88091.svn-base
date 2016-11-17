/*common*/
require('jquery')

var logTrack = require('app/tracking')
var scroll = require('component/windowScroll')
var lazyload = require('component/lazyLoad')
var rightMenu = require('page/huodong/promotion/rightNav')

lazyload.load('.lazyimg', 'asrc');

setTimeout(function(){
	var tabT2 = $('.rec_title').offset().top - 90
	var tabT3 = $('.poster_title').offset().top - 90

	scroll.yIn(tabT2, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.inner div').eq(1).addClass('p_tab_active')
	}, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.inner div').eq(0).addClass('p_tab_active')
	});

	scroll.yIn(tabT3, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.inner div').eq(2).addClass('p_tab_active')
	}, function(){
		$('.p_tab_active').removeClass('p_tab_active')
		$('.inner div').eq(1).addClass('p_tab_active')
	});
}, 0)

logTrack.cr('beauty_sale1212_pc_main', {'type': 'hot', 'hdtrc': fml.vars.hdtrc});

$('.sec_nav_wrap .inner div').on('click', function(){
	var toDom = $(this).attr('go')
	logTrack.cr('beauty_sale1212_pc_main', {'type': toDom, 'hdtrc': fml.vars.hdtrc});
	$('.p_tab_active').removeClass('p_tab_active')
	$(this).addClass('p_tab_active')
	$('body,html').stop(true , true).animate({ scrollTop: $('.' + toDom + '_title').offset().top - 90 }, 300)
})

var subNavUp = require('app/subNavUp')
var logTrack = require('app/tracking')
var shareTmp = require('component/shareTmp')

subNavUp.navBind({
	'secNavCon' : '.inner',
	'firNavBar' : '.wheader',
	'secNavBar' : '.sec_nav'
});

var $poster = $('.poster')

$.get('/aj/promote/activity_item_list_huodong', {'tab': fml.vars.tab,'contentid': fml.vars.acid, 'huodong_code': fml.vars.huodong_code}, function(res){
	var tpl = shareTmp('posterWall', res)
	$poster.append(tpl)
	$('.spinner').hide();
}, 'json')

logTrack.cr('beauty_sale1212_pc', {'acid': fml.vars.acid, 'type': 'all', 'hdtrc': fml.vars.hdtrc});


$('.bs_tab_wrap div').on('click', function(){
	var $goods_units = $('.goods_units')
	var num = $(this).attr('data_id')
	var act_num = $('.p_tab_active').attr('data_id')
	if(num == act_num || poster_load) return false

	var data_name = $(this).attr('data_name')

	logTrack.cr('beauty_sale1212_pc', {'acid': fml.vars.acid, 'type': data_name, 'hdtrc': fml.vars.hdtrc});

	$('.p_tab_active').removeClass('p_tab_active')
	$(this).addClass('p_tab_active')

	$('body,html').stop(true , true).animate({ scrollTop: $('.poster').offset().top - 60 }, 300)

	if(fragment['fragment'+num].childNodes.length != 0){
		fragment['fragment'+act_num].appendChild($goods_units[0])
		$poster.append(fragment['fragment'+num])
	} else {
		$foot_bannar.hide()
		$('.spinner').show();
		fragment['fragment'+act_num].appendChild($goods_units[0])
		pullUp.show()
		var data = {'tab' : data_name}
		poster_load = true
		addPoster($(this).html())
	}
})

subNavUp.navBind({
	'secNavCon' : '.tab_wrap',
	'firNavBar' : '.wheader',
	'secNavBar' : '.sec_nav'
});

/*
 * 加入购物车
 */
var addToCart = require('app/addToCart');

addToCart({
	hook: '.js-addToCart',
	tmpl: 'tmplAddToCart',
	parent: 'a'
});

// 右侧导航栏
rightMenu.rNav('/aj/sale/right_nav?actid=93');


