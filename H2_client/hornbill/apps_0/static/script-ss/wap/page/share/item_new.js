/*common*/

var $ = require('wap/zepto')
	, timedown = require('wap/app/doota/timedown')
	, lazy = require('wap/component/lazzyLoad')
	, slider = require('wap/component/slider')
	, shareTmp = require('wap/component/shareTmp')
	, carts = require('wap/app/doota/shopping_carts')
	, scrollStop = require('wap/component/scrollStop')
	, screenPic = require('wap/component/screenPic')

/**
 * 图片滑动
 */
slider()

/**
 * @type 图片全屏滑动
 */
screenPic.init({
	trigger : '#slider .image_item'
})

/*
 * 详情页跳转对应的tab
 *
 */
$('.js_open_detail').on('click', function(){
	window.location.href = $(this).data('href')
})

timedown.down('.countdown>span', parseInt($('.countdown').attr('remain')))
$('.countdown_l').each(function(){
	var ele = $(this)
	var remain = parseInt(ele.attr('remain'))
	if (!remain) return
	timedown.down(this , remain)
})

/*  lazyload  */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()
lazy_pic.load()
// 给元素绑定scrollStop事件
scrollStop('#goods_wall')


$.get('/aj/shop/shop', {
			frame : 0 ,
			shop_id : fml.vars.shop_id,
			limit : 20
		}, function(res){
			fml.vars.poster_r = res.r
			$('#goods_wall').append(shareTmp('poster_tpl', res.data.gInfo))
			lazy_pic.load()
		}, 'json')

function search_submit(event){
	event.preventDefault();

	var keyword = $.trim($('#bottom_search').val())
	if(!keyword){
		var search_data = $('.js_search_btn')
		var search_url = search_data.data('url')
		var search_placeholder = search_data.data('words')
		if(search_url){
			return window.location.href = search_url
		}
		if(search_placeholder != '搜索宝贝'){
			return window.location.href = '/search/?keyword=' + encodeURIComponent(search_placeholder);
		}
		return false;
	} else {
		return window.location.href = '/search/?keyword=' + encodeURIComponent(keyword);
	}
}

;(function(){

	carts.readShopsCount()
	var b_h = $('body').height() - $(window).height()

	setTimeout(function(){
		if(document.referrer.indexOf('meilishuo.com') < 0){
			$('.seo_wrods').eq(0).show().animate({'height': '.32rem'}, 'ease-out')
			b_h = $('body').height() - $(window).height()
		}
	}, 1000)

	$('.js_search_form').on('submit', search_submit)
	$('.js_search_btn').on('click', search_submit)

	$(window).on('resize', function(){
		b_h = $('body').height() - $(window).height()
	})

	var dY = 0
		, mY = 0
		, wrapper = $('.wrapper')
		, bottom_detail = $('.bottom_detail')
		, bottom_detail_text = bottom_detail.find('span')
		, can_show_detail = false

	$('.wrapper').on('touchstart', function(event){
		dY = event.touches[0].pageY
		mY = 0
	}).on('touchmove', function(event){
		mY = event.touches[0].pageY - dY
		if($('body').scrollTop() >= b_h - 5 && mY < 0){
			can_show_detail = true

			event.preventDefault()

			wrapper.css('top', mY/2 + 'px')
			if(mY < -200){
				bottom_detail_text.html('释放，查看图文详情')
			} else {
				bottom_detail_text.html('继续拖动，查看图文详情')
			}
		} else {
			can_show_detail = false
			wrapper.css('top', '0')
			bottom_detail_text.html('继续拖动，查看图文详情')
			dY = event.touches[0].pageY
			mY = 0
		}
	}).on('touchend touchcancel', function(event){
		if(can_show_detail){
			wrapper.animate({'top': '0'}, 10)
			bottom_detail_text.html('继续拖动，查看图文详情')
			if(mY < -200){
				setTimeout(function(){
					window.location.href = $('.top_detail_enter').data('href')
				}, 10)
			}
		} else {
			return true
		}
	})
})()

/*
 * 喜欢
 *
 */

 $('#js_love_btn').on('click' ,function(){
 	var $this = $(this)
 		, tid = fml.vars.twitter_id
 		, data = {'stid' : tid}
 		, url = '/aw/twitter/like';

 	if(Meilishuo.config.user_id == '0')
     	window.location.href = '/user/login'

    if($this.hasClass('love_show')) {
    	$this.removeClass('love_show')
    } else {
    	$this.addClass('love_show')
    }

 	$.post(url, data, function(res){
		if(res.data){
			$this.addClass('love_show')
		} else {
			$this.removeClass('love_show')
		}
	}, 'json');

 })
