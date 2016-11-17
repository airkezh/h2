/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var poster = require('wap/app/posterPa2'),
	tracking = require('wap/app/tracking'),
	openAppLink = require('wap/app/openAppLink'),
	posterWall = require('wap/app/posterWalls8');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger'),
	wrap = $('#wrap'),
	goods_wall = $('.goods_wall'),
	limit = 10,
	wideLimit = 10,
	tag = 'new',
	page = 0,
	status = "done";

poster.set({
	colNum: 2
});
var data = {
	url: '/aj/desire/index_style_list?&limit=' + limit + '&status=' + status + '&wideLimit=' + wideLimit + '&tag=' + tag,
	poster: poster
}
posterWall.scroll(data);

//防止买手截图的时候高度不一样造成的错位
// pic.map(function(index, item) {
// 	$(item).height(parseInt($(item).width() * 520 / 320) + "px");
// });


/*获取单品页链接*/
function getDoneUrl(ele, isBtn) {
	var style_id = parseInt(ele.attr('styleId')),
		twitter_id = ele.attr('twitter_id'),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1,
					"trace_id": fml.vars.trace_id
				}
			}
		}) : '/share/item/' + twitter_id + '?trace_id=' + fml.vars.trace_id;
	if (isBtn) {
		tracking.cr('desire_buy_btn_click', {
			'area': 'list_done',
			'twitter_id': twitter_id,
			'style_id': style_id
		});
	} else {
		tracking.cr('desire_done_twitter_click', {
			'area': 'list_done',
			'twitter_id': twitter_id,
			'style_id': style_id
		});
	}
	window.location.href = Url;
}
wrap.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false);
})
wrap.on('click', '.btn-buy', function() {
	getDoneUrl($(this).parents('.salelUrl'), true);
})