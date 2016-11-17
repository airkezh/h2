/*common*/

require('wap/component/serializeObject')
var $ = require('wap/zepto')
	, iStorage = require('component/iStorage')
	, checkLogin = require('wap/app/checkLogin')
	, shops = require('wap/app/doota/cart/shops_new')
	, goods = require('wap/app/doota/cart/goods_new')
	, calculator = require('wap/app/doota/cart/calculator_new')

/* 做事件处理和分发用 */
var emitter = $(document)

return function(){
	/* 删除所有失效宝贝 */
	$('#removeInvalid').on('click', function(){
		var ids = []

		$('.cart_delete .goods').each(function(i, item){
			ids.push(item.id.split('_')[1])
		})
		if(ids.length === 0){
			return alert('您的购物车中没有失效商品哦')
		}

		goods.del(ids, false, '已为您删除了失效的商品')
	})

	/* 删除选中宝贝 */
	$('#removeSelected').on('click', function(){
		var ids = $('.select_goods:checked').map(function(i, item){
			return item.id.split('_')[1]
		}).toArray()

		if(ids.length === 0){
			return alert('您没有选择任何商品。')
		}

		goods.del(ids)
	})

	/* 删除单个宝贝 */
	$('.js_single_delete_btn').on('click', function(){
		var id = $(this).parents('.goods')[0].id.split('_')[1]

		$(this).parents('.goods').find('.select_goods:not(:checked)').trigger('click')

		if(!id){
			return alert('删除失败')
		}

		goods.del([id], '确定要删除这件商品吗？', '删除商品成功')
	})

	/* 去结算 */
	$('.go_charge').on('click', function(){
		var selected = $('.select_goods:checked:enabled').map(function(i, item){
			return item.value
		}).toArray().join('_')

		if($('.select_goods:checked:enabled').length >= 1){
			$("#shop_id").val($('.select_shop').attr('shopId'))
		}
		if(selected === ''){
			return alert('您没有选择任何宝贝，请选择您想要购买的宝贝。')
		}

		/* #8234 check login then go to order */
		if(!checkLogin()){
			Meilishuo.config._redirect = true
			iStorage.setCookie('MLS_SID', selected, {duration: 600})
			return
		}

		$('#sid').val(selected)

		/* 错误刷新 */
		function reloadBecause(msg){
			alert(msg)
			location.href = location.href
		}

		emitter.trigger('goods_num_change', {
			force: true,
			cb: function(){
				$.ajax({
					type: 'get',
					url: '/order/check_init/',
					data: $('#form').serializeObject(),
					dataType: 'json',
					success: function(data){
						if(data.code == 1){
							reloadBecause('您选择的商品"' + data.info[0].goods_title + '"已下架，请点击确定刷新购物车')
						} else if(data.code == 2) {
							reloadBecause('您选择的商品"' + data.info[0].goods_title + '"库存不足，请点击确定刷新购物车')
						} else if(data.code == 0) {
							setTimeout(function(){
								$('#form').submit()
							}, 0)
						}
					},
					error: function(data){
						reloadBecause('系统出错，请刷新页面重新提交试试')
					}
				})
			}
		})
	})

	emitter.on('goods_change', calculator.total)
	emitter.on('goods_num_change', function(e, data){
		goods.updateNum.call(null, data)
	})

	goods.addEvents()
	shops.addEvents()
	calculator.total()
}
