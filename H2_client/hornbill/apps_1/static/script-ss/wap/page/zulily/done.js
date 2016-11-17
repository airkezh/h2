/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var lazy = require('wap/component/lazzyLoad'),
	shareTmp = require('wap/component/shareTmp'),
	tracking = require('wap/app/tracking'),
	openAppLink = require('wap/app/openAppLink'),
	Danmu = require('wap/component/danmu/index');

var $win = $(window),
	nextContent = $("#nextContent"),
	isMoreData = false,
	limit = 5,
	wideLimit = 5,
	page = 0,
	isFirst = true,
	danmu = {},
	danmuData = {},
	isBoundScrollStop = false,
	mark = 0,
	posting = false;

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({
	'xpath': '.lazy_pic'
});
lazy_pic.scroll();

/*一进页面就获取数据*/
function getDataFun(obj, status) {
	getChoiceData(obj, {
		"page": page,
		"limit": limit,
		"status": status,
		"wideLimit": wideLimit
	});
};
getDataFun(nextContent, 'done');
/* 获取数据 */
function getChoiceData(obj, data) {
	if (isFirst) {
		obj.append("<div class='pullUp' status='loading'></div>");
		isFirst = false;
	}
	ajaxFun(obj, 'get', 'json', data, '/aj/zulily/index_style_list', function(res) {
		if (res.data && res.data.big.length) {
			isMoreData = true;
			var tpl = shareTmp('choiceTpl', {
				'dataObj': res.data
			});
			obj.find(".tab-inner").append(tpl);
			//lazyLoad
			lazy_pic.load();
			/** 弹幕相关逻辑 */
			danmuPrepare();
		} else {
			obj.find('.pullUp').remove();
			obj.append('<p class="past-box">没有更多了</p>');
		}
	}, function(error) {
		reload(obj, data, getChoiceData);
	});
};
/*通用Ajax函数*/
function ajaxFun(obj, method, dataType, data, url, callback, errCallback) {
	$.ajax({
		type: method,
		dataType: dataType,
		url: url,
		data: data,
		success: function(data) {
			callback(data);
		},
		error: function(error) {
			errCallback();
		}
	});
};

/*重新加载*/
function reload(obj, data, callback) {
	isFirst = true;
	obj.find('.pullUp').remove();
	obj.append("<div class='load_again'><p>Sorry,页面奋力加载失败了</p><input type='button' class='btn' value='重新加载'></div>");
	obj.find('.load_again').find('.btn').off('click').on('click', function() {
		obj.find('.load_again').remove();
		callback(obj, data);
	});
};

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
nextContent.on('click', '.salelUrl', function() {
	getDoneUrl($(this), false);
})
nextContent.on('click', '.btn-buy', function() {
	getDoneUrl($(this).parents('.salelUrl'), true);
})

/*滚动动态加载*/
function scrollFun() {
	var obj = nextContent;
	var status = 'done';
	var o = obj.offset().top,
		bh = obj.height(),
		t = $win.scrollTop();
	var getData = function() {
		getChoiceData(obj, {
			"page": page,
			"limit": limit,
			"status": status,
			"wideLimit": wideLimit
		});
	};
	if (t + winHeight >= o + bh - 800 && isMoreData) {
		page++;
		getData();
		isMoreData = false;
	}
}
var scrollTimer = null;
var winHeight = $win.height();
$win.scroll(function() {
	if (scrollTimer) {
		clearTimeout(scrollTimer);
	}
	scrollTimer = setTimeout(scrollFun, 100);
});
/** 弹幕相关代码start */
function addDanmu(i, data) {
	var index = 0;

	danmu[i] = Danmu({
		el: '.d' + i,
		bulletHeight: 30,
		bulletTmpl: '<div><i data-name="icon"></i><span data-name="content"></span></div>',
		bulletClass: "bullet",
		mode: 'auto',
		initChannel: {
			offset: 5,
			height: 30,
			size: 4
		},
		getMessage: function() {
			index < data.data.length - 1 ? index++ : index = 0;
			return data.data[index];
		},
		initBullet: function() {
			this.bullet.speed = -.05;

			var bullet = this.bullet,
				type = this.type;

			this.bullet.speed = -.15;
			/** hack code */
			var str = bullet.els.content.innerHTML,
				strArr = str.split('##'),
				type = strArr[0];

			if (type == 'me') {
				bullet.els.el.className = 'me';
				bullet.els.content.innerHTML = strArr[1];
				$(bullet.els.el).find('i').prepend("<img src='" + strArr[2] + "' alt=''>");
			} else if (type == 'common') {
				bullet.els.content.innerHTML = strArr[1];
				$(bullet.els.el).find('i').prepend("<img src='" + strArr[2] + "' alt=''>");
			}
		}
	});
}

function danmuPrepare() {
	if (!isBoundScrollStop) {
		isBoundScrollStop = true;
		$win.on('scrollStop', function() {
			var W = $win.width(),
				H = $win.height(),
				$hit = $(document.elementFromPoint(W / 2, H / 2)),
				i;

			if ($hit.is('#nextContent .lazy_pic')) {
				i = $hit.next('.danmu').data('index');
			} else if ($hit.is('#nextContent .danmu')) {
				i = $hit.data('index');
			} else {
				return;
			}
			danmuGoOn(i, danmuData[i], $hit);
		});
	}
}

function danmuGoOn(index, data, targetNode) {
	if (!danmu[index] || !data && !posting) {
		posting = true;
		var styleId = $(targetNode).parent().parent().attr('styleid');
		$.post('/aj/zulily/hotSaleDanmu', {
			'style_id': styleId
		}, function(res) {
			if (res.error_code === 0 && res.data.data.length > 0) {
				data = res.data;
				danmuData[index] = data;
				danmu[mark] && danmu[mark].shutdown();
				addDanmu(index, data);
				mark = index;
			}
			posting = false;
		}, 'json');
	} else if (danmu[index] && index !== mark) {
		danmu[mark].shutdown();
		mark = index;
		danmu[index].restore();
	}
};