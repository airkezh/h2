/*common*/
require('jquery')

var subNavUp = require('app/subNavUp')
var shareTmp = require('component/shareTmp')
var posterWall = require('app/posterWalls11')
var rightMenuh = require('page/huodong/promotion/rightNav')

// 右侧导航
rightMenuh.rNav('/aj/promote/right_nav_pro?actid=99')
$(window).scroll(function(event) {
	var scoll = $(document).scrollTop()
	if (scoll > 180) {
		$('.nav_right').show()
	}else{
		$('.nav_right').hide()
	}
})
$(".go_top").on("click",function(){
	$(window).scrollTop(0);
});

var posterF = $('.p_tab_active')
	, nid = posterF.attr('data_nid')
	, name = posterF.html()
	, type = posterF.attr('data_type')

initPoster(type, nid, name)

function initPoster(type, nid, name){
	if(+type){
		addPoster(name, nid)
	} else {
		posterInit(nid)
	}
}

function addPoster(name, nid){
	$.get('/aj/promote/activity_item_list_huodong', {'tab': name,'contentid': nid, 'huodong_code': 'mztx_common'}, function(res){
		var tpl = shareTmp('posterWallPro', res)
		$('.goods_wall').append(tpl)
		$('.spinner').hide();
	}, 'json')
}

function posterInit(pid){
	var urlData = { 
		'frame' : 1,
		'page_size':32,
		'type':'pc',
		'pid': pid
	};
	posterWall(urlData , '/aj/customactivity/spring_carnival_list', {'Infinite' : '1'});
}

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


