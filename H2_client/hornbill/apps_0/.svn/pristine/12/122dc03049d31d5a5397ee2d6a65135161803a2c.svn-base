fml.define('wap/app/doota/cart',['wap/app/checkLogin','component/iStorage','wap/app/doota/cart/calculator','wap/app/doota/cart/goods' /*,'wap/app/doota/shopping_carts'*/,'wap/app/doota/cart/shops','wap/component/serializeObject'],function(require , exports){
	var calculator = require('wap/app/doota/cart/calculator');
	var goods = require('wap/app/doota/cart/goods');
	var shops = require('wap/app/doota/cart/shops');
	var checkLogin = require('wap/app/checkLogin')
		,iStorage = require('component/iStorage')
//		,shopping_carts = require('wap/app/doota/shopping_carts')
	var emitter = $(document);//做事件处理和分发用

//	shopping_carts.clearCartsNumCache().readShopsCount()
	
	return function(){
		/* 删除所有失效宝贝 */
		$('#removeInvalid').on('tap', function(){
			var ids = $('#invalidGoods').text();
			if (ids === '') {
				alert('您的购物车中没有失效商品哦')
				return;
			}
			goods.del(ids.split(','),false,'已为您删除了失效的商品');
		});
		/* 删除选中宝贝 */
		$('#removeSelected').on('tap', function(){
			var ids = $('.select_goods:checked').map(function(i,item){
				return item.id.split('_')[1];
			}).toArray();
			if (ids.length === 0) {
				alert('您没有选择任何商品。')
				return ;
			};
			goods.del(ids);
		});
		/* 去结算 */
		$('.go_charge').on('tap', function(){
			var selected = $('.select_goods:checked:enabled').map(function(i,item){
				return item.value;
			}).toArray().join('_');
			if($('.select_goods:checked:enabled').length >= 1){
					$("#shop_id").val($('.select_shop').attr('shopId'));
				}
			if (selected === '') {
				alert('您没有选择任何宝贝，请选择您想要购买的宝贝。')
				return ;
			};
			/*#8234 check login then go to order*/
			if (!checkLogin()){
				//Meilishuo.config._or = $('#form').attr('action') 
				Meilishuo.config._redirect = true
				iStorage.setCookie('MLS_SID' , selected , {duration:600})
				return
			}
		
			/**/
			$('#sid').val(selected);
			function reloadBecause(msg){
				alert(msg)
				location.href = location.href;
			}
			emitter.trigger('goods_num_change',{
				force: true,
				cb: function(){
					$.ajax({
						type:'get',
						url:'/order/check_init/',
						data:$('#form').serializeObject(),
						dataType:'json',
						success: function(data){
							if (data.code == 1) {
								reloadBecause('您选择的商品"'+data.info[0].goods_title+'"已下架，请点击确定刷新购物车');
							}else if(data.code == 2){
								reloadBecause('您选择的商品"'+data.info[0].goods_title+'"库存不足，请点击确定刷新购物车');
							}else if(data.code == 0){
								setTimeout(function(){$('#form').submit();},0);
							}
						},
						error: function(data){
							reloadBecause('系统出错，请刷新页面重新提交试试');
						}
					});
				}
			});
		});
		emitter.on('goods_change',calculator.total);
		emitter.on('goods_num_change',function(e,data){
			goods.updateNum.call(null,data);
		});

		goods.addEvents();
		shops.addEvents();
		calculator.total();
	};
});
