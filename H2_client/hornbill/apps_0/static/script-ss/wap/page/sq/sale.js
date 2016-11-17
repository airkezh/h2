fml.define('wap/page/sq/sale', [ 'wap/zepto/fastclick',/*'wap/app/tracking',*/'wap/ui/alert' , 'wap/component/urlHandle', 'wap/app/doota/stock'/*, 'wap/zepto/touch'*/,'wap/zepto/fastclick', 'wap/zepto/fx_methods', 'wap/zepto/scroll', 'wap/ui/confirm','component/callApi','wap/app/tracking','wap/component/shareTmp'], function(require) {
	var stock = require('wap/app/doota/stock')
		,Confirm = require('wap/ui/confirm')
		,urlHandle = require('wap/component/urlHandle')
		,api = require('component/callApi')
		,Alert = require('wap/ui/alert')
		,tracking = require('wap/app/tracking')
		,top = $('#goods_attr').offset().top;

	require('wap/zepto/fastclick')

	var goodsD = fml.vars.goods
		,goods_prop = fml.vars.goods_prop
		,goods_stock = fml.vars.goods_stock
		,price_max = goodsD.price_max
		,price = goodsD.price
		,org_price = goodsD.original_price
		,org_price_max = goodsD.original_price_max
		,$price_dom = $('.price');

	if (!goods_stock) return;

	var orderSize
		, orderColor
		, _dataName = 'si'

	var numBox = $('.amount .numBox')
		, sizeList = $('#sizeList>li>span')
		, colorList = $('#colorList>li>span')
		, colorShow = $('.colorShow')

	var $notice = $('#propNotice')
		, t = null

	var $win = $(window)
	//========兼容ios底部按钮fixed start ==========
	// var stop =function(){
	// 	return false;
	// }

	// if($.os.ios){
	// 	numBox.find('.nums')
	// 	.on('focus', function(){
	// 		$(window).on('touchstart', stop)
	// 	})
	// 	.on('blur',function(){
	// 		$(window).off('touchstart',stop)
	// 	})
	// }
	//========兼容ios底部按钮fixed end ==========

	/*兼容input 返回缓存*/
	if($('input.nums').val() > 1 ){
		$('input.nums').val(1);
	}

	fml.on('update_num',function(data){
		numBox.children('.buy_num').html(data.num);
	})

	$('.hint .close').on('click',function(){
		$(this).closest('.hint').hide();
	});

	$('a[href="/sq/cart/"]').on('click', function(){
		tracking.cr('sq/statistics_action', {'action': 'goCart', 'value': 'twitter'})
		return true
	})

	$('a[href="/sq/"]').on('click', function(){
		tracking.cr('sq/statistics_action', {'action': 'goHome', 'value': 'twitter'})
		return true
	})

	var showNotice = function(obj, txt){
		clearTimeout(t)
		if(top < 500){top = $('#goods_attr').offset().top;}
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
	});
	
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
			// 'source': '8-0.0.8',
			'goods_pid': goodsArea.attr('pid'), 
			'goods_id': goodsArea.attr('goods_id'),
			'twitter_id': goodsArea.attr('twitter_id'),
			'amount': $('.amount .nums').val() - 0,
			// 'addr_id' : 3, //测试数据 integer	地址ID
			'pay_channel' : 'CHINAPAY__GWCARD'
		}

		var skuInfo = {}
		fml.vars.skuInfo.forEach(function(v, i){
			skuInfo[i] = v;
		});

		if (orderSize){
			ret.size = goods_prop.size.name + '__' + (goods_prop.size.value[orderSize.attr(_dataName) - 1]);
		}
		if (orderColor){
			ret.color = goods_prop.color.name + '__' + (goods_prop.color.value[orderColor.attr(_dataName) - 1]);
			var skuAll = skuInfo[0];
			skuAll.value.forEach(function(v, i){
				if (v == goods_prop.color.value[orderColor.attr(_dataName) - 1]) {
					if (!orderSize) {
						ret.sku_id = skuAll.stock[i][0].sku_id;
					}else{
						skuAll.stock[i].forEach(function(_v, _i){
							if (_v.stock_prop == '-') {
								ret.sku_id = _v.sku_id;
							}else if (_v.stock_prop == goods_prop.size.value[orderSize.attr(_dataName) - 1]) {
								ret.sku_id = _v.sku_id;
							};
						});
					}
				};
			});
		}
		return ret
	}

	/* 获取购物车数量 */
	api.read({'url':'/cart/statistic'},{}, function(data){
		if(data.code == 0 && data.info.China_count != 0){
			$('.cart_img').show().children('.cart_num').html(data.info.China_count);
		}
	})

	/* 收藏 */
	var $collect = $('#collect')
	var flag1 = false

	$collect.on('click', function (){
		var $m = $(this)
		var tid = goodsD.twitter_id
		var url = '/aj/sq/interfaces/collect_or_not'
		
		if(flag1)return

		flag1 = true
		$.get(url, {twitter_id: tid}, function(res){
			if(res.ret === 0){
				$notice.text(res.msg).show()
				setTimeout(function (){
					$notice.fadeOut();
				}, 2000)
				$m.toggleClass('collect collected')
			}else{
				alert(res.msg)
			}
			flag1 = false
		}, 'json')

	})

	/*加入购物车*/
	var $cart_btn = $('.btn_box span.cart_btn')
	$cart_btn.on('click',function(){

		var add_cart = function(){
			tracking.cr('sq/statistics_action', {'action': 'twitterClickBuy', 'value': 'addCart'})
			//发请求，加入购物车
			var orderedInfo = getOrderInfo();
			// delete orderedInfo.goods_pid;
			delete orderedInfo.pay_channel;
			api.write({'url':'/cart/add'},orderedInfo, function(data){
				// console.log(data);
				var _num = parseInt($('#cart_num').text()) || 0;
				if(data.code == 0 && data.info.contain_china > 0){
					tracking.cr('sq/statistics_action', {'action': 'pop', 'value': 'addCartSucc'})
					$('.cart_img').show().children('.cart_num').html(data.info.contain_china);
					showNotice($notice, '加入购物车成功')
					$('#cart_num').text(_num + 1 > 99 ? '99+' : _num + 1).show();
				}else if (data.code == 0) {
					tracking.cr('sq/statistics_action', {'action': 'pop', 'value': 'addCartSucc'})
					showNotice($notice, '加入购物车成功')
					$('#cart_num').text(_num + 1 > 99 ? '99+' : _num + 1).show();
				}else{
					console.log(data);
					myAlert( data.info.msg )
				}
			})
		}
		sku_hint(add_cart);
	})

	/*立即购买*/
	var $btn_box = $('.btn_box span.go_buy')
	/*.on('touchstart touchend', function(event){
			event.preventDefault();
		})*/
	.on('click', function() {	
		var ele = $(this)
		if (ele.is('.non_buy')) return

		var confirmCbk = function() {
			tracking.cr('sq/statistics_action', {'action': 'twitterClickBuy', 'value': 'buy'})
			var orderedInfo = getOrderInfo()
			orderedInfo['_cd'] = Meilishuo.config.nt
			orderedInfo['ori'] = 'share'
			var query = urlHandle.http_build_query(orderedInfo)
			window.location.href = '/sq/orderconfirm?' + query + '&max=' + fml.vars.goods_stock_max
		}
		sku_hint(confirmCbk);
	})

	/* 选择SKU属性 提示判断 */
	var sku_hint = function(callback){
		// console.log(orderSize);
		if (!orderColor && goods_prop.color.is_show) {
			if (!orderSize && goods_prop.size && goods_prop.size.is_show){
				tracking.cr('sq/statistics_action', {'action': 'pop', 'value': 'selectProp'})
				showNotice($notice, '请选择颜色/尺寸分类')
			}
			else{
				tracking.cr('sq/statistics_action', {'action': 'pop', 'value': 'selectProp'})	
				showNotice($notice, '请选择颜色分类')
			}
		}else{
			if (!orderSize && goods_prop.size && goods_prop.size.is_show){

				tracking.cr('sq/statistics_action', {'action': 'pop', 'value': 'selectProp'})
				showNotice($notice, '请选择尺寸分类')
			}
			else{
				// console.log(callback);
				if(callback && callback()==false){
					return false;
				}
			}
		}
	}
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

	function bindClick(list, fObj, cbk, type) {
		list.on('click', function() {
			var ele = $(this)
			if (ele.is('.out_of_stock')) return false
			if (ele.is('.active')) {
				ele.removeClass('active')
				fObj = null
				if(type == 'color'){
					colorShow.hide()
				}
			} else {
				if (fObj) fObj.removeClass('active')
				fObj = ele.addClass('active')
				var imgUrl = $(this).data('img')

				if(imgUrl && imgUrl != 'undefined'){
					colorShow
						.css({'background-image' : 'url("' + imgUrl + '")'})
						.show()
				}else if(type == 'color'){
					colorShow.css('background-image','').hide()
				}
			}
			cbk && cbk(fObj)
			return false
		})
		if (1 == list.length) {
			list.eq(0).trigger('click')
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

	function myAlert(ct){
		return new Alert({
			content : ct
		})
	}

	if (sizeList.length) {
		bindClick(sizeList, orderSize, function(foo) {
			orderSize = foo
			// console.log(orderSize)
			resetColorBox(orderSize && orderSize.attr(_dataName))
			// console.log(orderSize.attr('textContent'))
			
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
			// console.log(orderColor.attr('textContent'))
			checkActive()
			updateStockMax()
			var color_selected = orderColor && orderColor.attr(_dataName)
		}, 'color')
		resetColorBox()
		// console.log(orderColor);	
	};

	// 吸顶
	setTimeout(function(){
		var $nav = $('.nav')
		$nav.css({
			'position' : '-webkit-sticky',
			'top' : 0
		})
		var offsetT = $('.goods_detail').offset().top
		if(!($nav.css('position')).match('sticky')){
			$win.on('scroll',function (){ 
				if(offsetT < $win.scrollTop()){
					$nav.css({
						'position' : 'fixed',
						'top' : 0
					})
				}else{
					$nav.css('position','static')
				}
			})
		}
	},2000)

	//优惠券
	var $coupon     = $('.coupon')
	var $currCoupon = null
	var flag        = false

	function couponAjaxCbk(data){
		if(data.ret === 0){
			$currCoupon.removeClass('get')
			$currCoupon.addClass('got')
			$currCoupon.find('.status').html('已领')
			myAlert('<h3>领取成功</h3><br><p>可在个人中心“我的优惠券”页面查看</p>')
		}else{
			myAlert(data.msg)
		}
	}

	$coupon.on('click', function (){
		// 防止多次点击
		if(flag) return

		flag = true
	
		setTimeout(function (){
			flag = false
		}, 1500)

		$currCoupon = $(this)
		if( $currCoupon.hasClass('got') ) return

		var url = '/aj/sq/interfaces/shop_coupon'
		var data = {
			applyCode : $currCoupon.data('id')
		}
		$.get(url, data, couponAjaxCbk, 'json')
	})

	//单品详情
	var RenderTpl = require('wap/component/shareTmp')

	var $cti = $('.js-category-tab-item')
	var $commentCategory = $('.js-comment-category')
	var $showMore = $('.js-show-more')
	var justOneTime = true

	$cti.on('click', function() {
		var $me = $(this)

		if($me.hasClass( SELECTED )) return

		var SELECTED = 'selected'
		var tabId = $me.data('id')

		$cti.removeClass(SELECTED)
		$me.addClass(SELECTED)
		$showMore.removeClass('zero-style-1 zero-style-2').addClass('show-more').hide()
		$.get(
			'/aj/sq/interfaces/detail_comment', 
			{ twitter_id: fml.vars.goods.twitter_id, tabId: tabId, limit: $me.data('limit') }, 
			function (res){
				if(res.error_code === 200){
					if(res.data.comments && res.data.comments.length <= 0){
						$commentCategory.empty()
						var c = 'zero-style-1'

						if(tabId == 5){
							c = 'zero-style-2'
						}

						return $showMore.removeClass('show-more').addClass(c).show()
					}

					$commentCategory.html( RenderTpl('js-goods-comment-tpl', res.data) )
					
					if(!res.data.isLast){
						$showMore.data('offset', 1)
								 .data('id', tabId)
								 .data('limit', $me.data('limit'))
								 .show()

						if(justOneTime){
							justOneTime = false
							$showMore.on('click', function (){
								var $me = $(this)

								if($me.hasClass('zero'))return
								$.get(
									'/aj/sq/interfaces/detail_comment', 
									{ 
										twitter_id : fml.vars.goods.twitter_id, 
										tabId : $me.data('id'),
										offset : $me.data('offset'),
										limit : $me.data('limit')
									},
									function (res){
										if(res.error_code === 200){
											$commentCategory.append( RenderTpl('js-goods-comment-tpl', res.data) )

											if(res.data.isLast){
												$showMore.hide()
											}else{
												var offset = $showMore.data('offset')
												$showMore.data('offset', ++offset)
											}
										}
									},
									'json'
								)
							})
						}
					}
				}
			}
			, 'json'
		)
	}).eq(0).trigger('click')
})

fml.use(['wap/app/doota/timedown', 'wap/zepto'], function() {
	var timedown = this.timedown
	    , remain = parseInt($('.countdown').attr('remain'))

	if(!remain) return
	var down = timedown.down('.time_v>span', remain)
	down.onTimeOver(function(){
		//1.立即购买按钮置灰
		//2.倒计时部分，秒杀商品的倒计时，只读取秒杀结束的时间，当倒计时到0
        $('.countdown').children('.time_v').html('活动结束');
		$('.btn_box span.go_buy').addClass('non_buy');
	})
})

fml.use(['wap/app/doota/tab', 'wap/zepto','wap/zepto/fastclick'], function() {
	var opt = {
		'tagPnl': '.tab_tle',
		'tabTag': '.tabArea',
		'actType' : 'click' ,
		'activeTagClass': 'cur',
		'contents': '.contentArea'
	}
	var $win = $(window)
	/* 
	 * @desc hack 当评论或尺码内容不足一屏时不吸顶
	 * @tips 62为底部立即购买栏高度
	 */
	function cbk(content){
		var $nav = $('.nav')
		if(content[0].offsetHeight  < $win.height() - 62){
			$nav.css('position','static')
		}
	}
	if(Meilishuo.config.os.android){ opt.onShowed = cbk }
	this.tab.bind(opt);
});

fml.use('wap/component/lazyLoad', function() {
	this.load('.more_pic span', 'asrc');
	this.load('.pro_pic span', 'asrc');
});
fml.use(['wap/app/fallAdd'], function() {
	var fallAdd = this.fallAdd
	function rollCommentPnl() {}

/*点击图片放大开始*/
	$('.js-comment-category').on("click",'.js-click-to-largen', function(){
		var big_src = $(this).data("big-one");
		$(".mask").css("background-image","url("+big_src+")").show();
	});
	$(".more_pic").on("click",function(){
		var big_src = $(this).data("img");
		$(".mask").css("background-image","url("+big_src+")").show();
		$(document.body).css('overflow','hidden');
	});
	$('.mask').on('click',function(){
		$(this).hide();
		$(document.body).css('overflow','scroll');
	});

/*点击图片放大结束*/

	//点击详情的更多评论时 跳转评价详情标签 
	// $('.comm_more').on('click', function() {
	// 	$('#comments').trigger('click');
	// })
	// $('.koubei_more').on('click', function() {
	// 	$('#koubei').trigger('click')
	// })

	var scroll_to = function(to_endY){
		$('html,body').scrollTo({
		    endY: to_endY,
		    duration: 0,
		    callback: function() {}
		});
	};

	//商品购买评价-口碑评价，加载f
	$('.comm_more_list').on('click', function() {
		$('#comments').trigger('click');
		var com_top = $('#details').offset().top - 10;
		scroll_to(com_top);
	});

	$('.koubei_more_list').on('click', function() {
		$('#koubei').trigger('click')
		var com_top = $('#details').offset().top;
		scroll_to(com_top);
	});
	
});


