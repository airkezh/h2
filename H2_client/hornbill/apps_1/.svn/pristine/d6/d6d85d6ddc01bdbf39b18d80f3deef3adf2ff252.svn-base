fml.define('wap/page/test/fix_nav', ['wap/zepto/touch', 'wap/zepto/scroll'], function(){
	$('.fix_nav_btn').on('tap', function(){
		if($('.fix_nav_wrap').hasClass('fix_nav_wrap_hover')){
			$('.fix_nav_wrap').removeClass('fix_nav_wrap_hover')
		} else {
			$('.fix_nav_wrap').addClass('fix_nav_wrap_hover')
		}
	});
	$('.tc').on('tap', function(){
		setTimeout(function(){
			$('.fix_nav_wrap').removeClass('fix_nav_wrap_hover')
		}, 300);
	});
});