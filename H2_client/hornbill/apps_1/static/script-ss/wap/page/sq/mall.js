fml.define('wap/page/sq/mall', ['wap/ui/alert' , 'wap/zepto/fastclick','wap/component/shareTmp','wap/app/doota/timedown'/*,'wap/ui/confirm'*/,'m/app/posterWall', 'm/app/posterPa', 'm/component/lazyLoad', 'wap/app/tracking'], function(require) {
	var timedown = require('wap/app/doota/timedown')
		, shareTmp = require('wap/component/shareTmp')
	    , remain = parseInt($('.countdown').attr('remain'))
	    , is_over = parseInt($('.countdown').attr('data-is-over'))
	    , poster = require('m/app/posterPa')
	    , lazyLoad = require('m/component/lazyLoad')
	    , posterWall = require('m/app/posterWall')
	    , tracking = require('wap/app/tracking')
	    , Alert = require('wap/ui/alert')
	var alertDiv = function(msg){
		var a = new Alert({
			content : msg
		});
	}
	var $mask = $('#mask');
	$mask
	.on('touchmove', function(){
		return false;
	})
	.on('click',function(){
		$('html').css('overflow','scroll');
		$mask.animate({'height': '0'}, 600);
	})
	$mask.children('.redirect').click(function() {
		window.location.href = "http://m-qiang.meilishuo.com/sq/coupon_zone?type=noqq"
		return false;
	});

//		团购倒计时入口开始
wxCountDown();
function wxCountDown(){  
		var t_container = $('.s-ltime'),
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
	}

	//用户头像点击
	$('.user_img_space').on('click',function(){
		tracking.cr('sq/statistics_action', {'action': 'userCenterClick', 'value' : 'pop'})
		$user_box = $('.user_box');
		$user_box.css('display') == 'none' ? $user_box.show() : $user_box.hide()
	})

	$('a[href="/sq/user/order_list"]').on('click', function(){
		tracking.cr('sq/statistics_action', {'action': 'goUserCenter', 'value' : 'userCenterPop'})
		return true;	
	})
	$('a[href="/sq/cart/"]').on('click', function(){
		tracking.cr('sq/statistics_action', {'action': 'goCart', 'value' : 'userCenterPop'})
		return true;	
	});
	
	var poster_info = fml.vars.poster
	var p_name = poster_info.pageName || 'daily'
	var poster_url = ''

	switch(p_name){
		case 'daily' :
			poster_url = '/aj/sq/tuan?cate_id=' + poster_info.cate_id;
			break;
		case 'clothes':
			poster_url = '/aj/sq/normal_goods?page_name=' + p_name + '&cate_id=' + poster_info.cate_id;
			break;
		case 'cosmetic':
		default:
			poster_url = '/aj/sq/search'
			break;
	}


	//精选区 瀑布流
	var data = {
		url : poster_url
		, poster : poster
		, lazyLoad : lazyLoad.init({xpath:'.pic_load'})
		, colNum : 2
	}
	if (fml.vars.keyword && fml.vars.keyword != "undefined") {
		data.url += ("?key_word=" + fml.vars.keyword);
		data.url += '&pageid=3'
	};
	posterWall.scroll(data);



	window.onload =  function(){
		tracking.cr('sq/onload');
	}

	$('body').on('click','.li_border a,.tuan a',function(e){
		var $t = $('title')
		var link =  'http://' + location.host + $(this).attr('href') + '&_wv=5123'
			
		$t.html('返回')
		mqq.ui.refreshTitle()
		mqq.ui.openUrl({
			url: link,
			target: 1,
			style: 0
		})

		setTimeout(function (){
			$t.html('美丽说')
		},0)

		e.preventDefault()
	});
	if(!remain) return
	var down = timedown.down('.time_v>span', remain ,'0h-0i-0s',['<b>%v</b>:','<b>%v</b>:','<b>%v</b>'])
	down.onTimeOver(function(){
		var time_v = $('.countdown').children('.time_v');
		if(is_over){
        	time_v.html(shareTmp('time_over'));
        }else{
        	time_v.addClass('time0').text("抢购中…");
        }
	})
})
