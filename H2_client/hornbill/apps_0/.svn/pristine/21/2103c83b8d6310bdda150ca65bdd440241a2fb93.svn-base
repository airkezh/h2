/*common*/
require('wap/zepto')
require('wap/zepto/fastclick')
require('wap/zepto/scroll')

var logTrack = require('wap/app/tracking')
var lazy = require('wap/component/lazzyLoad')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')

$('.fix_tab div').on('click', function(){
	var go_tab = $(this).attr('go');
	logTrack.cr('beauty_sale1212_fenhuichang_mob', {'type': go_tab});
	$('html,body').scrollTo({
		endY : $('.'+go_tab).offset().top-$('.tab_nature').height(),
		updateRate: 10
	})
})

$('.tab_nature div').on('click', function(){
	var go_tab = $(this).attr('go');
	logTrack.cr('beauty_sale1212_fenhuichang_mob', {'type': go_tab});
	$('html,body').scrollTo({
		endY : $('.'+go_tab).offset().top-$('.tab_nature').height(),
		updateRate: 10
	})
})


var h = $('.top_bannar').height()
function navMove(pos,isDown){
	if(pos < h){
		$('.fix_tab').hide();
	} else {
		$('.fix_tab').show();
	}
}
onscroll.bind(navMove, 'navMove');

$(document).on("touchstart", function(event){
	if (!event.touches.length) return
	var touch = event.touches[0]
	startY = touch.pageY
})
$(document).on("touchmove",function(){
	if (!event.touches.length) return
	var touch = event.touches[0]
	if(touch.pageY -startY > 0){
		$('.fix_tab').hide();
	}
}, false)


/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.load().scroll()


