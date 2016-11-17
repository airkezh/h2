/*common*/
require('wap/app/dialog');
require('wap/zepto/fastclick');

var shareTmp = require('wap/component/shareTmp')
	, signWX = require('wx/sign')
	, shareWX = require('wx/share');

var get_ticket = $('.get_ticket')
	, weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')

get_ticket.on('click',function(){
	var tpl = shareTmp('userInfo');
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});

    $('#closeIcon').on('click', function(){
    	$('.closeDialog').trigger('tap');
    })

 	$('#submit').on('click' , function(event){
 		var userName = $('#userName').val()
			, userTel = $('#userTel').val()
			, userAddress = $('#userAddress').val()
			, errorTip = $('#errorTips')

 		event.preventDefault();

 		var data = {
			'name' : userName
			, 'mobile' : userTel
			, 'address' : userAddress
			, 'activity' : 'music_festival_xian'
		}

		var testMobile = /^1[3|4|5|8|7][0-9]\d{8}$/.test(data.mobile)

 		if(!data.name) {
	    	errorTip.html('*请输入姓名！')
	    } else if (!data.mobile) {
	    	errorTip.html('*请输入手机号码！')
	    } else if(!testMobile) {
	    	errorTip.html('*请输入正确的手机号！')
	    } else if(!data.address) {
	    	errorTip.html('*请输入地址！')
	    } 

	    if(data.name && data.mobile && data.address && testMobile) {
	    	$.post('/aj/music/userInfo', data, function(){
	    		$('.closeDialog').trigger('tap');
	    	},'json')
	    }

	});
 	
})

$('.shareBtn').on('click',function(){
	var tpl = shareTmp('shareLead');
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('#dialogLayer').on('click' , function(){
		$('.closeDialog').trigger('tap');
	});
})

/*  微信签名 */
signWX()

/*   微信浏览器分享   */
if (weixinBrowser != -1) {
	shareWX.bind({
		'desc':'美丽说夏日狂欢带你high，草莓音乐节免费门票抢到手软',
		'imgUrl':'http://d02.res.meilishuo.net/pic/_o/ff/b9/8e2584a9b8a01025ef944f827976_640_640.ch.jpg',
		'title':'美丽说夏日狂欢 西安草莓音乐节门票免费送',
		'link': 'http://' + fml.vars.mlsHost + '/activity/music/ticket/'
	});
}
