/*common*/
require('wap/zepto')
require('wap/zepto/fastclick')
require('wap/zepto/scroll')

var logTrack = require('wap/app/tracking')
var lazy = require('wap/component/lazzyLoad')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')

// 定位导航
var navfixed = function(){
	var bannerWord = $(".poster_tab")
		,isScroll = false
		,bannerOffset = bannerWord.offset().top
		,posterOffset = $('.poster').offset().top
		,startY = 0

	function isFade() {
		var pageScrollTop = document.body.scrollTop
		if(!isScroll && pageScrollTop > bannerOffset){
			isScroll = true
			$('.fixed_wrap').show()
		}
		if(isScroll && pageScrollTop <= bannerOffset){
			$('.fixed_wrap').hide()
			isScroll = false
		}
	}

	onscroll.unBind(isFade)
	onscroll.bind(isFade, 'document')

	$(document).on("touchstart", function(event){
		if (!event.touches.length) return
		var touch = event.touches[0]
		startY = touch.pageY
	})
	$(document).on("touchmove", function(){
		if (!event.touches.length) return
		var touch = event.touches[0]
		if(touch.pageY -startY > 0){
			$('.fixed_wrap').hide()
			isScroll = false
		}
	})
}
navfixed()


/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()

var $poster = $('.poster'),
	pullUp = $('.pullUp'),
	$banner = $('.banner')

var fragment = {}
var navk = $('.poster_tab div').length
for (var i = 0, k = navk; i < k; i++) {
	fragment['fragment'+i] = document.createDocumentFragment()
}

function addPoster(poster_name, r){
	$.get('/aj/promote/activity_item_list_huodong', {'tab': poster_name,'contentid': fml.vars.acid, 'huodong_code': fml.vars.huodong_code}, function(res){
		res.r = r;
		var tpl = shareTmp('posterWall', res)
		pullUp.hide()
		$poster.append(tpl)
		$banner.show()
		poster_load = false
		lazy_pic.load()
	}, 'json')
}

var poster_load = true
$banner.hide()
addPoster($('.poster_tab div').eq(0).html(), fml.vars.r + '.' + $('.poster_tab div').eq(0).attr('data_name'))

$('.bs_tab div').on('click', function(){
	$('.fixed_wrap').hide()
	$('html,body').scrollTo({
		endY : $('.poster_tab').offset().top,
		updateRate: 10
	})
	var self = this
	setTimeout(function(){
		tab_change(self)
	}, 200)
})

$('.poster_tab div').on('click', function(){
	tab_change(this)
})

var tab_change = function(mSelf){
	var self = mSelf
	var $goods_units = $('.goods_units')
	var num = $(self).attr('data_id')
	var act_num = $('.p_tab_active').attr('data_id')

	if(num == act_num || poster_load) return false

	$('.p_tab_active').removeClass('p_tab_active')
	$('.poster_tab div').eq(num).addClass('p_tab_active')
	$('.bs_tab div').eq(num).addClass('p_tab_active')

	logTrack.cr('beauty_sale1212', {'frm': fml.vars.acid + '_' + $(self).attr('data_name')});

	if(fragment['fragment'+num].childNodes.length != 0){
		fragment['fragment'+act_num].appendChild($goods_units[0])
		$poster.append(fragment['fragment'+num])
	} else {
		fragment['fragment'+act_num].appendChild($goods_units[0])
		$banner.hide()
		pullUp.show()
		var data = {'tab' : $(self).attr('data_name')}
		var poster_r = fml.vars.r + '.' + $(self).attr('data_name')
		poster_load = true
		addPoster($(self).html(), poster_r)
	}
}


