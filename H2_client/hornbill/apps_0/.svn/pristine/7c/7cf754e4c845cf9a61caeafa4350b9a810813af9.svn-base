/*common*/
var jquery = require('jquery'),
	timedown = require('app/doota/timedown')
	, lazyLoad = require('component/lazyLoad');


/* 焦点图 */
fml.use(['app/focus_banner', 'app/tracking'] , function(){
	var tracking = this.tracking,
		unit = '.top_bnr .banner li';

	this.focus_banner.bind({
		'unit' : unit
		,'btn': '.round .adType a'
		,'transition' : 'fade'
		,'btnpn': '.btnpn'
		,'toprev':'.bnr_btn_left'
		,'tonext':'.bnr_btn_right',
		cbk: function(el) {
			if(typeof el == 'number') {
				el = $(unit).eq(el);
			}
			tracking.logIt('main-banner', {
				index: el.index(),
				url: el.find('a').attr('href')
			});
		}
	})
});

/* 焦点图按钮 */
fml.use('jquery' , function(){
	$('.banner,.bnr_btn').hover(function(){
		$('.bnr_btn_wrap .bnr_btn').show();
	},function(){
		$('.bnr_btn_wrap .bnr_btn').hide();
	});
});

/* 二级菜单 */
fml.use('jquery' , function(){
	$('.sec_attr .list').hover(function(){
		$('.sec_attr .list').removeClass('active')
		$(this).addClass('active');
		$(this).children('.nav_list').show();
	},function(){
		$('.sec_attr .list').removeClass('active');
		$(this).removeClass('active');
		$(this).children('.nav_list').hide();
	});
});

/* 选项卡 */
fml.use('jquery' , function(){
	function selected(className){
		className.find('.table_menu > ul > li').eq(0).addClass('selected');
		var aLi = className.find('.table_menu > ul > li');
		var aDiv = className.find('.table_content');
		aLi.on('click',function(){
			$(this).addClass('selected').siblings().removeClass('selected');
			var index = $(this).index();
			aDiv.eq(index).removeClass('div_hide').siblings().addClass('div_hide');
		});
	}
	selected($('.other2F'));
	selected($('.other3F'));
	selected($('.other4F'));
	selected($('.other5F'));
	/* 懒加载 */
	lazyLoad.load('.lazy_load','asrc');
});

/* 倒计时 */
fml.use('jquery' , function(){
	$('.time').each(function(index) {
		var self = $(this);
		timedown.down(self, self.attr('time'), '0d-0h-0i-0s', ['<span>%v</span>天', '<span>%v</span>时', '<span>%v</span>分', '<span>%v</span>秒'])
			.onTimeOver(function() { 
				// window.location.reload();
				$('.time').html('活动结束');
			})
			.onAction(function() {
				var t = arguments[2];
				day = t.d && t.d != 0 ? (t.d < 10 ? "0" + t.d : t.d) : "00";
				hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
				min = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
				sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
				// ms = t.e;
				self.html("仅剩：<span>" + day + "</span>天<span>" + hour + "</span>小时<span>" + min + "</span>分<span>" + sec + "</span>秒");
			}).setHeartHum(1000);
	});
});
