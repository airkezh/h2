/*common*/

var $ = require('wap/zepto')
	, emitter = $(document)
	, shops = {
		select: function(e,data){
			/* 选中商铺逻辑 */
			var self = $(this)
				, data = data || {}
				, children = self.parents('.cart_list').children('.order_goods_list').find('.select_goods:enabled')

			/*
				处理所有宝贝的选中情况
				选中宝贝时也会触发本事件，不需要再去处理
			*/
			if(data.reselectChildren !== false){
				if(this.checked){
					children.prop('checked', 'checked')
				} else {
					children.prop('checked', false)
				}
			}

			/*
				显示结算的商品数
			*/
			var charge_num = $('.order_list_list').find('.select_goods:checked').length
			if(charge_num != 0){
				charge_num = charge_num > 99 ? charge_num + '+' : charge_num
				$('.js_charge_num').html('(' + charge_num + ')')
			} else {
				$('.js_charge_num').html('')
			}

			/*
				检查是否要勾选"全选"
				全选时会触发本事件，不需要再检查
			*/
			if(data.checkParent !== false){
				if($('.select_shop:enabled:not(:checked)').length !== 0){
					$('.select_all').prop('checked', false)
				} else {
					$('.select_all').prop('checked', 'checked')
				}
			}

			/*
				计算总价
				全选，选中某个宝贝时也会触发本事件，会在对应的函数中进行重新计算，这里不再计算避免重复调用
			*/
			if(data.recalculate !== false){
				emitter.trigger('goods_change')
			}
		},
		addEvents: function(){
			$('.select_shop').on('change', shops.select)
			$('.select_all').on('click', function(){
				if(this.checked){
					$('.select_shop:enabled:not(:checked)').each(function(){
						$(this).trigger('click')
					})
				} else {
					$('.select_shop:enabled:checked').each(function(){
						$(this).trigger('click')
					})
				}
			})

			// 全选所有订单
			$('.select_all:not(:checked)').trigger('click')
		}
	}

return shops
