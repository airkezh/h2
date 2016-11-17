/*common*/
require('wap/zepto/touch');
require('jquery');
var shareTmp = require('wap/component/shareTmp'),
	callApi = require('wap/component/callApi'),
	Alert = require('wap/ui/alert');
var alert = function (param){
	new Alert({
		'content': param,
		'onSure' : function(){
			//window.location.reload();
		}
	});
}
var shop_id = fml.vars.shop_id;
// for css
var li = $('nav').find('li.nav'),
	li_width = 98.5/(li.length);
li.css('width',li_width+'\%');

$(document).on('tap','nav li',function (){
	var curr_node = $('li.current');
	curr_node.removeClass('current');
	$(this).addClass('current');
	$.get('/aj/shop/new_info',{'topic_id':$(this).attr('id'),'shop_id':shop_id},function (res){
		var tmp = shareTmp('wrapperTmp',res);
		$('.wrapper').html(tmp);
	},'json');
});
$(document).on('swipeRight',function (){
	var curr_node = $('li.current');
	var prev_node = curr_node.prev().prev();
	if(!!prev_node.length){
		curr_node.removeClass('current');
		prev_node.addClass('current');
		$.get('/aj/shop/new_info?shop_id='+shop_id+'&topic_id='+prev_node[0].id,function (res){
			var tmp = shareTmp('wrapperTmp',res);
			$('.wrapper').html(tmp);
		},'json');
	}
});
$(document).on('swipeLeft',function (){
	var curr_node = $('li.current');
	var next_node = curr_node.next().next();
	if(!!next_node.length){
		curr_node.removeClass('current');
		next_node.addClass('current');
		$.get('/aj/shop/new_info?shop_id='+shop_id+'&topic_id='+next_node[0].id,function (res){
			var tmp = shareTmp('wrapperTmp',res);
			$('.wrapper').html(tmp);
		},'json');
	}
});

$('.att_btn').on('tap',function (){
	//跳至客户端登录
	if(Meilishuo.config.user_id == 0){
		window.location.href = 'meilishuo://login.meilishuo';
	}
	var is_follow = $('.attention').hasClass('att');
	var data = {
		'shop_id' : shop_id,
		'frm' : 'shop_new_wap'
	};
	if(is_follow){
		$('.attention').removeClass('att');
		$.get('/aj/shop/unfollow',data,function (res){
			//console.log(res);
		},'json');
		$(this).html('<span class="icon_plus"><img src="'+Meilishuo.config.picture_url+'images/shop/new/icon_plus.png" /></span>关注');
	}else{
		$('.attention').addClass('att');
		$.get('/aj/shop/follow',data,function (res){
			//console.log(res);
		},'json');;
		$(this).html('取消关注');
	}
});
//优惠券
$('.coupons div.get').click(function(){
    //跳至客户端登录
    myCheckLogin();
	var coupon_id = $(this).attr('id'),
		mySelf = $(this);
	callApi.write({'url':'/coupon/coupon_thoroughly_apply'},{'coupon_apply_code' : coupon_id},function(res){
		if (res.code) {
			if(res.code != -1){ alert(res.message); }
		}else{
			var start = res.data.coupon_valid_time_range.start_time.slice(5,10),
				end = res.data.coupon_valid_time_range.expire_time.slice(5,10);
			start = start.replace('-','.');
			end = end.replace('-','.');
			alert('<div class="my_alert"><h3>申领成功</h3><br/><p>有效期：<span class="validity">' + start + '~' + end + '</span><br/>在“我”的页面“优惠券”中查看</p></div>');
			mySelf.removeClass('get').addClass('got').find('img').attr('src','http://i.meilishuo.net/css/images/shop/new/c_got.png');
		}
	});
});
function myCheckLogin(){
	if(!window.MLS){
		window.MLS = {};
	}
	window.MLS.didLogin = function(){
		window.location.reload();
	}
	if(Meilishuo.config.user_id == 0){
		window.location.href = 'meilishuo://login.meilishuo';
	}
}
