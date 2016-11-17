fml.define('wap/app/posterWalls5', ['wap/zepto/touch', 'wap/component/windowScroll', 'wap/component/waterfall', 'wap/component/shareTmp'], function(require, exports) {
	var shareTmp = require('wap/component/shareTmp');
	var scroll = require('wap/component/windowScroll');
	var pin = require('wap/component/waterfall');

	var pullUp = $('.pullUp')
		, goods_wall = $('.goods_wall')
		, pageBox = $('#pageBox')
		, win = $(window)
		, win_h = win.height()
		, win_w = win.width()
		, isPosterLoad = false
		, pageNum = 2
		, frame = 0
		, pageIndex = 1
		, isFirstPage = true
		, pullUp_top, urlData, pullUpAction = 2  //因为页面的第一帧frame=0是从controller里面拉的数据


	var ajaxPoster = function(url) {
		isPosterLoad = false
		pullUp.attr('status', 'loading');

		$.get(url, urlData, function(res) {
			//分页
			totalNum = Math.ceil(parseInt(res.totalNum) / (res.tInfo.length * pageNum));

			loadPoster(urlData, res)
			fml.fireProxy('logPoster', res)
		}, 'json')
	}

	var loadPoster = function(urlData, data) {
		pullUp.attr('status', 'tap');
		pin.append(shareTmp('posterWall', data))

		urlData.frame ++

		// if (urlData.frame < pageNum * pageIndex) {	
			isPosterLoad = true;
			fml.vars.toLogPoster && window.setTimeout(function() {
				fml.fireProxy('logPoster', data)
			}, 2000)

		// } else {
		// 	addPage()

		// 	pullUp.hide()
		// }

	}

	var scrollPoster = function(isscroll) {

		function scrollPoster(pos, isDown) {
			if (isDown) {
				pullUp_top = pullUp[0].getBoundingClientRect().top

				if (pullUp_top - 100 <= win_h && isPosterLoad)
					pullUpAction();
			}
		}

		scroll.bind(scrollPoster, 'scrollPoster')
	}

	var testPoster0 = function(data, action) {
		urlData = data
		pullUpAction = action

		var poster0 = Meilishuo.config.poster0;
		if (poster0 && poster0.tInfo.length > 0) {
			urlData.frame++

			isPosterLoad = true;

			minHeight = pin.getAttr('minHeight');

		} else {
			pullUpAction(urlData);
		}
	}


	//分页函数
	function addPage() {
		pageBox.show();
		if (isFirstPage) {
			isFirstPage = false;

			var pageTpl = shareTmp('pageTpl', {
				'totlePage': totalNum
			});

			pageBox.append(pageTpl);
		}
	};


	// 分页按钮点击
	function clickPage(obj, isPrev) {
		pullUp.show()

		$(window).scrollTop(0);

		if (obj.hasClass('disabled')) {
			return;
		} else {
			pageBox.hide()

			if (isPrev == 0) {
				pageIndex > 1 && pageIndex--;
			} else if (isPrev == 1) {
				pageIndex < totalNum && pageIndex++;
			} else if (isPrev == 2) {
				pageIndex = $('#selSelect').val();
			}

			//获取数据
			$('.goods_wall').empty()
			pin.dataInit()

			urlData.frame = (pageIndex - 1) * pageNum

			ajaxPoster('/aj/special_goods/list')

			$('#selSelect')[0].selectedIndex = pageIndex - 1;
			$('#curPage').html(pageIndex);


			var pagePre = $('#pagePre'),
				pageNext = $('#pageNext')

			if (pageIndex == 1) {
				pagePre.addClass('disabled')
				pageNext.removeClass('disabled')
			}
			if (pageIndex > 1) {
				pagePre.removeClass('disabled')
			}
			if (pageIndex < totalNum) {
				pageNext.removeClass('disabled')
			}
			if (pageIndex == totalNum) {
				pageNext.addClass('disabled')
			}
		}
	}

	pageBox.on('click', '#pagePre', function() {
		clickPage($('#pagePre'), 0)
	})

	pageBox.on('click', '#pageNext', function() {
		clickPage($('#pageNext'), 1)
	})

	pageBox.on('change', '#selSelect', function() {
		clickPage($('#selSelect'), 2)
	})

	exports.testPoster0 = testPoster0;
	exports.ajaxPoster = ajaxPoster;
	exports.scrollPoster = scrollPoster;
});