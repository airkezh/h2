/*common*/
require('wap/zepto/fastclick')
require('wap/zepto/scroll')

var $ = require('wap/zepto')
var lazy = require('wap/component/lazzyLoad')
var shareTmp = require('wap/component/shareTmp')
var posterWall = require('wap/app/posterWalls3')
var onscroll = require('wap/component/windowScroll')
var sidebarCm = require('wap/page/biz/sidebarShareIsCoupon')

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
setTimeout(function(){
	navfixed()
}, 0)

var pullUp = $('.pullUp')

var nid = $('.p_tab_active').data('nid')
var name = $('.p_tab_active').data('name')
var type = $('.p_tab_active').data('type')
initPoster(type, nid, name)

function initPoster(type, nid, name){
	if(+type){
		addPoster(name, nid)
	} else {
		/* lazy load setting, 采用全屏扫点方式加载 */
		var lazy_pic = lazy.init({'xpath' : '.bs_load_img', 'loadStyle' : 'img'})
		lazy_pic.scroll()

		posterWall.init({
			urlData : {'frame' : 1, 'page_size':30, 'type':'wap', 'pid': nid}
			, containerId : '.goods_wall'
			, url : '/aj/beautysale/goods'
			, posterAppend : function(data){
				lazy_pic.load()
			}
		})
	}
}

function addPoster(name, nid){
	$.get('/aj/promote/activity_item_list_huodong', {'tab': name,'contentid': nid, 'huodong_code': 'mztx_common'}, function(res){
		res.r = '';
		var tpl = shareTmp('posterWallPro', res)
		$('.goods_units').append(tpl)
		// for 没有定位的瀑布流
		var lazy_bg_pic = lazy.init({'xpath' : '.bs_load_bg_img'})
		lazy_bg_pic.scroll()

		lazy_bg_pic.load()
		pullUp.attr('status', 'stop')
	}, 'json')
}

$.post("/aj/promote/navi_data_pro", {"actid" : 101 }, function(data) {
	sidebarCm.build({
	"sidebars" : data.data.navis,
	"sidebarBtn" : {"header" : data.data.header, "back" : data.data.back, "share" : data.data.share}
	});
	// 导航显示分享优惠券
	sidebarCm.share( true );
}, "json");

