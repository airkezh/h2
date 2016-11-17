fml.define('wap/page/test/fix_nav_top', ['wap/zepto/touch', 'wap/zepto/scroll','wap/component/windowScroll'], function(require,exports){
	var scrollYY = scrollY,
		scrollHY = scrollY,
		onscroll = require('wap/component/windowScroll')
	var removeNav = false;
	var nav_top = function (){
		if(removeNav) return;
		if(scrollY <= scrollYY && scrollY > 300){
			$('.fix_nav_wrap').addClass('fix_nav_wrap_hover')
			scrollHY = scrollY
			removeNav = true
			setTimeout(function(){
				removeNav = false
			}, 300)
		} else {
			$('.fix_nav_wrap').removeClass('fix_nav_wrap_hover')
			removeNav = true
			setTimeout(function(){
				removeNav = false
			}, 300)
		}
		scrollYY = scrollY
	}
	onscroll.bind(nav_top);
	$('.tc').on('tap', function(){
		removeNav = true;
		setTimeout(function(){
			$('.fix_nav_wrap').removeClass('fix_nav_wrap_hover')
			scrollHY = scrollY
			scrollYY = scrollY
			removeNav = false;
		}, 400);
	});
});