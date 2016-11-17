/*common*/
var $ = require('wap/zepto')
	,lazy = require('wap/component/lazzyLoad')
	,scroll = require('wap/component/windowScroll')
	,timedown = require('wap/app/doota/timedown')
	,$hour = $('#hour')
	,$minu = $('#minu')
	,$sec = $('#sec')
	,$gotop = $('.gotop');

function bindEvent(){
	topBtnHandle(30);
}
//去顶部
function topBtnHandle(y){  //页面下拉到一定位置，回顶部按钮显示
	scroll.yIn(y,function(){
		$gotop.show();
	},
	function(){
		$gotop.hide();
	})
	$gotop.on("click", function(e) {
		document.body.scrollTop == 0 ? document.documentElement.scrollTop = 0 :
		document.body.scrollTop = 0;
	});
}

function calcuteCountDown(t_container, stamp){
	timedown.down(t_container, stamp, '0h-0i-0s', ['<b>%v:</b>', '<b>%v:</b>', '<b>%v</b>'])
	.onAction(function() {
		var t = arguments[2];
		hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
		minu = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
		sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
		if ($hour.html() != hour) {
			$hour.html(hour);
		}
		if ($minu.html() != minu) {
			$minu.html(minu);
		}
		if ($sec.html() != sec) {
			$sec.html(sec);
		}
	})
	.onTimeOver(function(){
		window.location.reload();
	});
}

function getTuanCountDown($dom, classname){
	$dom.each(
	function() {
		var _this = $(this);
		var leftsecond = _this.data('time');
		d = parseInt(leftsecond / (3600 * 24)); //计算出相差天数
		h = parseInt((leftsecond / 3600) % 24); //扣除相差天数，计算出相差小时数
		m = parseInt((leftsecond / 60) % 60); //扣除相差天数，小时数，计算出相差分钟数
		// s=parseInt(leftsecond%60);//扣除相差天数、小时数、分钟数相差数，计算出相差秒速
		_this.html('剩余' + d + '天' + (h < 10 ? '0' + h : h) + '小时' + (m < 10 ? '0' + m : m) + '分');
		_this.removeClass(classname);
	})
}
function init(){
	var lazyer = lazy.init({'xpath' : '.bs_load_img'});
	lazyer.scroll();
	lazyer.load();
	bindEvent();
	calcuteCountDown($('.secregion').find('.stime'),$('.secregion').find('.stime').data('stime'));
	getTuanCountDown($('.time'), 'time');
}
init();