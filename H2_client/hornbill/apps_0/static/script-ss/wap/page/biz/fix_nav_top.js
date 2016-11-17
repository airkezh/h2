fml.define('wap/page/biz/fix_nav_top', ['wap/zepto/touch', 'wap/zepto/scroll','wap/component/windowScroll', 'wap/app/tracking'], function(require,exports){
	var onscroll = require('wap/component/windowScroll');
	var logTrack = require('wap/app/tracking');

	var $fix_nav_wrap = $('.fix_nav_wrap');
	var nav_h = $fix_nav_wrap.offset().height;
	var scroll_h = $('#group_1')[0].offsetTop;
	var touchY = 0;
	var touchYY = 0;
	var scrollYY = 0;
	var removeNav = false;
	var scrollNav = false;

	if(Meilishuo.config.os && Meilishuo.config.os.android) {
		$fix_nav_wrap.css({'top': '0', '-webkit-transform': 'translate(0,-100%);'});
		var nav_top = function (){
			if(removeNav) return;
			if(scrollY <= scrollYY && scrollY > 300){
				removeNav = true
				$('.fix_nav_wrap').animate({'-webkit-transform': 'translate(0,0);'}, 300)
				logTrack.cr('mz_girls_nav', {'frm': 'navshow'});
				setTimeout(function(){
					removeNav = false
				}, 300)
			} else {
				removeNav = true
				$('.fix_nav_wrap').animate({'-webkit-transform': 'translate(0,-100%);'}, 300)
				logTrack.cr('mz_girls_nav', {'frm': 'navhide'});
				setTimeout(function(){
					removeNav = false
				}, 300)
			}
			scrollYY = scrollY
		}
		onscroll.bind(nav_top);

		$('.nav_item').on('touchstart touchend', function(event){
			event.preventDefault();
		}).on('tap', function(event){
			event.preventDefault();
			var targetD = $(this).attr('data_target');
			logTrack.cr('mz_girls_nav', {'frm': targetD+'_tap'});
			removeNav = true;
			$('html,body').scrollTo({
				endY : $('#'+targetD).offset().top,
				updateRate: 20
			});
			$fix_nav_wrap.animate({'-webkit-transform': 'translate(0,-100%);'}, 300)
			logTrack.cr('mz_girls_nav', {'frm': 'navhide'});
			setTimeout(function(){
				removeNav = false;
			}, 300);
		});
	} else {
		$('body').on('touchstart', function(event){
			var touch = event.targetTouches[0];
			touchY = touch.pageY;
		}).on('touchmove', function(event){
			var touch = event.targetTouches[0];
			touchYY = touch.pageY;
			if(!scrollNav){
				if(touchYY > touchY){
					$fix_nav_wrap.css({'top': '0'})
					logTrack.cr('mz_girls_nav', {'frm': 'navshow'});
				} else {
					$fix_nav_wrap.css({'top': '-'+nav_h+'px'})
					logTrack.cr('mz_girls_nav', {'frm': 'navhide'});
				}
			}
		});

		$('.nav_item').on('touchstart touchend', function(event){
			event.preventDefault();
		}).on('tap', function(event){
			event.preventDefault();
			var targetD = $(this).attr('data_target');
			logTrack.cr('mz_girls_nav', {'frm': targetD+'_tap'});
			$('html,body').scrollTo({
				endY : $('#'+targetD).offset().top,
				updateRate: 20
			});
			$fix_nav_wrap.css({'top': '-'+nav_h+'px'})
			logTrack.cr('mz_girls_nav', {'frm': 'navhide'});
		});

		var nav_top = function (){
			if(scrollY < scroll_h){
				$fix_nav_wrap.css({'top': '-'+nav_h+'px'})
				logTrack.cr('mz_girls_nav', {'frm': 'navhide'});
				scrollNav = true
			} else {
				scrollNav = false
			}
		}
		onscroll.bind(nav_top);
	}
});