/*common*/

var $ = require('wap/zepto')
	, Swipe = require('wap/component/swipe')
	, Sticky = require('wap/component/sticky')
	, lazyLoad = require('wap/component/lazzyLoad')
	, WaterFall = require('circle/component/waterfall')
	, optimiseFn = require('circle/component/waterfallOptimise')
	, uniquePlugin = require('circle/component/waterfallDataUniquePlugin')

	, $doc = $(document)
	, $activeTab = $doc.find('.tab').eq(0)
	, $tabContainer = $('.poster-wall')

	, waterfallInstances = {
		'feature': {
			url: '/aj/welcome/getGoods/feature'
			, tmpl: 'featurePosterWall'
		}

		, 'new': {
			url: '/aj/welcome/getGoods/new'
			, tmpl: 'newPosterWall'
		}

		, 'hot': {
			url:  '/aj/getGoods/hot'
			, tmpl: 'normalPosterWall'
		}
	}
	, activeWaterFallInstance = ''

	, urls = {
		'feature': ''
		, 'new': ''
		, 'hot': ''
	}

	, ACTIVE = 'active'
	, isTabFixed = false
	, isTriggerFinished = false
	, alreadyLoadedItem = {}
	, curWaterfallType = 'new'

//瀑布流宽高比 640*832

function initTab(){
	// 给瀑布流设定最新高度
	var $win = $(window)

	$win.on('resize', function(){
		$tabContainer.css('min-height', $win.height() - $('.wap_foot').height())
	})

	$tabContainer
		.css('min-height', $win.height() - $('.wap_foot').height())
		.on('click', '.tab', function(){
			var $this = $(this)

			if (!$this.hasClass(ACTIVE)){
				$activeTab.removeClass(ACTIVE)
				$this.addClass(ACTIVE)
				$activeTab = $this
				activeWaterfall($this.data('type'))

				if (isTriggerFinished && isTabFixed){
					setTimeout(function(){
						// 30 是试验出来的数字
						window.scrollTo(0, $tabContainer.offset().top - 30)
					}, 0)
				}
			}
		})

	$activeTab.trigger('click')
	isTriggerFinished = true
}

function activeWaterfall(type){
	var wf = waterfallInstances[type],
		oldWf = waterfallInstances[curWaterfallType]

	if (oldWf.instance){
		oldWf.instance.lock()._config.el.hide()
	}

	curWaterfallType = type

	if (!wf.instance){
		wf.instance = WaterFall.init({
			el: $('.tab-' + type)
			, url: wf.url
			, tmpl: wf.tmpl
			, data: {
				offset: 30
				, cata: 0
				, sbase: 0
				, sort: 1
				, limit: 20
			}
			, dataFilter: function(data){
				fml.vars.poster_r = data.r || fml.vars.common_r

				return data.data.tInfo
			}
			, colNum: 2
			, colGap: 0
			, optimiseFn: optimiseFn
			, plugins: [uniquePlugin]
			, uniquekey: 'twitter_id,n_pic_file'
			, onFetchSuccess: function(data){
				lazy_pic.load()
				if(data.length == 0){
					$('.pullUp').attr('status', 'stop')
					this.lock()
				}
			}
		}).start()

		waterfallInstances[type].instance = wf.instance
	}
	activeWaterFallInstance = wf.instance
	activeWaterFallInstance.unlock()._config.el.show()
}

initTab()

/* lazyLoad load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazyLoad.init({
	'xpath': '.js_lazy_load_item'
})
lazy_pic.scroll()
lazy_pic.load()

var s_swipe_num = $('.swipe_num span')
s_swipe_num.eq(0).addClass('active')
var runman_swip = new Swipe($('#slider')[0], {
	speed: 400
	, auto: 3000
	, continuous: true
	, disableScroll: false
	, stopPropagation: false
	, callback : function(index, elem){
		s_swipe_num.removeClass('active').eq(index).addClass('active')
	}
})

Sticky.init('.wap_head')
Sticky.init('.js-fixed-tab', {'infinity': true})

$(document).on('search_start', function(){
	activeWaterFallInstance.lock()
})
$(document).on('search_cancel', function(){
	activeWaterFallInstance.unlock()
})
