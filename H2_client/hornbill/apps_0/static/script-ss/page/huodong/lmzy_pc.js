/*common*/
var $ = require('jquery'),
	$navLi = $("#style_nav li"),
	$style_wrap = $("#style_wrap"),
	$style_conts = $(".style_cont"),
	$flash_wrap = $(".flash_wrap"),
	swf_index = 1,
	timer = 0,
	ary_bg = ['http://i.meilishuo.net/css/images/staticbed/style_green.png', 'http://i.meilishuo.net/css/images/staticbed/style_color.png', 'http://i.meilishuo.net/css/images/staticbed/style_orange.png', 'http://i.meilishuo.net/css/images/staticbed/style_white.png'],
	ary_swf = ['http://i.meilishuo.net/css/images/huodong/oppo_pc/1.swf', 'http://i.meilishuo.net/css/images/huodong/oppo_pc/2.swf', 'http://i.meilishuo.net/css/images/huodong/oppo_pc/3.swf', 'http://i.meilishuo.net/css/images/huodong/oppo_pc/4.swf'];
var wrapH=$(".mc_bd").height();
$(window).scroll(function(event) {
	var scoll = $(document).scrollTop();
	if (scoll > (wrapH-300)) {
		$('.sub_nav').hide();
	} else {
		$('.sub_nav').show();
	}
});

var lmzy = {
	init: function() {
		this.eventInit();
	},
	eventInit: function() {
		var _this = this;
		timer = setInterval(function() {
			$flash_wrap.css("display", "none");
			$flash_wrap.eq(swf_index).css("display", "block");
			swf_index++;
			if (swf_index > 3) {
				swf_index = 0;
			}
		}, 30000)
		$navLi.on("click", function() {
			var index = $(this).index();
			$style_conts.css("display", "none");
			$style_conts.eq(index).css("display", "block");
			$style_wrap.css({
				"background": "url('" + ary_bg[index] + "') no-repeat top center",
				"background-size": "100% 100%"
			});
			console.log(index);
		});
	}
}
lmzy.init();