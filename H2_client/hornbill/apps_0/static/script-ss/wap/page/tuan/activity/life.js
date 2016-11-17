/*common*/
require('wap/zepto')
require('wap/zepto/scroll')

var lazyLoad = require('wap/component/lazyLoad');
var onscroll = require('wap/component/windowScroll');

lazyLoad.load($('.bs_load_img'), 'asrc');

// 回顶部
var $gotop = $('.gotop')

function gotop(pos, isDown) {
	if (pos < 440) {
		$gotop.hide()
	} else {
		$gotop.show()
	}
}
$gotop.on("click", function() {
	$.scrollTo({
		endY: 0,
		duration: 1000
	})
})
onscroll.bind(gotop, 'gotop');