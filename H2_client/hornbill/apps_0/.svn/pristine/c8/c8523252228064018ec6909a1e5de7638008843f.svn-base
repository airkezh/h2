/*common*/
var $ = require('wap/zepto')
	, cookie = require('component/iStorage')
	, shareTmp = require('component/shareTmp')
	, urlHandle = require('wap/component/urlHandle')

var has_coupon_mls = !!$('.coupon_mls').length

return function(){
	$('.addr_wrap').on('tap', function(){
		setTimeout(function(){
			location.reload();
		},1000)
	})

	$('#charge').on('tap', function(){
		var fromCart = location.search.indexOf('goods_id') === -1
			, addr_id = $('.addr_wrap .addr_text').attr('addr_id')
			, price = []
			, comments = []
			, map_id = ''

		if(!addr_id){
			alert('请告诉我们您的收货地址')
			return ;
		}

		$('.comment').each(function(i,comment){
			var val = $(comment).val()

			if(val.replace(/\s\|/g,'') === ''){
				return ;
			}

			var id= comment.id.split('_')[1]
				, val = val.replace(/\|/g, '')

			fromCart ? comments.push(id + '_' + val) : comments.push(val)
		})

		$('.order_goods_list li').each(function(i, goods){
			var p = $(goods).find('.price').attr('data-price')
			if(!p) return ;

			var id = this.id.split('_')[1]
			fromCart ? price.push([id, p].join('_')) : price.push(p)
		})

		var data = {
			source: '5-0.0.1'
			, addr_id: addr_id
			, comment: comments.join('|')
			, price: price.join('|')
			, express_company: 1
			, map_id: map_id
			, sku_id: $('#sku_id').val()
		}

		/* 优惠券信息参数 */
		$.extend(data, getCouponParam())

		var params = location.search.substr(1).split('&')
		for (var i = 0; i < params.length; i++) {
			var pair = params[i]
				, index = pair.indexOf('=')
				, key = pair.substr(0,index)
				, val = pair.substr(index+1)

			data[key] = decodeURIComponent(val)
		}

		data.r = $('[name="order_init_r"]').val()

		var form = $('#confirm_form').empty()

		for(var i in data){
			/* shop_coupon以数组处理 || shop_campaigns以数组处理 */
			if(i=='shop_coupon' || i == 'shop_campaigns'){
				data[i].forEach(function(o, oi){
					for(var k in o){
						form.append('<input type="hidden" name="'+i+'['+oi+']['+k+']" value="'+o[k]+'"/>')
					}
				})
			} else {
				form.append('<input type="hidden" name="'+i+'" value="'+data[i]+'"/>')
			}
		}

		form.submit()
		window['__callOnFail'] = function(){
			window.location.reload()
		}
	})

	var coupon_change_fn = function(event) {
		var paramObj = urlHandle.getParams(location.href)
		$.extend(paramObj, getCouponParam())

		$.ajax({
			url: '/aj/doota/init'
			, type: 'get'
			, dataType: 'json'
			, data: paramObj
			, success: function(data) {
				if(data.code != 0){
					return alert('获取价格失败')
				}
				/* 优惠券变更 */
				if(!data.info.total_favorable_price){
					$('.order_confirm .price').addClass('hide_favorable')
				} else {
					$('.order_confirm .price').removeClass('hide_favorable')
					$('#total_favorable').html(data.info.total_favorable_price)
				}

				/* 平台券变更, 店铺券选择会触发平台券再次显示或者隐藏 */
				var coupon_list_data = data.info.plat_coupon_info
					, coupon_list_data_l = coupon_list_data.length

				if(!has_coupon_mls && coupon_list_data_l){
					has_coupon_mls = true
					var tpl = shareTmp('coupon_mls', {'coupon_list': data.info.plat_coupon_info})
					$('.addr_wrap').after(tpl)
					$('#coupon').on('change', coupon_change_fn)
				} else if(coupon_list_data_l == 0) {
					$('.coupon_mls').remove()
					has_coupon_mls = false
				} else {
					data.info.plat_coupon_info.forEach(function(coupon){
						if(coupon.is_check){
							$('#plat_coupon').html(coupon.price_show)
						}
					})
				}

				/* 总价变更 */
				$('#total_price').html('¥' + data.info.total_price)

				data.info.goods.forEach(function(shop){
					var shop_parents = $('#shop_list').find('.shop'+shop.shop_id)
					shop_parents.find('.shop_total_price span').html('¥' + shop.total_price)

					/* 店铺券变更 */
					if(shop.coupon_info.length){
						shop.coupon_info.forEach(function(shop_coupon){
							if(shop_coupon.is_check){
								shop_parents.find('.js_shop_coupon .discount_price').html(shop_coupon.price_show)
							}
						})
					}

					/* 店铺活动变更 */
					if(shop.campaign_discount_info.length){
						shop.campaign_discount_info.forEach(function(discount){
							if(discount.is_check){
								shop_parents.find('.js_shop_campaign .discount_price').html('-¥' + Number(discount.credit).toFixed(2))
							}
						})
					}

					/* 运费变更 */
					shop_parents.find('.js_freight span').html(shop.freight_show)
					shop_parents.find('.js_freight .discount_price').html('¥' + shop.freight)
				})
			}
			, complete: function(){}
		})
	}
	$('#coupon, [name="shop_coupon"], [name="shop_campaign"]').on('change', coupon_change_fn)
}

function getCouponParam(){
	var paramObj = {}
		, shop_coupons = []
		, shop_campaigns = []
		, plat_coupon = $('#coupon').val()

	$.each($('[name=shop_coupon]'), function(index, el){
		el = $(el)
		var obj = {
			shop_id:el.parents('li').find('[name=shop_id]').val()
			, coupon_id:el.val()
		}

		shop_coupons.push(obj)
	})

	$.each($('[name=shop_campaign]'), function(index, el){
		el = $(el)
		var obj = {
			shop_id:el.parents('li').find('[name=shop_id]').val()
			, item_id:el.val()
		}

		shop_campaigns.push(obj)
	})

	if(shop_coupons.length){
		paramObj.shop_coupon = shop_coupons
	}
	if(shop_campaigns.length){
		paramObj.shop_campaign = shop_campaigns
	}

	paramObj.plat_coupon = plat_coupon
	return paramObj
}
