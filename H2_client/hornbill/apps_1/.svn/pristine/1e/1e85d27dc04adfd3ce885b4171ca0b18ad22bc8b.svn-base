/*common*/
require('wap/zepto/fastclick')

var signWX = require('wx/sign')
	, shareWX = require('wx/share')
	, openApp = require('wap/app/openApp')
	, checkcode = require('app/checkcode')

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')
	, user_id = $('.wrap').attr('user_id')
	, from_id = $('')
	, getRed = $('#getRed')


$('.goApp').on('click',function(){
	openApp('meilishuo://open.meilishuo')
})

/*  微信签名 */
signWX()

/*   微信浏览器分享   */
if (weixinBrowser != -1) {
	shareWX.bind({
		'desc':'红包可用于美丽说平台所有商品，美丽说上10万新衣等你挑！',
		'imgUrl':'http://d03.res.meilishuo.net/pic/_o/78/9d/c5029b2cebab11a787b1f92b3db3_200_200.cf.jpg',
		'title':'我从美丽说领到了255元新衣红包，亲们拿去分了吧，手慢无！',
		'link': 'http://' + fml.vars.mlsHost + '/activity/redPaper/main/?from_id=' + user_id + '&from_weixin=1',
	});
}

/*	名字超过十个字隐藏		*/
var name = $('.friend-nickname');
for(var i=0;i<name.length;i++){
	var length = $(name[i]).text().length;
	if(length > 10 ){
		$(name[i]).html($(name[i]).text().substring(0,10));
	}
}

//验证码
var initCode = function(){
	if($('.checkImage').find('img').attr('isblank') === 'true'){
		$('.checkImage').find('img').attr('isblank', 'false');
	}
	$('.checkImage').bind('tap',changeCode);
	showCode();
};
var changeCode = function(){
	showCode();
	$('#checkcode').val('').focus();
};
var showCode = function(){
	checkcode(function(){
		$('.checkImage').unbind('tap');
		var t = setTimeout(function(){
			$('.checkImage').bind('tap',changeCode);
		}, 600);
	});
};

initCode();

$('#checkcode').on('input', function(){
	var $that = $(this)
		, thatVal = $that.val()

	$that.val() ? getRed.css({'color' : '#eb3939'}) : getRed.css({'color' : '#f9ca55'})
})

getRed.on('click',function(){
	var errorTips = $('.loginErrorMessage')
		, checkcode = $('#checkcode').val()

	if(checkcode) {
		$.get('/aj/redPaper/checkCaptcha', {
				'from_id': fml.vars.from_id
				, 'captcha' : checkcode
			}, function(res){
				if(res.code == 0) {
					window.location.reload()
				} else {
					errorTips.html('验证码错误，请重新输入').addClass('error')
				}

		},'json');


	} else {
		errorTips.html('请输入验证码').addClass('error')
	}
	

})
