/*common*/
var lazyLoad = require('wap/component/lazyLoad');
lazyLoad.load($('.bs_load_img'), 'asrc');

var shareTmp = require('component/shareTmp'),
	callApi = require('wap/component/callApi'),
	Alert = require('wap/ui/alert');

// wap weixin share
if(fml.vars.CONFIG_SHARE){
	var signWX = require('wx/sign'),
		shareWX = require('wx/share');
	signWX();
	fml.vars.shareData = {
		'desc' : fml.vars.CONFIG_SHARE.text,
		'imgUrl' : fml.vars.CONFIG_SHARE.src,
		'title' : fml.vars.CONFIG_SHARE.title
	};
	shareWX.bind(fml.vars.shareData);
}


var alert = function (param){
	new Alert({
		'content': param,
		'onSure' : function(){
			//window.location.reload();
		}
	});
};
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
	};
	if(Meilishuo.config.user_id === 0){
		window.location.href = 'meilishuo://login.meilishuo';
	}
}