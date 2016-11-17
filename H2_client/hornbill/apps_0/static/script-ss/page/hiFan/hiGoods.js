/*common*/
fml.use(['app/focus_banner', 'app/tracking'], function() {
	var tracking = this.tracking,
		unit = '.top_bnr .banner li';

	this.focus_banner.bind({
		'unit': unit,
		'btn': '.round .adType a',
		'transition': 'fade',
		'btnpn': '.btnpn',
		'toprev': '.bnr_btn_left',
		'tonext': '.bnr_btn_right',
		cbk: function(el) {
			if (typeof el == 'number') {
				el = $(unit).eq(el);
			}
			tracking.logIt('main-banner', {
				index: el.index(),
				url: el.find('a').attr('href')
			});
		}
	})
});
// 分类
fml.use('jquery', function() {
	var $style = $('.style');
	var $scrollDom = $('.scrollDom')
	$style.on('click', function() {
		var $this = $(this);
		var ind = $(this).data('index');
		$this.siblings().removeClass('onStyle');
		$this.addClass('onStyle')
		for(var i = 0 ; i < 4 ; i++){
			if(ind != $scrollDom.find('li').eq(0).data('index')) {
				$scrollDom.find('li').eq(0).appendTo($scrollDom);
			}else{
				continue;
			}
		}
	})
	$style.on('mouseover',function(){
		var $this = $(this);
		var ind = $(this).data('index');
		$this.siblings().removeClass('onStyle');
		$this.addClass('onStyle')
		for(var i = 0 ; i < 4 ; i++){
			if(ind != $scrollDom.find('li').eq(0).data('index')) {
				$scrollDom.find('li').eq(0).appendTo($scrollDom);
			}else{
				continue;
			}
		}
	})
	function upScroll(scrollDom, speed) {
		var scrollDom = $(scrollDom),
			scrollDomChlid = scrollDom.find('li'),
			h = scrollDomChlid.height(),
			s = parseInt(speed);

		var scroll = function() {
			scrollDom.animate({
				'top': -h
			}, function() {
				var index = $(this).find('li').eq(0).data('index');
				scrollDom.find('li').eq(0).appendTo(scrollDom);
				scrollDom.css({
					'top': 0
				});
				if( index==3 ){
					$style.eq(0).siblings().removeClass('onStyle');
					$style.eq(0).addClass('onStyle')
				}else{
					$style.eq(index+1).siblings().removeClass('onStyle');
					$style.eq(index+1).addClass('onStyle')
				}
			});
		};
		var ad = setInterval(scroll, s);

	};
	upScroll(".scrollDom", 4000);
})
fml.use('component/lazyLoad' , function(){
    this.load('.goodsInfo img' ,'asrc');
});