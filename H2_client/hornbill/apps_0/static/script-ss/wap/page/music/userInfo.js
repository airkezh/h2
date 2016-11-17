/*common*/
require('wap/app/dialog');
require('wap/zepto/fastclick');

var shareTmp = require('wap/component/shareTmp')
	, signWX = require('wx/sign')
	, shareWX = require('wx/share')
	, openApp = require('wap/app/openApp')

var submit = $('#submit')
	, weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')


/*  微信签名 */
signWX()

/*   微信浏览器分享   */
if(weixinBrowser != -1) {
	shareWX.bind({
		'desc':'玩游戏，拼眼力，免费门票拿到手软！南方草莓音乐节向你招手～',
		'imgUrl': 'http://d04.res.meilishuo.net/pic/_o/f8/a1/806866792b3622c4ba8375965124_640_640.cf.jpg',
		'title':'在这个看脸的星球我偏要拼实力！草莓音乐节门票是我的！',
		'link': 'http://' + fml.vars.mlsHost + '/activity/music/main/'
	});	
}


submit.on('click', function(event) {
	var name = $('#name').val()
		, tel = $('#tel').val()
		, address = $('#address').val()
		, errorTip = $('#errorTips')

	event.preventDefault()

	var data = {
		'name' : name
		, 'mobile' : tel
		, 'address' : address
		, 'activity' : 'music_festival_south'
	}

	var testMobile = /^1[3|4|5|8|7][0-9]\d{8}$/.test(data.mobile)

	if(!data.name) {
    	errorTip.html('请输入姓名！')
    } else if (!data.mobile) {
    	errorTip.html('请输入手机号码！')
    } else if(!testMobile) {
    	errorTip.html('请输入正确的手机号！')
    } else if(!data.address) {
    	errorTip.html('请输入地址！')
    }

    if(data.name && data.mobile && data.address && testMobile) {
    	$.post('/aj/music/userInfo', data, function() {
    		window.location.href = '/activity/music/success/'
    	},'json')
    } 
})


