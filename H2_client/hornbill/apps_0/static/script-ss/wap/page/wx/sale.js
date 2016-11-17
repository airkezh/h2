fml.define('wap/page/wx/sale', [ /*'wap/app/tracking',*/'wap/component/urlHandle', 'wap/app/doota/stock', 'wap/zepto/touch', 'wap/zepto/fx_methods', 'wap/zepto/scroll', 'wap/ui/confirm'], function(require) {
	var stock = require('wap/app/doota/stock'),
		Confirm = require('wap/ui/confirm'),
		urlHandle = require('wap/component/urlHandle'),
		top = $('.type')[0].getBoundingClientRect().top - 10
		//	,tracking = require('wap/app/tracking')
	
	var goods_prop = fml.vars.goods_prop
		, goods_stock = fml.vars.goods_stock
		,price_max = fml.vars.goods.price_max
		,price = fml.vars.goods.price
		,org_price = fml.vars.goods.original_price
		,org_price_max = fml.vars.goods.original_price_max
		,$price_dom = $('.price');

	if (!goods_stock) return

	var orderSize
		, orderColor
		, _dataName = 'si'

	var numBox = $('.amount .numBox')
		, sizeList = $('#sizeList>li>span')
		, colorList = $('#colorList>li>span')
		, colorShow = $('.colorShow')

	var $notice = $('#propNotice')
		, t = null 

	var showNotice = function(obj, txt){
		clearTimeout(t)

		if(top){
			$.scrollTo({
			    endY: top,
			    duration: 0,
			    callback: function() {}
			});
		}

		if(obj.attr('shown') != '1')
			obj.attr('shown', '1').fadeIn()	

		obj.html(txt)

		t = setTimeout(function(){
			obj.attr('shown', '0').fadeOut()
		}, 3000)
	}



	$.scrollTo({
	    endY: $.os.android ? 46 : 45,
	    duration: 0,
	    callback: function() {}
	});


	var order_num = stock.bind({
		'input': $('input', numBox),
		'minus': $('.minus', numBox),
		'plus': $('.plus', numBox),
		'stockMax': $('.amount .stock span')
	})
	order_num.tipOnout = function(stat) {
		var msg_limit = $('.msg_limit'),
			msg_over = $('.msg_over'),
			msg_zero = $('.msg_zero')
		switch (stat) {
			case 1:
				msg_limit.show();
				msg_over.hide();
				msg_zero.hide()
				break;
			case 2:
				msg_limit.hide();
				msg_over.show();
				msg_zero.hide()
				break;
			case 3:
				msg_limit.hide();
				msg_over.hide();
				msg_zero.show()
				break;
			default:
				msg_limit.hide();
				msg_over.hide();
				msg_zero.hide()
		}
	}

	function getOrderInfo() {
		var goodsArea = $(this).parents('.goodsArea')

		if(!goodsArea.length)
			goodsArea = $('.goodsArea')

		var ret = {
			'source': '8-0.0.8',
			'goods_pid': goodsArea.attr('pid'), 
			'goods_id': goodsArea.attr('goods_id'),
			'twitter_id': goodsArea.attr('twitter_id'),
			'amount': $('.amount .nums').val() - 0
		}
		if (orderSize)
			ret.size = goods_prop.size.name + '__' + (goods_prop.size.value[orderSize.attr(_dataName) - 1])
		if (orderColor)
			ret.color = goods_prop.color.name + '__' + (goods_prop.color.value[orderColor.attr(_dataName) - 1])

		return ret
	}

	var $btn_box = $('.btn_box span').on('tap', function() {	
		var ele = $(this)
		if (ele.is('.non_buy')) return

		var confirmCbk = function() {
			var orderedInfo = getOrderInfo()
			orderedInfo['_cd'] = Meilishuo.config.nt
			orderedInfo['ori'] = 'share'
			var query = urlHandle.http_build_query(orderedInfo)
			window.location.href = '/wx/orderconfirm?' + query + '&max=' + fml.vars.goods_stock_max
		}

		if (!orderColor && goods_prop.color && goods_prop.color.is_show) {
			if (!orderSize && goods_prop.size && goods_prop.size.is_show)
				showNotice($notice, '请选择颜色/尺寸分类')
			else
				showNotice($notice, '请选择颜色分类')
		}else{
			if (!orderSize && goods_prop.size && goods_prop.size.is_show)
				showNotice($notice, '请选择尺寸分类')
			else{
				/* 原价购买提示 使用重构的confirm样式*/
				if(ele.is('.still_buy_btn')){
					var c = new Confirm({
						content : '亲爱的用户，等到秒杀开始时间，可以用秒杀价购买哦，你确定要以原价：'+ $('.normal').text() +'购买？'
						, onSure : function(){
							confirmCbk();
						}
						, onCancel : function(){
							return;
						}
					});
				}
				else{
					confirmCbk();
				}
			}
		}
	})


/*
	order_num.outStock = function(isOut) {
		if (isOut)
			$btn_box.addClass('non_buy')
		else
			$btn_box.removeClass('non_buy')
	}
	*/
	updateStockMax()

	function resetSizeBox(color) {
		for (var i = 1, j = goods_stock.length; i < j; i++) {
			var stock = goods_stock[i]
			stock = color ? stock.color[color] : stock.sum
			var boxItem = sizeList.eq(i - 1)
			!color && boxItem.attr(_dataName, i)
			if (stock <= 0) {
				boxItem.addClass('out_of_stock')
			} else {
				boxItem.removeClass('out_of_stock')
			}
		}
	}

	function resetColorBox(size) {
		var colorSum = goods_stock[size || 0].color
		for (var i in colorSum) {
			var stock = colorSum[i]
			var boxItem = colorList.eq(i - 1)
			!size && boxItem.attr(_dataName, i)
			if (stock <= 0) {
				boxItem.addClass('out_of_stock')
			} else {
				boxItem.removeClass('out_of_stock')
			}
		}
	}

	function bindClick(list, fObj, cbk) {
		list.on('tap', function() {
			var ele = $(this)
			if (ele.is('.out_of_stock')) return false
			if (ele.is('.active')) {
				ele.removeClass('active')
				colorShow.hide()
				fObj = null
			} else {
				if (fObj) fObj.removeClass('active')
				fObj = ele.addClass('active')
				var imgurl = $(this).attr('imgurl')
				// console.log(imgurl)
				if(imgurl)
					colorShow
						.css({'background-image' : 'url("' + imgurl + '")'})
						.show()
			}
			cbk && cbk(fObj)
			return false
		})
		if (1 == list.length) {
			list.eq(0).trigger('tap')
		}
	}

	function updateStockMax() {
		var size = orderSize && orderSize.attr(_dataName) || 0,
			color = orderColor && orderColor.attr(_dataName)
		var stocks = goods_stock[size]

		changePrice(color,stocks);

		stocks = color ? stocks.color[color] : stocks.sum
		order_num.upStockNum(stocks)
		fml.vars.goods_stock_max = stocks
	}

	function changePrice(color,stocks){
		var price_now = (color && stocks.price && stocks.price[color]) ? stocks.price[color] : (price > 0 && price_max > 0 && price != price_max) ? price + " ~ " + price_max : price;

		var org_price_now = (color && stocks.original_price && stocks.original_price[color]) ? stocks.original_price[color] : (org_price > 0 && org_price_max > 0 && org_price != org_price_max) ? org_price + " ~ " + org_price_max : org_price;
		
		console.log(org_price_now);
		$price_dom.children('.now_price').html("￥" + price_now);
		$price_dom.children('.normal').html("￥" + org_price_now);
	}

	function checkActive() {
		var foos = [orderSize, orderColor]
		for (var i = 0; i < foos.length; i++) {
			var foo = foos[i]
			if (foo && foo.is('.out_of_stock')) {
				foo.removeClass('active')
				foo = null
			}
		}
	}

	if (sizeList.length) {
		bindClick(sizeList, orderSize, function(foo) {
			orderSize = foo
			resetColorBox(orderSize && orderSize.attr(_dataName))
			checkActive()
			updateStockMax()
			var size_selected = orderSize && orderSize.attr(_dataName)
		})
		resetSizeBox()
	}
	if (colorList.length) {
		bindClick(colorList, orderColor, function(foo) {
			orderColor = foo
			resetSizeBox(orderColor && orderColor.attr(_dataName))
			checkActive()
			updateStockMax()

			var color_selected = orderColor && orderColor.attr(_dataName)
		})
		resetColorBox()

	}


})

fml.use(['wap/app/doota/timedown', 'wap/zepto'], function() {
	var timedown = this.timedown
	    , remain = parseInt($('.countdown').attr('remain'))

	if(!remain) return
	var down = timedown.down('.countdown>span', remain)
	down.onTimeOver(function(){
		//1.立即购买按钮置灰
		//2.倒计时部分，秒杀商品的倒计时，只读取秒杀结束的时间，当倒计时到0，倒计时自动小时
        $('.time').hide();
		$('.btn_box>span').addClass('non_buy');
	})
})

fml.use(['wap/app/doota/tab', 'wap/zepto'], function() {
	this.tab.bind({
		'tagPnl': '.tab_tle',
		'tabTag': '.tabArea',
		'activeTagClass': 'cur',
		'contents': '.contentArea'
	});
});

fml.use('wap/component/lazyLoad', function() {
	this.load('.more_pic span', 'asrc');
	this.load('.pro_pic span', 'asrc');
})


fml.use(['wap/app/fallAdd', 'wap/zepto/touch'], function() {
	var fallAdd = this.fallAdd

	function rollCommentPnl() {}

	//点击详情的更多评论时 跳转评价详情标签 
	$('.comm_more').on('tap', function() {
		$('#comments').trigger('tap')
	})

	$('.koubei_more').on('tap', function() {
		$('#koubei').trigger('tap')
	})

	$('.cosmetic').on('tap', function() {
		$(this).off('tap')

		fallAdd({
			'tid': fml.vars.goods.twitter_id,
			'cbk': rollCommentPnl,
			'url': '/aj/getComment/koubei',
			'processData': function(res) {
				return {
					'item': res.infos,
					'totalNum': res.pages.totalNum
				}
			},
			'box': '.cosmetic_content',
			'tmpId': 'twitter_cosmetic',
			'page': 0
		});
	})
	$('.recommend').on('tap', function() {
		$(this).off('tap')

		fallAdd({
			'tid': fml.vars.goods.twitter_id,
			'cbk': rollCommentPnl,
			'url': '/aj/getComment/shop?wxmall=1',// 取4/5星的评论
			'processData': function(res) {
				return {
					'item': res.cInfos,
					'totalNum': res.pages.totalNum
				}
			},
			'box': '.comments_content',
			'tmpId': 'twitter_comment',
			'page': 0
		});
	})
})

