/*common*/
var $         = require('wap/zepto')
	require('wap/zepto/fastclick')
	require('wap/zepto/touch')
	
var urlHandle 	  = require('wap/component/urlHandle')
	,Alert        = require('wap/ui/alert')
	,Confirm      = require('wap/ui/confirm')
	,shareTmp     = require('component/shareTmp')
	,api          = require('component/callApi')
	,tracking     = require('wap/app/tracking')

var num_hash       = {}
var price_hash     = {}
var select_hash    = {}
var shelf_hash     = {}
var stock_hash     = {}
var priceTrue_hash = {}
var plusCan        = 1;
var minCan         = 1;
var $cart          = $('#cart');
var $body		   = $( document.body );

// update api: wx/cart_list_info /cart/list_info  
api.read({'url':'/wx/cart_list_info'},{}, function(data){
	if(data.total_num == 0){
		var tmp = shareTmp('noThings', {})
		$cart.append(tmp)
	}else if(data.total_num != 0){
		var array = data.info
		array.forEach(function(shopinfo){
			var goods_array = shopinfo.goods
			goods_array.forEach(function(thinginfo){
				if(thinginfo.shelf == 1 && thinginfo.stock != 0){
					var sid = thinginfo.sid
					var price = thinginfo.goods_activity_price //商品现价
					var priceT = thinginfo.goods_price_origial //商品原价
					var shelf = thinginfo.amount //购买数量
					var stock = thinginfo.stock  //库存
					var she = thinginfo.shelf    
					num_hash[sid] = parseInt(shelf)
					price_hash[sid] = price
					priceTrue_hash[sid] = priceT
					select_hash[sid] = 1
					shelf_hash[sid] = she
					stock_hash[sid] = stock
				}
			})
		})
		var tmp = shareTmp('cartThing', {'info':data.info})
		$cart.append(tmp)
		$body.append('<div class="gap"></div>');
		$('.select').toggleClass('null right')
		$('.selectBtn').html('取消').removeClass('selectAll')
		total_price()
	}
})

$cart.on('click', '.select', function(){
	selectBind.bind(this)();
})
//加
$cart.on('click', '.plus', function(){
	if (!plusCan) {
		return;
	};
	plusCan = 0;
	var a = $(this)
	// var valueOld = parseInt(a.prev().data('value'))
	var valueOld = a.prev().html() | 0;
	var max = parseInt(a.prev().attr('data-stock'))
	var sid = a.prev().attr('sid')
	if(shelf_hash[sid] == 0){
		plusCan = 1;
		return
	}
	if(valueOld >= 100){
		tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'addMaxAmount'})
		var alert_alert = new Alert({
			content: '对不起,每人最多限购100件!'
			,onSure : function(){
				plusCan = 1;
				return
			}
		})
	}else{
		var parms = sid + '_' + (valueOld+1)
		api.write({'url' : '/cart/update'}, {'param' : parms}, function(data){
			if(data.code == 0){
				num_hash[sid] = valueOld+1
				// a.prev().data('value', num_hash[sid])
				a.prev().html(num_hash[sid])
				/**
				 * 店铺计数
				 * by yaoyao
				 */
				var goodInfo = a.parents('.singleThing'),
					shopInfo = goodInfo.parents('.shopThings'),
					shopM = goodInfo.find('.thingName span').html().replace('￥', ''),
					_num = +shopInfo.find('.shop-num').html().match(/\d+/g)[0] + 1,
					_total = +shopInfo.find('.shop-total span').html().replace('￥', '') + (+shopM);
				// shopInfo.find('.shop-num').html('共' + _num + '件商品');
				shopInfo.find('.shop-total span').html('￥' + _total.toFixed(2));


				total_price()
				plusCan = 1;
			}else if(data.code == 200004){
				tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'addMaxAmount'})
				var alert_alert = new Alert({
					content: '商品库存不足'
					,onSure : function(){
						plusCan = 1;
						return
					}
				})
			}
		})
	}
})

//减
$cart.on('click', '.minus', function(){
	if (!minCan) {
		return;
	};
	minCan = 0;
	var b = $(this)
	var valueOld = b.next().html() | 0;
	var sid = b.next().attr('sid')
	if(shelf_hash[sid] == 0){
		minCan = 1;
		return
	}
	if(valueOld > 1){
		var parms = sid + '_' + (valueOld-1)
		api.write({'url' : '/cart/update'}, {'param' : parms}, function(data){
			if(data.code == 0){
				/**
				 * 店铺计数
				 * by yaoyao
				 */
				var goodInfo = b.parents('.singleThing'),
					shopInfo = goodInfo.parents('.shopThings')
					shopM = goodInfo.find('.thingName span').html().replace('￥', ''),
					_num = +shopInfo.find('.shop-num').html().match(/\d+/g)[0] - 1,
					_total = +shopInfo.find('.shop-total span').html().replace('￥', '') - (+shopM);
				// shopInfo.find('.shop-num').html('共' + _num + '件商品');
				shopInfo.find('.shop-total span').html('￥' + _total.toFixed(2));

				num_hash[sid] = valueOld-1
				b.next().html(valueOld-1)
				total_price()
				minCan = 1;
			}
		})
	}
})

$cart.on('click', '.selectBtn', function(){
	if($('.cancleAll').length == 1){
		$(this).toggleClass('selectAll cancleAll').html('全选')
		$('.go_buy a').addClass('go_buy_none')
		for(var key in select_hash){
			select_hash[key] = -1
		}
		$('.right').toggleClass('null right')
		total_price()
	}else{
		$(this).toggleClass('selectAll cancleAll').html('取消')
		$('.go_buy a').removeClass('go_buy_none')
		for(var key in select_hash){
			select_hash[key] = 1
		}
		$('.null').toggleClass('null right')
		total_price()
	}
})

/**
 * 店铺点击事件
 * by yaoyao
 */

$cart.on('click', '.select-all', function(){
	var _this = $(this),
		_type = _this.hasClass('right') ? 'right' : 'null',
		_goods = _this.parents('.shopThings').find('.singleThing .' + _type);
	_this.toggleClass('null right');
	_goods && _goods.forEach(function(v, i){
		selectBind.bind(v)();
	});

})

/**
 * 删除事件
 * by yaoyao
 */
$cart.on('click', '.del,.del-all', function(){
	var _this = $(this);
	new Confirm({
			content : '是否确认删除已选商品?'
			, onSure : function(){
				api.write({'url': '/wx/cart_remove'}, {'sid':_this.attr('data-sid')}, function(data){
					if(data.code == 0){
						location.href = '/wx/cart/'
					}
				});
			}
			, onCancel : function(){
				return
		}	
	})
})

$cart.on('click', '.delButton', function(){
	if($('.right').length == 0){
		var b = new Alert({
			content : '请选择要删除的物品'
			, onSure : function(){
				return
			}
		})
	}else{
		var a = new Confirm({
				content : '是否确认删除已选商品?'
				, onSure : function(){
					var delArr = []
					for(var key in select_hash){
						if(select_hash[key] == 1){
							delArr.push(key)
						}
					}
					var delStr = delArr.join(',')

					tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'deleteCartGoodsConfirm'})
					
					api.write({'url': '/wx/cart_remove'}, {'sid':delStr}, function(data){
						if(data.code == 0){
							location.href = '/wx/cart/'
						}
					})
				}
				, onCancel : function(){
					return
			}	
		})
	}
})

$cart.on('click', '.go_buy', function(){
	var go_buy_confirm = true
	if(total_price() <= 0){
		return
	}else{
		var sidArr = []
		var shop_id
		for(var key in select_hash){
			if(select_hash[key] == 1){
				var str = '.select[sid="'+key+'"]'
				shop_id = $(str).parent().parent().data('shopid')
				sidArr.push(key)
			}
		}
		for(var key in select_hash){
			if(select_hash[key] == 1){
				if(stock_hash[key] == 0 || shelf_hash[key] == 0){
					tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'deleteCartGoodsConfirm'})
					go_buy_confirm = false
					new Alert({
						content : '结算不成功,有下架、售完的商品'
						// ,onSure : function(){
							
						// }
					})
					break
				}
			}
		}
		if(go_buy_confirm){
			var sidStr = sidArr.join('_')
			location.href = '/wx/orderconfirm?sid=' + sidStr + '&shop_id=' + shop_id + '&wechat_card_js=1'; 
		}
	}
})

var splitStr = function(str, num){
	return (str.length > num) ? str.split('.')[0] : str;
};

function total_price(){
	var total = 0, totalAll = 0;
	for(var key in select_hash){
		if(select_hash[key] == 1){
			total += num_hash[key] * parseFloat(price_hash[key])
			totalAll += num_hash[key] * parseFloat(priceTrue_hash[key])
		}
	}
	$('.total').html(splitStr(total.toFixed(2), 8))
	$('.total-all').html(splitStr((totalAll - total).toFixed(2), 8))
	return total
}

function selectBind(){
	$(this).toggleClass('null right')
	var sid = $(this).attr('sid')
	select_hash[sid] *= -1
	var seleAll = 1
		,cancAll = 1
	for(var key in select_hash){
		if(select_hash[key] == 1){
			cancAll = -1
		}else if(select_hash[key] == -1){
			seleAll = -1
		}
	}
	/**
	 * 店铺选取逻辑
	 * by yaoyao
	 */
	var goodList = $(this).parents('.shopThings').find('.select'),
		_type = 1;
	goodList.forEach(function(v, i){
		if($(v).hasClass('null'))
		_type = 0;
	});
	if (!_type)
	$(this).parents('.shopThings').find('.select-all').removeClass('right').addClass('null')
	else
	$(this).parents('.shopThings').find('.select-all').removeClass('null').addClass('right')


	if(seleAll == 1){
		$('.go_buy a').removeClass('go_buy_none')
		$('.selectBtn').addClass('cancleAll').removeClass('selectAll').html('取消')
	}
	if(cancAll == 1){
		$('.go_buy a').addClass('go_buy_none')
		$('.selectBtn').addClass('selectAll').removeClass('cancleAll').html('全选')
	}
	if(cancAll == -1 && seleAll == -1){
		$('.go_buy a').removeClass('go_buy_none')
		$('.selectBtn').addClass('selectAll').removeClass('cancleAll').html('全选')
	}
	total_price()
}