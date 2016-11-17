/*common*/
require('wap/zepto');
require('wap/zepto/fastclick');
require('wap/app/dialog');
var onscroll = require('wap/component/windowScroll'),
	openAppLink = require('wap/app/openAppLink'),
	shareWX = require('wx/share'),
	shareTmp = require('wap/component/shareTmp'),
	poster = require('m/app/posterPa');

//变量
var box = $('#box'),
	$gotop = $('.gotop'),
	pic=box.find('.pic'),
	weixinBrowser = navigator.userAgent.indexOf('MicroMessenger');

//十万件蒙层
$('.bnrOnSale').on('click',function(){
	var tpl = shareTmp('intro');
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('.btn').on('click' , function(){
		$('.closeDialog').trigger('tap');
	});
})

//解决新版APP挡住返回顶部和分享
if (fml.vars.inAppTabbar && fml.vars.inAppTabbar == 1) {
	var bottomOffset = parseInt($gotop.css('bottom'));
	$gotop.css('bottom', bottomOffset + 50 + "px");
	$('.starBox .share_ico').css('padding-bottom', "50px");
}
//防止买手截图的时候高度不一样造成的错位
pic.map(function(index, item) {
	$(item).height(parseInt($(item).width() * 520 / 320) + "px");
});
// 瀑布流
// poster.set({
// 	colNum: 2,
// 	box: box
// });
// poster.add(fml.vars.listData.data.small, {
// 	data: {
// 		frame: 0
// 	}
// });
/*链接*/
function getIngUrl(ele) {
	var style_id = parseInt(ele.parents('li').data('id')),
		twitter_id = parseInt(ele.parents('li').data('tid')),
		detailURL = 'http://' + fml.vars.mlsHost + '/zulilyOld/detail/?style_id=' + style_id + '&frm=profile_want_ing',
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'openURL',
			'param': {
				"url": detailURL
			}
		}) : '/zulilyOld/detail/?style_id=' + style_id + '&frm=profile_want_ing';
	window.location.href = window.__get_r(Url,ele.parents('ul').data('xr'));
}

function getDoneUrl(ele) {
	var style_id = parseInt(ele.parents('li').data('id')),
		twitter_id = parseInt(ele.parents('li').data('tid')),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) : '/share/item/' + twitter_id;
	window.location.href = window.__get_r(Url,ele.parents('ul').data('xr'));
}
box.on('click', '.ing-link', function() {
	getIngUrl($(this));
});
box.on('click', '.done-link', function() {
	getDoneUrl($(this));
});
// 微信浏览器分享
if (weixinBrowser != -1) {
	shareWX.bind({
		'title': fml.vars.shareData.title,
		'desc': fml.vars.shareData.text,
		'imgUrl': fml.vars.shareData.pic,
		'link': fml.vars.shareData.url
	});
}
/*gotop*/
$gotop.on("click", function(e) {
	document.body.scrollTop = 0
});
onscroll.bind(gotop, 'gotop');

function gotop(pos, isDown) {
	if (pos < 30) {
		$gotop.hide()
	} else {
		$gotop.show()
	}
};


