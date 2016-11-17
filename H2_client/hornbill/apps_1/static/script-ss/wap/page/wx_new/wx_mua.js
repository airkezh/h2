/*common*/
require('wap/zepto');
require('wap/zepto/fastclick');
require('wap/zepto/scroll');

var api = require('component/callApi');
var time = require('wap/app/doota/timedown');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var onscroll = require('wap/component/windowScroll');
var touchSlide = require('wap/app/touchSlide');
var tracking = require('wap/app/tracking');

var winWidth=$(window).width();
var slideHeight=342*winWidth/640;
$("#imageSlide,#imageSlide li").width(winWidth).height(slideHeight+"px");
$("#imageSlide").touchSlide({autoTime:3000});

window.onload =  function(){
	tracking.cr('wx/onload');
}


$('#go_top').on('click',function(){
	tracking.cr('wx/statistics_action', {'action': 'clickGoTop', 'value': 'null'})
})

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.lazy_pic'});
lazy_pic.scroll();

/* ajax 加载list */
var getData = function(show_id, isPrev){
	var parentNode = $(isPrev ? '.past_box' : '.current_box');
	var url = '/aj/wx_mua/getRecGoods',
		data = {
			'show_id' : show_id,
			'show_type' : fml.vars.show_type
		},
		ck = function(res){
			if(res.data.length){
				var tpl = shareTmp('nine_box', {'goods':res.data, 'isPrev':isPrev});
				parentNode.find('.pullUp').before(tpl);
				var tpl2 = shareTmp('time-box', {'goods':res.data, 'isPrev':isPrev});
				parentNode.find('.pullUp').before(tpl2);
				lazy_pic.load();
				if(!isPrev){
					time.down($('.timeStamp_wrap'), $('.timeStamp_wrap').attr('time') ,'0h-0i-0s-0e',['<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒','<b>%v</b>'])
                    .correct()
                    .onAction(function(){
                        var t = arguments[2];
                        hour=t.h?(t.h<10?"0"+t.h:t.h):"00";
                        min=t.i?(t.i<10?"0"+t.i:t.i):"00";
                        sec=t.s?(t.s<10?"0"+t.s:t.s):"00";
                        ms=t.e;
                        $('.timeStamp_wrap').text("限时抢购 剩余："+hour+"时"+min+"分"+sec+"秒"+ms);
                    }).setHeartHum(100); 
				}
				getGoods(show_id, isPrev);
			} else {
				show_reload(show_id, isPrev, getData);
			}
		}
	$.get(url, data, ck, 'json');
};
var getGoods = function(show_id, isPrev){
	var parentNode = $(isPrev ? '.past_box' : '.current_box');
	var url = '/aj/wx_mua/getGoods',
		data = {
			'show_id' : show_id,
			'show_type' : fml.vars.show_type
		},
		ck = function(res){
			if(res.data.length){
				var tpl = shareTmp('goods_units', {'goods':res.data, 'isPrev':isPrev});
				parentNode.find('.numbers').html(res.data.length+' STYLES');
				parentNode.find('.pullUp').hide().before(tpl);
				parentNode.find('.nine_box .goods').on('click', function(){
					var goods_id = $(this).attr('data');
					var parentNode = $(this).parents('.active_box');
					$('html,body').scrollTo({
						endY : parentNode.find('.go_'+goods_id).offset().top-5,
						updateRate: 10
					});
				});
				if(!isPrev){
					$('.starBox').show();
				}
			} else {
				show_reload(show_id, isPrev, getGoods);
			}
		}
	$.get(url, data, ck, 'json');
}
var addPrev = function(){
	getData(fml.vars.prev_id, true);
	$('.nav_prev').off('click', addPrev);
}
if(fml.vars.curr_id){
	getData(fml.vars.curr_id);
	$('.nav_prev').on('click', addPrev);
} else {
	getData(fml.vars.prev_id, true);
}
var show_reload = function(show_id, isPrev, callback){
	if(isPrev){
		var parentNode = $('.past_box');
	} else {
		var parentNode = $('.current_box');
	}
	parentNode.find('.error_msg').show();
	parentNode.find('.pullUp').hide()
	parentNode.find('.js_reload').on('click', function(){
		parentNode.find('.error_msg').hide();
		parentNode.find('.pullUp').show()
		callback(show_id, isPrev);
	});
};

//mua tap切换
//1, 往期回顾 2, 本期上新 3, 下期预告
$('.nav_inner div').on('click', function(){
	$('.nav_active').removeClass('nav_active');
	$(this).addClass('nav_active');
	$('.active_box').removeClass('active_box');
	var _data = $(this).attr('data');
	$('.' + _data).addClass('active_box');

	//埋点
	switch (_data) {
		case "past_box":
			tracking.cr('wx/statistics_action', {'action': 'muaTab', 'value': '1'})
			break;
		case "current_box":
			tracking.cr('wx/statistics_action', {'action': 'muaTab', 'value': '2'})
			break;
		case "next_box":
			tracking.cr('wx/statistics_action', {'action': 'muaTab', 'value': '3'})
			break;
	}

	lazy_pic.load();
});

function close_act(){
	$('.act_info').hide();
}
$('.main').on('click', '.act_info_btn', function(){
	$('.act_info').show();
	$('.act_info .close').off('click', close_act).on('click', close_act);
	$('.act_info').on('touchmove', function(e){
		e.preventDefault();
		return false;
	});
});


if(!isNaN(fml.vars.act_time_diff) && fml.vars.act_time_diff > 0){
	var offGoodsLink = function(e){
		e.preventDefault();
		return false;
	}
	$('.current_box').on('click', '.goods_units a', offGoodsLink);
	setTimeout(function(){
		$('.current_box').off('click', '.goods_units a', offGoodsLink);
	}, fml.vars.act_time_diff);
}


$('.gotop').on('click', function(){
	$('html,body').scrollTo({
		endY : 0,
		updateRate: 5
	});
});
var $gotop_wrap = $('.gotop_wrap');
function gotop(pos,isDown){
	var top = $('.active_box .goods_units').length ? $('.active_box .goods_units').offset().top : 10000;
	if(pos > top){
		$gotop_wrap.show();
	} else {
		$gotop_wrap.hide();
	}
}
onscroll.bind(gotop, 'gotop_wrap');