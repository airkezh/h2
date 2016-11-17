/*common*/
require('wap/zepto')
require('wap/zepto/scroll')

var logTrack = require('wap/app/tracking')
var touchSlide = require('wap/app/touchSlide')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')
window.timedown = require('wap/app/doota/timedown')
var lazy = require('wap/component/lazzyLoad')

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()

/* 图片轮播hack */
if($('#imageSlide li').length != 0){
	var winWidth = $(document).width()
		,slideHeight = 240 * winWidth / 640

	$("#imageSlide, #imageSlide li").width(winWidth).height(slideHeight + "px")
	if($('#imageSlide li').length > 1){
		$("#imageSlide").touchSlide({
			autoTime:5000,
			speed:300
		})
	}
}

// 倒计时
function end_down(mSelf){
	var d = 0;
	timedown.down(mSelf, $(mSelf).data('timee'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
		if(t.d != undefined) d = t.d;
		if(t.h != undefined){ t.h += d*24;$(mSelf).find('.hour').html(t.h<10 ? '0'+t.h : t.h); }
		if(t.i != undefined) $(mSelf).find('.sec').html(t.i<10 ? '0'+t.i : t.i);
		$(mSelf).find('.min').html(t.s<10 ? '0'+t.s : t.s);
	}).onTimeOver(function(){
		$(mSelf).html('抢购结束');
	}).correct();
}
function start_down(mSelf){
	var d = 0;
	timedown.down(mSelf, $(mSelf).data('times'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
		if(t.d != undefined) d = t.d;
		if(t.h != undefined){ t.h += d*24;$(mSelf).find('.hour').html(t.h<10 ? '0'+t.h : t.h); }
		if(t.i != undefined) $(mSelf).find('.sec').html(t.i<10 ? '0'+t.i : t.i);
		$(mSelf).find('.min').html(t.s<10 ? '0'+t.s : t.s);
	}).onTimeOver(function(){
		window.location.reload()
	}).correct();
}
$('.js_timeStamp').each(function(){
	var self = this;
	if($(self).data('times') < 1){
		end_down(self)
	} else {
		start_down(self)
	}
});

// 滑动tab
var bind_tab_move = function(){
	var startX = 0
		, moveX = 0
		, touchX = 0
		, max_width = $('.slide_wrap').width() - $('#slide_nav').width()

	$('.js_slide_tab').on('touchstart', function(e){
		if(!e.touches.length) return
		var touch = e.touches[0]
		startX = touch.pageX
	}).on('touchmove', function(e){
		e.preventDefault()
		if(!e.touches.length) return
		var touch = e.touches[0]
		touchX = touch.pageX - startX
		var moveXX = moveX + touchX
		if(moveXX > 100){
			moveXX = 100
		} else if(moveXX + max_width + 100 < 0){
			moveXX = -max_width - 100
		}
		$(this)[0].style.webkitTransform = 'translateX(' + moveXX + 'px)'
	}).on('touchend', function(e){
		moveX += touchX
		if(moveX + max_width < 0){
			$(this).animate({translateX : '-' + max_width + 'px'}, 400, 'ease')
			moveX = -max_width
		} else if(moveX > 0) {
			$(this).animate({translateX : '0px'}, 400, 'ease')
			moveX = 0
		}
	})
}

if($('.slide_wrap').width() > window.innerWidth){
	bind_tab_move()
}

// 数据初始化 & tab点击，切换数据
var $poster = $('#posterWrap')
	, pullUp = $('.pullUp')
	, fragment = {}
	, navk = $('.js_tab_item').length

for (var i = 0, k = navk; i < k; i++) {
	fragment['fragment'+i] = document.createDocumentFragment()
}

function addPoster(poster_id, r){
	$.get('/aj/moas/api', {'_data_id': poster_id}, function(res){
		res.r = r
		var tpl = shareTmp('posterWall', res)
		pullUp.attr('status', 'stop')
		$poster.append(tpl)
		poster_load = false
		lazy_pic.load()
	}, 'json')
}

var poster_load = true
addPoster($('.js_tab_item').eq(0).data('id'), $('.js_tab_item').eq(0).data('r'))

$('.js_tab_item').on('click', function(){
	tab_change(this)
})

var tab_change = function(mSelf){
	var self = mSelf
	var $goods_units = $('.goods_units')
	var num = $(self).data('index')
	var act_num = $('.active').data('index')

	if(num == act_num || poster_load) return false

	$('.active').removeClass('active')
	$('.js_tab_item').eq(num).addClass('active')

	if(fragment['fragment'+num].childNodes.length != 0){
		fragment['fragment'+act_num].appendChild($goods_units[0])
		$poster.append(fragment['fragment'+num])
	} else {
		fragment['fragment'+act_num].appendChild($goods_units[0])
		pullUp.attr('status', 'loading')
		poster_load = true
		addPoster($(self).data('id'), $(self).data('r'))
	}
}

// 链接覆盖点击
$('#posterWrap').on('click', '.item', function(){
	window.location.href = $(this).data('href')
})

// 回顶部
var $gotop = $('.gotop')
$gotop.on("click", function() {
	$.scrollTo({
		endY: 0,
		duration: 1000
	})
})

function gotop(pos, isDown) {
	if (pos < 440) {
		$gotop.hide()
	} else {
		$gotop.show()
	}
}
onscroll.bind(gotop, 'gotop')


$('.js_track').on('click', function(){
	logTrack.cr('clearance_activity', {'action': 'click', 'area' : $(this).data('tr')})
})