/*common*/
/*fml.use('wap/app/slideOpen' , function(){
	this.tapSlider();
	this.tapDefault();
	$('#openApp').trigger('tap')
	// setTimeout(function(){$('.daoliuBanner').find('.slider').trigger('tap');},1000)
});*/
var $ = require('wap/zepto'),
	WaterFall = require( 'circle/component/waterfall' ),
	optimiseFn = require('circle/component/waterfallOptimise'),
	timedown = require('wap/app/doota/timedown');
	require('wap/zepto/touch');
	require('wap/app/goAppWelcome');
	/* baidu lightapp js */
	var e = document.createElement("script");
	var s = document.getElementsByTagName("script")[0];
	e.type = "text/javascript";
	e.name = "baidu-tc-cerfication";
	e.src = "http://apps.bdimg.com/cloudaapi/lightapp.js#b9f5e498889cf25a702988eebd2a53a9";
	s.parentNode.insertBefore(e, s);

	window.bd && bd._qdc && bd._qdc.init({app_id: '18a49f24d007a1e8a816bd2c'});
	/* baidu lightapp js */

	var personArea = $('#personArea')
	$('#personBtn').on('tap', function(){
		if(Meilishuo.config.user_id == '0')
			window.location.href = window.__get_r('/user/login', fml.vars.common_r)

		if(personArea.attr('isShow') == "0") {
			personArea.show()
			personArea.attr('isShow', "1")
		}
		else {
			personArea.hide()
			personArea.attr('isShow', "0")
		}
	})

	//抢8倒计时
	var t_container = $('.q8_ltime'),
		_hour = $('#hour'),
		_minu = $('#minu'),
		_sec = $('#sec');
		timedown.down(t_container, t_container.attr('stime'), '0h-0i-0s', ['<b>%v</b>', '<b>%v</b>', '<b>%v</b>'])
			.onAction(function() {
				var t = arguments[2];
				hour = t.h ? (t.h < 10 ? "0" + t.h : t.h) : "00";
				minu = t.i ? (t.i < 10 ? "0" + t.i : t.i) : "00";
				sec = t.s ? (t.s < 10 ? "0" + t.s : t.s) : "00";
				if (_hour.html() != hour) {
					_hour.html(hour);
				}
				if (_minu.html() != minu) {
					_minu.html(minu);
				}
				if (_sec.html() != sec) {
					_sec.html(sec);
				}
			});

var waterFallInstance = WaterFall.init({
	el: '.goods_wall',
	url: '/aj/getGoods/recommend',
	data: {
        frame : 0 ,
		word_name : 'hot',
		section : 'hot'
    },
	dataFilter : function(data){
        fml.vars.poster_r = data.r || '';
        return data.data.tInfo
    },
	colNum : 2,
	colGap : 0,
	optimiseFn : optimiseFn,
	onFetchSuccess: function(data){
		if(data.length == 0){
			$('.pullUp').attr('status','stop');
			this.lock();
		}
	}
}).start();

fml.use('wap/app/frame6' , function(){
	this.openClosedFn();
	this.searchFn();
	this.routeFn();
});

