/*common*/
require('wap/zepto/fastclick')
require('wap/app/dialog')

var signWX = require('wx/sign')
	, shareWX = require('wx/share')
	, shareTmp = require('wap/component/shareTmp')

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')

var params = location.search.substr(1).split('&')[0].split(',')
for(i = 0; i < params.length; i++) {
	$('.want_list').append('<img src=' + '"' + params[i] + '" />')
}


/*  微信签名 */
signWX()

/*   微信浏览器分享   */
if (weixinBrowser != -1) {
	shareWX.bind({
		'desc':'我已经发出去好几个红包了，千万别客气，快来抢！',
		'imgUrl':'http://d03.res.meilishuo.net/pic/_o/78/9d/c5029b2cebab11a787b1f92b3db3_200_200.cf.jpg',
		'title':'我从美丽说领到了225元新衣红包，拿去花，手慢无！',
		'link': 'http://lxxm.fedevot.meilishuo.com/activity/redPaper/main/',
		'success': function(res){
			window.location.href = 'http://' + fml.vars.mlsHost + '/activity/redPaper/coupon/' 
		}
	});
}

$('.shareBtn').on('click',function(){
	var tpl = shareTmp('shareLead');
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('#maskLayer').on('click' , function(){
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	});
})

