/*common*/
require('jquery')

var subNavUp = require('app/subNavUp')
var logTrack = require('app/tracking')
var shareTmp = require('component/shareTmp')

var $poster = $('.poster'),
	pullUp = $('.pullUp'),
	$foot_bannar = $('.foot_bannar')

var fragment = {}
var navk = $('.bs_tab_wrap div').length
for (var i = 0, k = navk; i < k; i++) {
	fragment['fragment'+i] = document.createDocumentFragment()
}
function addPoster(poster_name){
	$.get('/aj/promote/activity_item_list_huodong', {'tab': poster_name,'contentid': fml.vars.acid, 'huodong_code': fml.vars.huodong_code}, function(res){
		var tpl = shareTmp('posterWall', res)
		pullUp.hide()
		$poster.append(tpl)
		poster_load = false
		$foot_bannar.show()
		$('.spinner').hide();
	}, 'json')
}

var poster_load = true
$foot_bannar.hide()
addPoster($('.bs_tab_wrap div').eq(0).html())
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


