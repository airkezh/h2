/*common*/
var $ = require('wap/zepto'),
	shareTmp = require('wap/component/shareTmp'),
	pin = require('wap/component/wapfall'),
	timedown = require('wap/app/doota/timedown'),
	scroll = require('wap/component/windowScroll'),
	touchSlide = require('wap/app/touchSlide'),
	menu = require('wap/page/tuan/tabSlide'),
	lazy = require('wap/component/lazzyLoad'),
	countdow = require('wap/app/countdown2'),
	tracking = require('wap/app/tracking'),
	Cwidth = document.body.clientWidth > 640 ? 640 : document.body.clientWidth //内容窗口宽度
	,
	$pullUp = $('.pullUp'),
	$gotop = $('.gotop');
/*拼接r参数（用于模版里）*/
function joinurl(protocol, param, isosapp, r, wapHref) {
	if (!protocol || !param) return false
	if (!isosapp) return wapHref || '###noapp'
	if (r) param.r = r
	var link = 'meilishuo'
	link += '://' + protocol + '.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(param))
	return link
};
var welfare = {
	init: function() {
		var totalNum = "1";
		/*初始化页面*/
		if (totalNum != "0") {
			this.lazyer = lazy.init({
				'xpath': ".bs_load_img"
			});
			this.lazyer.scroll();
			this.posterWall();
			this.topBtnHandle(30);
		}
		this.eventInit();
	},
	posterWall: function() {
		var that = this;
		pin.init({
			containerId: '.reportList'
		});
		var posterWall = require('wap/app/posterWalls2');
		var urlData = {
			'frame': 0
		};
		var pullUpAction = function() {
			posterWall.ajaxPoster('/aj/m_welfare/wlf_singleReportList?activity_id='+fml.vars.activity_id);
		};
		Meilishuo.config.poster0 = '';
		posterWall.testPoster0(urlData, pullUpAction);
		posterWall.scrollPoster(true);
		fml.vars.toLogPoster = true;
		fml.eventProxy('logPoster', function(res) {
			$(".reprotImg").each(function(item,index){
				var imgW=$(this).width();
				$(this).css("height",imgW);
			});
			/*报告详情页跳转链接*/
			$('.reprotLink').each(function(i, item) {
				var _this = $(this);
				var twitter_id = _this.attr("data_id");
				var detailUrl = joinurl('openURL', {
					'url': 'http://mapp.meilishuo.com/m_welfare/reprotDetails/' + twitter_id
				}, Meilishuo.config.os.mlsApp, Meilishuo.config.r, '/m_welfare/reprotDetails/' + twitter_id);
				_this.attr("href", detailUrl);
			});
			/*报告详情页跳转链接 end*/
			that.lazyer.load();
		});
	},
	topBtnHandle: function(y) { //页面下拉到一定位置，回顶部按钮显示
		scroll.yIn(y, function() {
				$gotop.show();
			},
			function() {
				$gotop.hide();
			})
	},
	imgLoaded: function(el, callback) {
		if (el) {
			if (el.complete) {
				callback();
			} else {
				el.onload = function() {
					callback();
				}
			}
		} else {
			callback();
		}
	},
	eventInit: function() {
		var _this = this;
		$gotop.on("click", function(e) {
			document.body.scrollTop == 0 ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0;
		});
	}
};
welfare.init();