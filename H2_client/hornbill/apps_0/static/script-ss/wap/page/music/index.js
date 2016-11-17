/*common*/
require('wap/app/dialog');
require('wap/zepto/fastclick');

var signWX = require('wx/sign')
	, shareWX = require('wx/share')
	, shareTmp = require('wap/component/shareTmp')

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')
	, shareBtn = $('.shareBtn')


/*  微信签名 */
signWX()

/*   微信浏览器分享   */
if (weixinBrowser != -1) {
	shareWX.bind({
		'desc':'玩游戏，拼眼力，免费门票拿到手软！南方草莓音乐节向你招手～',
		'imgUrl': 'http://d04.res.meilishuo.net/pic/_o/f8/a1/806866792b3622c4ba8375965124_640_640.cf.jpg',
		'title':'在这个看脸的星球我偏要拼实力！草莓音乐节门票是我的！',
		'link': 'http://' + fml.vars.mlsHost + '/activity/music/main/'
	});
}

function wxShare (ele){
	$(window).scrollTop(0)

	var tpl = shareTmp(ele);
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
    $('#dialogLayer').css({'top' : '10px', 'left' : '23%', })
	$('#maskLayer').on('click' , function(){
		$('.closeDialog').trigger('tap');
	});
}

shareBtn.on('click', function() {
	if(Meilishuo.config.os.mlsApp) {
		$('.appshare').show()
	} else {
		wxShare('shareLead')
	}
	return false
})

$(document).click(function(e){
	var ele = $(e.target).closest('.appshare');
	if(!ele.length){
		$('.appshare').hide();
	}
});

 




