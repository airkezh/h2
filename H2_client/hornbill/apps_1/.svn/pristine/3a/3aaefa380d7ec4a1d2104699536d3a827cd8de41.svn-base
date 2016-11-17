/*common*/
require('wap/zepto')
require('wap/zepto/fastclick')
require('wap/zepto/scroll')

var logTrack = require('wap/app/tracking')
var lazy = require('wap/component/lazzyLoad')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')
var sidebar = require("wap/page/activity/promotion/sidebar")

$('.poster_tab .inner div, .fix_tab .inner div').on('click', function(){
	$('.inner .p_tab_active').removeClass('p_tab_active')
	var tab_num = $(this).index()
	$('.inner div').eq(tab_num).addClass('p_tab_active')
	$('.inner div').eq(tab_num+3).addClass('p_tab_active')
	var go_tab = $(this).attr('go')
	logTrack.cr('beauty_sale1212_fenhuichang_mob', {'type': go_tab})
	$('html,body').scrollTo({
		endY : $('.'+go_tab).offset().top - $('.poster_tab').height(),
		updateRate: 10
	})
})


var h = $('.top_bannar').height()
function navMove(pos,isDown){
	if(pos < h){
		$('.fix_tab').hide();
	} else {
		$('.fix_tab').show();
	}
}
onscroll.bind(navMove, 'navMove');

$(document).on("touchstart", function(event){
	if (!event.touches.length) return
	var touch = event.touches[0]
	startY = touch.pageY
})
$(document).on("touchmove",function(){
	if (!event.touches.length) return
	var touch = event.touches[0]
	if(touch.pageY -startY > 0){
		$('.fix_tab').hide();
	}
}, false)


/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.load().scroll()

// 初始化单品榜
var $poster = $('.goods'),
	pullUp = $('.pullUp')
$.get('/aj/promote/activity_item_list_huodong', {'tab': fml.vars.tab,'contentid': fml.vars.acid, 'huodong_code': fml.vars.huodong_code}, function(res){
	res.r = fml.vars.r+':tab=fenhuichang';
	var tpl = shareTmp('posterWall', res)
	pullUp.hide()
	$poster.append(tpl)
	lazy_pic.load()
}, 'json')

//侧边栏数据
$.post("/aj/huodong/navi_data", {"actid" : 95}, function(data) {
	sidebar.build({
		"sidebars" : data.data.navis,
		"sidebarBtn" : {"header" : data.data.header, "back" : data.data.back}
	});
}, "json");
