/*common*/
require('wap/zepto/fastclick')
require('wap/app/dialog');

var Alert = require('wap/ui/alert')
	, signWX = require('wx/sign')
	, shareWX = require('wx/share')
	, shareTmp = require('wap/component/shareTmp');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')
	, user_id = $('.shareMain').attr('user_id')

/*   Alert  */
var a = function(msg) {
	return new Alert({
		content: msg
	});
};

//选款
$('.want').on('click',function(){
	var $this = $(this)
		, icon = $this.children('.icon')
		, state = icon.attr('state')

	if(state == 0) {
		icon.addClass('want_icon')
		icon.attr('state', 1)
	}
	if(state == 1) {
		icon.removeClass('want_icon')
		icon.attr('state', 0)
	}

})

//下一步
$('.next').on('click', function(){
	var want_num = $('.want .want_icon').length
		, selected =  $('.goodsInfo li').find('.want_icon')
		, store = []

	for(i = 0; i < selected.length; i++ ){
		var storeLi = $(selected[i]).parents('li').attr('small_pic')
		store.push(storeLi)
	}

	if(want_num == 0) {
		a('请挑选1~3件想要的商品~')
	} else if(want_num > 3) {
		a('最多可以选择3件商品哦~')
		store = []
	} else {
		$('.listMain').hide()
		$('.shareMain').show()
		document.body.scrollTop = 0
	}

	//选款信息
	for(i = 0; i < store.length; i++) {
		$('.want_list').append('<img src=' + '"' + store[i] + '" />')
	}

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
		'success': function(res){
			$.get('/aj/redPaper/shareState', {
				'from_id': fml.vars.from_id
				, 'from_weixin' : '1'
			}, function(res){
				window.location.href = 'http://' + fml.vars.mlsHost + '/activity/redPaper/coupon/?from_id=' + fml.vars.from_id + '&from_weixin=1'
			},'json');
		}
	});
}

$('.shareBtn').on('click',function(){
	var tpl = shareTmp('shareLead');
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('#maskLayer').on('click' , function(){
		$('.closeDialog').trigger('tap');
	});
})

