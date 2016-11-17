/*common*/
require('wap/zepto/fastclick');

var poster = require('wap/app/posterPa'),
	lazyLoad = require('m/component/lazyLoad'),
	tracking = require('wap/app/tracking'),
	openAppLink = require('wap/app/openAppLink'),
	posterWall = require('wap/app/posterWalls6');

var wrap = $('#wrap'),
	wideLimit = 5;


//一进页面加载数据
getWall(1, '/aj/zulily/style_new_list?flag=list&wideLimit=' + wideLimit, 'newPosterWall', true);

wrap.on('click', '#btnAll', function() {
	window.location.href = window.__get_r('/zulily/allList/', $(this).data('xr'));
})

//拉取瀑布流
function getWall(colNum, url, tmp, showBtn) {
	var lazy_pic = colNum == 1 ? '.lazy_pic_big' : '.lazy_pic';
	poster.set({
		colNum: colNum
	});
	var date = {
		url: url,
		poster: poster,
		tmp: tmp,
		showBtn: showBtn,
		posterMargin: $('#content').offset().top,
		marginOffset: 0,
		lazyLoad: lazyLoad.init({
			xpath: lazy_pic
		})
	}
	posterWall.scroll(date);
};

/*获取单品页链接*/
function getDoneUrl(ele, isBtn) {
	var style_id = parseInt(ele.data('styleId')),
		twitter_id = parseInt(ele.data('twitter_id')),
		Url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) : '/share/item/' + twitter_id;
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
	window.location.href = window.__get_r(Url, ele.parents('.frame').data('xr'));
}
wrap.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false);
})
wrap.on('click', '.btn-buy', function() {
	getDoneUrl($(this).parents('.salelUrl'), true);
})