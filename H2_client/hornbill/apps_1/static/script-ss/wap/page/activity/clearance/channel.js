/*common*/
require('wap/zepto')
require('wap/zepto/scroll')

var logTrack = require('wap/app/tracking')
var touchSlide = require('wap/app/touchSlide')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')
var lazy = require('wap/component/lazzyLoad')
var Waterfall = require('wap/component/g-waterfall')
var timedown = require('wap/app/doota/timedown')
var $nav = $('.sec_nav');

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll();
lazy_pic.load();


//楼层数字显示
(function(){ 
	// window height
	var	WH = $(window).height();
	var timer = null;

		// scroll position
		$(window).scroll(function(){
			var $w = $(this);
			if(timer){
				clearTimeout(timer);	
			}		
			timer = setTimeout(floor, 100);
			function floor(){
				var maxHeight = $w.scrollTop() + WH,
					_wScrollTop = $w.scrollTop();

				if($('.shopitem').length){ 
					$('.shopitem').each(function(){
						var _this = $(this);
						var _top = _this.offset().top - _wScrollTop;
						var $next = _this.next();
						var nextTop = $next.length >0 ? $next.offset().top - _wScrollTop : 0;

						if( (_top >= 0 && _top <= maxHeight ) ||  (_top+_this.height()>=0 && _top+_this.height()<= maxHeight ) ){
							if( nextTop != 0 && nextTop <= WH/2 ){
								$('.floor_num').text($next.index()+1)
							}else{
								$('.floor_num').text(_this.index() + 1)
							}
							return false; 
						}

					});		
				}else{
					$('.floor_num').text(0);
				}	
			}
		});
}());

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

//数据加载
var $posterWrap = $('#posterWrap')
	, $pullUp = $('.pullUp');
var page = 1
	, xhr = null;

var addPoster = function (cbk){
	var url = '/clearance/shopList/'
		, $curTab = $('.tab_item.active')
		, _page; 
	var data = {
		count : 10
		, is_good : true
		, good_num : 2
		, tab : $curTab.attr('status')
		, r : fml.vars.r + ':area_tab=' + ($curTab.index() + 1)
		, page : page
	}
	if(data.tab == 4){
		_page = fml.vars.foretotalPage;
	}else{
		_page = fml.vars.totalPage;
	}
	
	if(page <= _page){
		if(xhr){ xhr.abort();}
		xhr = $.get(url, data, function (res){
			if(res.error_code == 0){
				$posterWrap.append(shareTmp('posterWall', res.data));
				$('.floor_sum').text(res.data && res.data.page.count);
				$(window).trigger('scroll');
				if(cbk) cbk();
				lazy_pic.load();
				page++;
				if(page > _page){
					$pullUp.attr('status', 'stop');
				}
			}
		}, 'json')
	}else{
		$pullUp.attr('status', 'stop');
	}
}

addPoster();

var wfIns = new Waterfall({firstRequest:0});
wfIns.on('requestDataStart',function(){
    addPoster(function(){
        wfIns.emit('requestDataEnd');
    });
});

// tab change
$('.tab_item').on('click', function(){
	var $this = $(this);
	$this.addClass('active').siblings().removeClass('active');
	page = 1;
	$pullUp.attr('status', 'loading');
	wfIns.reset();
	wfIns.emit('requestDataStart');
	$posterWrap.html('');	
});

//弹幕
var toasts = fml.vars.toast.data || [];
function randomTime(index){
	if(index == 0){
		return Math.ceil(Math.random() * 15 + 15) * 1000;
	}else if(index > 0){
		return Math.ceil(Math.random() * 20 + 30) * 1000;
	}
}

var index = 0;
function run(){
	var time = randomTime(index) || 50000;
	var hideTime = 5000;

	var $toast = $('.toast');
	if(index >= toasts.length){
		index = 0;
	}
	setTimeout(function(){
		var toast = toasts[index];
		$toast.animate({display:"block"});
		$toast.find('img').attr('src', toast && toast.activtor);
		$toast.find('span').text(toast && toast.toast);

		setTimeout(function(){
			$toast.hide();
			index ++;
			run();
		},hideTime);

	},time);
}

run();

//标签吸顶
function navFixed(){
	onscroll.yIn($nav.position().top + 10,function(){
		$nav.removeClass('scrollout').addClass('scrollin');
	},
	function(){
		$nav.removeClass('scrollin').addClass('scrollout');
	})
}
navFixed();

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
onscroll.bind(gotop, 'gotop');