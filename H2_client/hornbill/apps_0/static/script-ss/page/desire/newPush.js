/*common*/
var banner = require('app/focus_banner'),
	scroll = require('component/windowScroll'),
	timedown = require('app/doota/timedown');

//倒计时
$('.time').each(function(index) {
	var self = $(this);
	timedown.down(self, self.attr('time'), '0d-0h-0i-0s', ['<b>%v</b>天', '<b>%v</b>时', '<b>%v</b>分', '<b>%v</b>秒'])
		.onTimeOver(function() { 
			// window.location.reload();
			$('.clock_center').html('活动结束');
		})
		.onAction(function() {
			var t = arguments[2];
			day = t.d && t.d != 0 ? (t.d < 10 ? "0" + t.d : t.d) : "00";
			hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
			min = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
			sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
			// ms = t.e;
			self.html("<b>" + day + "</b>天<b>" + hour + "</b>时<b>" + min + "</b>分<b>" + sec + "</b>秒");
		}).setHeartHum(1000);
});

//轮播图
// banner.bind({
// 	'unit': '.banner li',
// 	'btn': '.focus a',
// 	'transition': 'fade'
// });
//posterWalls
fml.use(['jquery', 'app/posterWalls', 'component/shareTmp', 'component/urlHandle'], function() {
	var shareTmp = this.shareTmp
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame': query.frame || 0,
		'page': query.page || 0,
		'page_type': 'list',
		'tab': query.tab || 0
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts, '/aj/desire_push/index/waterFall');
});
fml.use('component/lazyLoad', function() {
	this.load('.ad_pic span.h270', 'asrc');
});
// like
// fml.use('app/like', function() {
// 	this.posterLike('.goods_wall', '.poster_likes');
// });

//menu
function fixFun() {
	var clockBox = $('#clockBox'),
		tabNew = $('#tabNew'),
		goods_wall_box = $('.goods_wall_box'),
		tabClockHeight = tabNew.height() + clockBox.height(),
		navHeight = $('#nav').height(),
		clockBoxHeight = clockBox.height(),
		y1 = clockBox.offset().top - navHeight,
		y2 = tabNew.offset().top - navHeight - tabClockHeight;
	scroll.yIn(y1, function() {
		clockBox.addClass('clock-box-fixed');
	}, function() {
		clockBox.removeClass('clock-box-fixed');
	});
	scroll.yIn(y2, function() {
		tabNew.addClass('tab-box-fixed').css('top', clockBoxHeight + 'px');
		goods_wall_box.css('margin-top', tabClockHeight + 10 + 'px');
	}, function() {
		tabNew.removeClass('tab-box-fixed');
		goods_wall_box.css('margin-top', '0');
	})
}
fixFun();