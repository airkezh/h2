fml.define('m/app/doota/cart',['m/app/checkLogin','component/iStorage','m/app/doota/cart/calculator','m/app/doota/cart/goods' /*,'m/app/doota/shopping_carts'*/,'m/app/doota/cart/shops','m/component/serializeObject','m/component/callApi','m/component/shareTmp'],function(require , exports){
	var calculator = require('m/app/doota/cart/calculator');
	var goods = require('m/app/doota/cart/goods');
	var shops = require('m/app/doota/cart/shops');
	var checkLogin = require('m/app/checkLogin')
		,iStorage = require('component/iStorage')
		,shareTmp = require('m/component/shareTmp')
		,callApi = require('m/component/callApi');
//		,shopping_carts = require('wap/app/doota/shopping_carts')
	var emitter = $(document);//做事件处理和分发用

//	shopping_carts.clearCartsNumCache().readShopsCount()
	
	return function(){
		callApi.read({'url':'/cart/list_info'},{},function(data){
	    	if(data.info.length){
	          $('.nav_ban').append('<span class="icon-right" id="removeSelected">删除</span>');
	           fml.vars.invalidGoods = [];
	           data.invalidList=[];
	           for(var j=0;j<data.info.length;j++){
	           	    var valid = false;
					for (var i=0; i < data.info[j].goods.length; i++) {
						var _goods = data.info[j].goods[i];
						if (_goods.stock !== '0' && _goods.shelf !== '0') {
							valid = true;
						}else{
							fml.vars.invalidGoods.push(_goods.sid);
							data.invalidList.push(_goods);
						}
					};
					data.info[j].valid=valid;
				}
				$('.cart').html(shareTmp("cartList" , data));

				/* 删除所有失效宝贝 */
				$('#removeInvalid').on('tap', function(){
					if (fml.vars.invalidGoods.length === '') {
						alert('您的购物车中没有失效商品哦')
						return;
					}
					goods.del(fml.vars.invalidGoods,false,'已为您删除了失效的商品');
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
							callApi.read({'url':'/order/init'},$('#form').serializeObject(),function(data){
								if (data.code == 1) {
									reloadBecause('您选择的商品"'+data.info[0].goods_title+'"已下架，请点击确定刷新购物车');
								}else if(data.code == 2){
									reloadBecause('您选择的商品"'+data.info[0].goods_title+'"库存不足，请点击确定刷新购物车');
								}else if(data.code == 0){
									setTimeout(function(){$('#form').submit();},0);
								}															
							});
							// $.ajax({
							// 	type:'get',
							// 	url:'/order/check_init/',
							// 	data:$('#form').serializeObject(),
							// 	dataType:'json',
							// 	success: function(data){
							// 		if (data.code == 1) {
							// 			reloadBecause('您选择的商品"'+data.info[0].goods_title+'"已下架，请点击确定刷新购物车');
							// 		}else if(data.code == 2){
							// 			reloadBecause('您选择的商品"'+data.info[0].goods_title+'"库存不足，请点击确定刷新购物车');
							// 		}else if(data.code == 0){
							// 			setTimeout(function(){$('#form').submit();},0);
							// 		}
							// 	},
							// 	error: function(data){
							// 		reloadBecause('系统出错，请刷新页面重新提交试试');
							// 	}
							// });
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
	    	}
	    	else{
	    		$('.cart').html(shareTmp("emptyTip"));
	    	}
	    })    
		
	};
});
