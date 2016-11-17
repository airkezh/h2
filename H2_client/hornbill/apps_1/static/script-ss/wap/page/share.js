/*common*/

var $ = require('wap/zepto')
	, WaterFall = require('wap/component/circleWaterfall')
	, optimiseFn = require('wap/component/waterfallOptimise')
	, lazy = require('wap/component/lazzyLoad')
	, shareTmp = require('wap/component/shareTmp')
	, Swipe = require('wap/component/swipe')

var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()

var urlData = {
	'frame' : 0
	, 'tid' : fml.vars.tid
}

var waterFallInstance = WaterFall.init({
	el: '.goods_wall',
	url: '/aj/item/item_share_goods',
	data: urlData,
	dataFilter : function(data){
		fml.vars.poster_r = data.r || '';
		return data.goods.tInfo
	},
	colNum: 2,
	colGap : 6,
	hasSideGap: true,
	optimiseFn : optimiseFn,
	onFetchSuccess: function(data){
		if(data.length == 0){
			$('.pullUp').attr('status','stop');
			this.lock();
		}
	}
}).start();

/**
 * 搜索提交
 */
var $input = $('.js_input')
	, click_cate_hack = true
$('.js_search_form').on('submit', function(e){
	event.preventDefault();
	var keyword = $.trim($input.val())
	if(!keyword)
		return false;
	else{
		window.location.href = '/search/?keyword=' + encodeURIComponent(keyword);	
	}
})

$input.on('focus', function(e){
	var search_t = $('.js_input_decorate span').html()
	$('.js_input_decorate span').html('')
	$(this).val(search_t)
	maskTab('show')
	e.stopPropagation()
}).on('focusout', function(e){
	var search_t = $(this).val()
	$(this).val('')
	$('.js_input_decorate span').html(search_t)
	if(!click_cate_hack){
		maskTab('hide')
		click_cate_hack = false
	}
	e.stopPropagation()
})
$input.on('click', function(e){
	$('.nav_route').hide()
	$('.js_cate').data('status', 'hide')
	e.stopPropagation()
})

/**
 * 搜索Android兼容
 */
var ua = navigator.userAgent
	, os = ua.match(/(Android)\s+([\d.]+)/)
	, os_vision = os && os[2]
	, $input_decorate = $('.js_input_decorate')
if(os_vision && os_vision <= '4.1.1'){
	$input.on('focus', function(){
		$input_decorate.addClass('input_focus')
	}).on('input', function(){
		if($input.val()){
			$input_decorate.addClass('input_valid')
		} else {
			$input_decorate.removeClass('input_valid')
		}
	}).on('focusout', function(){
		$input_decorate.removeClass('input_focus')
	})
}
/**
 * 推荐单品加载
 */
if(fml.vars.attr_rec_name){
	$.post('/aj/getGoods/recommend_wap', {'word_name':fml.vars.attr_rec_name}, function(res){
		var cur_num = $('.slide_num .cur')
			, all_num = $('.slide_num .all')
			, tpl = shareTmp('attr_goods', res)

		all_num.html(Math.ceil(res.data.tInfo.length/3))
		$('.swipe-wrap').append(tpl)

		var slide = new Swipe($('#slider')[0], {
			speed: 200,
			auto: 3000,
			callback: function() {
				cur_num.html(slide.getPos() + 1)
			}
		})
	}, 'json')
}

/**
 * 下拉分类列表
 */
$('.js_cate').on('click', function(){
	click_cate_hack = true
	if($(this).data('status') != 'show'){
		$('.nav_route').show()
		maskTab('show')
		$(this).data('status', 'show')
	} else {
		click_cate_hack = false
		$('.nav_route').hide()
		maskTab('hide')
		$(this).data('status', 'hide')
	}
	return false
})
$('.mask, .mls_desc, .wap_nav').on('click', function(){
	if($(this).hasClass('js_cate')) return false
	$('.nav_route').hide()
	$('.js_cate').data('status', 'hide')
	maskTab('hide')
})

function maskTab(action){
	var $mask = $('.mask')
	if(action == 'show'){
		clearTimeout(hideMaskT)
		if($mask.attr('status') == 'hide'){
			$mask.show().attr('status', 'show')
		}
	} else {
		$mask.attr('status', 'hide')
		var hideMaskT = setTimeout(function(){
			$mask.hide()
		}, 300)
	}
}

