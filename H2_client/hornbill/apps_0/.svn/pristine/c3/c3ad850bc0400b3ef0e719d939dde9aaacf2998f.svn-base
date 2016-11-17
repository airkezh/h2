/*common*/
require('wap/zepto')
require('wap/zepto/scroll')

var shareTmp = require('wap/component/shareTmp')
, dialog = require('wap/app/dialog')
, onscroll = require('wap/component/windowScroll')
, appShare = require('wap/app/appShare');

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