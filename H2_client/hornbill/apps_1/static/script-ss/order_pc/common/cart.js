fml.define('order_pc/common/cart', ['jquery','app/tracking','app/checkLogin', 'component/iStorage',
    'order_pc/common/calculator', 'order_pc/common/goods',
    'order_pc/common/shopping_carts', 'order_pc/common/shops',
    'ui/alert', 'component/serializeObject'], function(require, exports) {
	
	var $ = require('jquery');
	var calculator = require('order_pc/common/calculator');
	var goods = require('order_pc/common/goods');
	var shops = require('order_pc/common/shops');
	var alert = require('ui/alert');
	var checkLogin = require('app/checkLogin'),
		iStorage = require('component/iStorage'),
		shopping_carts = require('order_pc/common/shopping_carts'),
		tracking = require('app/tracking');
	var emitter = $(document); //做事件处理和分发用
	var goChargeStatus = false;

	shopping_carts.clearCartsNumCache().readShopsCount()

	function float_no_fixed() {
		$('#float_pannel').css({
			position: 'absolute'
		});

		function resetPosition() {
			$('#float_pannel').css({
				top: $(document).scrollTop() + $(window).height() - $('#float_pannel').outerHeight() + 'px'
			});
		}
		$(window).scroll(resetPosition).resize(resetPosition).trigger('scroll').trigger('resize');
	}

	function resetFloatPannel() {
		var floatPannel = $('#float_pannel');
		var last = $('.cart tbody:last');
		if (!floatPannel.length || !last.length) return
		if (floatPannel.offset().top >= last.offset().top + last.outerHeight()) {
			$('.cart table #float_ctrl').length === 0 && $('.cart table').append($('#float_ctrl'));
		} else {
			$('#float_pannel #float_ctrl').length === 0 && $('#float_pannel table').append($('#float_ctrl'));
		}
	}

	function resetFloatPosition() {
		$('#float_pannel').css({
			left: ($(window).width() - $('#float_pannel').outerWidth()) / 2 + 'px'
		});
	}

	return function(config) {
		 //var loginFlag = '';
		// console.log(loginFlag + ' config:' + config.tab);
		// if(config.tab && config.tab == 'haitao'){
		// 	console.log('haha');
		// 	fml.on('login_success',function(){
		// 		if( loginFlag == 'init_haitao'){
		// 			console.log(111);
		// 			$.ajax({
		// 				type: 'get',
		// 				url: '/order/check_init/',
		// 				data: $('#form').serializeObject(),
		// 				dataType: 'json',
		// 				success: function(data) {
		// 					if (data.code == 1) {
		// 						reloadBecause('您选择的商品"' + data.info[0].goods_title + '"已下架，请点击确定刷新购物车');
		// 					} else if (data.code == 2) {
		// 						reloadBecause('您选择的商品"' + data.info[0].goods_title + '"库存不足，请点击确定刷新购物车');
		// 					} else if (data.code == 0) {
		// 						setTimeout(function() {
		// 							$('#form').submit();
		// 						}, 0);
		// 					}
		// 				},
		// 				error: function(data) {
		// 					reloadBecause('系统出错，请刷新页面重新提交试试');
		// 				}
		// 			});//ajax end
		// 		}
		// 	})
		// }


	    //验证是否登录
	    $('.login_in').on('click', function () {
	    	loginFlag = "reload";
	        if (!checkLogin()) return;
	    })

		// 跟随页面
		if ($('#float_ctrl').length) {
			$(window).resize(resetFloatPosition);
			$(window).scroll(resetFloatPannel);
			$.browser.msie && Number($.browser.version) < 7 && float_no_fixed();
			$(window).trigger('scroll').trigger('resize');
		}
		/* 全选 */
		$('.select_all').change(function() {
			$('.select_all').attr('checked', this.checked);
			$('.select_shop:enabled')
				.attr('checked', this.checked)
				.trigger('change', {
					recalculate: false,
					checkParent: false
				});

			emitter.trigger('goods_change');
		});
		/* 删除所有失效宝贝 */
		$('#removeInvalid').click(function() {
			var ids = CONSTANT.invalidGoods;
			if (ids === '') {
				new alert({
					width: 380,
					content: '您的购物车中没有失效商品哦',
					discover: true
				});
				return;
			}
			goods.del(ids.split(','), false, '已为您删除了失效的商品');
		});
		/* 删除选中宝贝 */
		$('#removeSelected').click(function() {
			var ids = $('.select_goods:checked').map(function(i, item) {
				return item.id.split('_')[1];
			}).toArray();
			if (ids.length === 0) {
				new alert({
					width: 380,
					content: '您没有选择任何商品。',
					discover: true
				});
				return;
			};
			goods.del(ids);
		});
		/* 去结算 */
		$('.go_charge').click(function() {
			if(goChargeStatus){
				return;
			}else{
				goChargeStatus = true;
			}

			var selected = $('.select_goods:checked:enabled').map(function(i, item) {
				return item.value;
			}).toArray().join('_');
			if (selected === '') {
				new alert({
					width: 380,
					content: '您没有选择任何宝贝，请选择您想要购买的宝贝。',
					discover: true
				});

				//fix 弹窗后，下次点结算没反应的bug
				goChargeStatus = false;
				return true;
			};
			/*#8234 check login then go to order*/
			tracking.cr('cart/charge', {
				"user_id": Meilishuo.config.user_id
			})
			if (!checkLogin({
				'param': {
					'btn': 'cart_list_check'
				}
			})) {
				//Meilishuo.config._or = $('#form').attr('action') 
				Meilishuo.config._redirect = true
				iStorage.setCookie('MLS_SID', selected, {
					duration: 600
				})
				return
			}

			/**/
			$('#sid').val(selected);

			function reloadBecause(msg) {
				var a = new alert({
					width: 380,
					content: msg,
					discover: true
				});
				a.onSure(function() {
					location.href = location.href;
				});
			}
			emitter.trigger('goods_num_change', {
				force: true,
				cb: function() {
					$.ajax({
						type: 'get',
						url: '/order/check_init/',
						data: $('#form').serializeObject(),
						dataType: 'json',
						success: function(data) {
							
							goChargeStatus = false;

							if (data.code == 1) {
								reloadBecause('您选择的商品"' + data.info[0].goods_title + '"已下架，请点击确定刷新购物车');
							} else if (data.code == 2) {
								reloadBecause('您选择的商品"' + data.info[0].goods_title + '"库存不足，请点击确定刷新购物车');
							} else if (data.code == 0) {
								setTimeout(function() {
									$('#form').submit();
								}, 0);
							}
						},
						error: function(data) {
							
							goChargeStatus = false;

							reloadBecause('系统出错，请刷新页面重新提交试试');
						}
					});//ajax end
				}
			});
		});//go_charge end
		emitter.on('goods_change', calculator.total);
		emitter.on('goods_num_change', function(e, data) {
			goods.updateNum.call(null, data);
            return false;
		});

		goods.addEvents();
		shops.addEvents();
		calculator.total();
	};
});
