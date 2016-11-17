fml.define('order_pc/common/goods', ['jquery', 'ui/confirm', 'ui/alert', 'order_pc/common/shopping_carts'], function(require, exports) {
	var $ = require('jquery'),
		emitter = $(document),
		confirm = require('ui/confirm'),
		alert = require('ui/alert');
	var shopping_carts = require('order_pc/common/shopping_carts')

	var MIN_AMOUNT = 1; //货物数量最小值
	var MAX_AMOUNT = 100; //货物数量最大值

	var goods = {
		buffer: [],
		updateTimer: null,
		updateBuffer: function(data) {
			var data = data || {},
				id = data.id;

			if (!id) return;

			for (var i = 0; i < goods.buffer.length; i++) {
				if (goods.buffer[i].id === id) {
					goods.buffer[i].num = data.num;
					return;
				}
			};

			goods.buffer.push({
				id: data.id,
				num: data.num
			});
		},
		updateStock: function(id, stock) {
			$('#goods_' + id + ' .amount').attr('data-max', stock);
		},
		updateNum: function(data) {
			var data = data || {};
			goods.updateBuffer(data);

			if (data.force) {
				goods._update(data.cb);
				return;
			};

			clearTimeout(goods.updateTimer);
			goods.updateTimer = setTimeout(function() {
				goods._update();
			}, 1e3);
		},
		_update: function(func) {
			if (typeof func !== 'function') {
				func = function() {};
			};
			if (goods.buffer.length === 0) {
				func();
				return;
			};
			var sid = $(goods.buffer).map(function(i, item) {
				return [item.id, item.num].join('_');
			}).toArray().join(',');
			$.ajax({
				url: '/cart/update/',
				type: 'post',
				data: {
					param: sid
				},
				dataType: 'json',
				success: function(data) {
					if (data.code > 0) {
						new alert({
							width: 380,
							content: data.message,
							discover: true
						})
						return;
					}
					for (var i = 0; i < data.info.length; i++) {
						goods.updateStock(data.info[i].sid, data.info[i].stock);
					};
					func();
				}
			});
			goods.buffer = [];
		},
		select: function(e, data) {
			/* 选中某个商品，检查购物车中该商铺下是否有没选中的宝贝，如果是，将该店铺前的checkbox勾上 */
			var con = $(this).parents('tbody:first'),

				unselected = con.find('input[type=checkbox]:enabled:not(:checked)'),

				shopSelector = con.prev().find('.select_shop'),

				data = data || {};

			shopSelector
				.attr('checked', (unselected.length === 0) ? 'checked' : false)
				.trigger('change', {
					recalculate: false,
					reselectChildren: false
				});
			// 选中店铺、全选、删除宝贝时重新计算总价的函数会在处理完所有逻辑后自动调用，所以在这里强制不重算，避免重复调用
			data.recalculate !== false && emitter.trigger('goods_change');
		},
		del: function(ids, msg, successMsg) {
			/* 从购物车中删除宝贝，无多余逻辑 */
			if (!(ids instanceof Array)) {
				ids = [ids];
			};
			var func = function() {
					var con = $('#goods_' + ids.join(',#goods_'));
					$.ajax({
						url: '/cart/del/',
						data: "sid=" + ids.join(','),
						type: 'post',
						success: function() {
							var tBodyEle = $('#goods_' + ids.join(',')).parent();
							/*var alertPannel = new alert({
							width:380,
							content:successMsg,
							discover:true
						});*/
							shopping_carts.clearCartsNumCache()
							//alertPannel.onSure(function(){
							//从失效列表中去掉已经删除的商品
							var invalid_ids = CONSTANT.invalidGoods.split(',');
							for (var i = 0; i < ids.length; i++) {
								var index = invalid_ids.indexOf(ids[i].toString());
								if (index != -1) {
									invalid_ids.splice(index, 1);
								}
							}
							CONSTANT.invalidGoods = invalid_ids.join(',');
							//删除商品行
							goods.remove.call(con);
							window.setTimeout(function() {
								//更新商品数量
								var cartLength = $('.goods').length;

                                // 这里必须得注意，不管删除的是国内商品还是韩国商品，都需要把另外一种商品的数量加上来再更新
                                var anotherTypeCart = $('.status-top .tag-item.tag-hidden')
                                    .find('span[id="China_count"],span[id="haitao_count"]');
                                var num = parseInt(anotherTypeCart.text().replace('(',''),10) || 0;
								shopping_carts.upShoppintCartsNum(cartLength + num)

								var childTD = $(tBodyEle).children();
								$(childTD.last()).addClass('last').removeClass('first');
								
								if(cartLength == 0 && $('#float_pannel').length>0){
									$('#float_pannel').hide();
								}
							}, 1000);
							//});
							//更新购物车内商品数量
							$.post('/cart/statistic/', {}, function(data, textStatus, xhr) {
								/*optional stuff to do after success */
								data = eval('(' + data + ')');
								//console.log(data.info.China_count);
								//console.log(data.info);
								$('#China_count').text('(' + data.info.China_count + ')' );
								$('#haitao_count').text('(' + data.info.haitao_count + ')' );
							});

						},
						error: function() {
							var alertPannel = new alert({
								width: 380,
								content: '删除失败',
								discover: true
							});
						}
					});
				},
				successMsg = successMsg || '已为您删除了选择的商品';


			if (msg !== false) {
				msg = msg || '您是否要从购物车中移除所选的商品？',
				confirmPannel = new confirm({
					width: 380,
					content: msg,
					discover: true
				});
				confirmPannel.onSure(func);

			} else {
				func();

			}
		},
		remove: function() {
			/* 删除宝贝后的回调：*/
			var con = this;
			con.each(function(i, item) {
				/* 遍历所有被删掉的宝贝： */
				var _con = $(item),
					siblings = _con.siblings('[data-removed!="1"]');
				_con.find('.select_goods').attr('checked', false).hide();
				_con.attr('data-removed', '1');
				if (siblings.length === 0) {
					/* 检查该店铺下是否还有其他宝贝，如果没有，将该店铺一并移除 */
					var s = _con.parent().prev().attr('data-removed', '1');
					var siblingsShop = s.siblings('.shop[data-removed!="1"]');
					temp = _con.add(_con.parent()).add(s);

					if (siblingsShop.length === 0) {
						$('.cart').show();
						$('.container').remove();
						$('.user_goods_num').hide();
						return;
					};
					temp.fadeOut(function() {
						$(this).remove();
						siblingsShop.first().find('.select_shop').trigger('change', {
							recalculate: false
						});
					});
				} else {
					/* 如果还有其他宝贝，检查店铺下是否所有宝贝都是失效的，如果是，将该店铺前的checkbox勾掉并禁用，然后移除对应宝贝 */
					if (siblings.find('.select_goods:enabled').length === 0) {
						_con.parent().prev().find('.select_shop').attr({
							'checked': false,
							'disabled': 'disabled'
						}).trigger('change', {
							recalculate: false
						});
					};
					_con.fadeOut(function() {
						_con.remove();
						siblings.first().find('.select_goods').trigger('change', {
							recalculate: false
						});
					});
				}
			});
			/* PS:删除宝贝后店铺是否选中的逻辑会在change事件中处理，在这个函数中不用管 */
			emitter.trigger('goods_change');
		},
		add: function(input, msg, max) {
			var val = parseInt(input.val()),
				// 判断max是不是数字，如果不是，默认无上限
				max = isNaN(Number(max)) ? Infinity : max;
			if (max <= val) {
				new alert({
					width: 380,
					content: msg,
					discover: true
				});
				return;
			};
			input.val(val + 1);
		},
		minus: function(input, msg, min) {
			var val = parseInt(input.val()),
				// 怕段min是不是数字，如果不是，默认无下限
				min = isNaN(Number(min)) ? -Infinity : min;
			if (min >= val) {
				new alert({
					width: 380,
					content: msg,
					discover: true
				});
				return;
			};
			input.val(val - 1);
		},
		_checkBtn: function(input) {
			var val = Number(input.val()),
				max = Math.min(Number(input.attr('data-max')), MAX_AMOUNT);

			if (val === max) {
				input.next().addClass('disabled');
			} else {
				input.next().removeClass('disabled');
			}
			if (val === 1) {
				input.prev().addClass('disabled');
			} else {
				input.prev().removeClass('disabled');
			}
		},
		addEvents: function(alert_txt) {
			alert_txt = alert_txt || {
				exceedMax: '一件商品最多一次购买'+MAX_AMOUNT+'件哦~',
				exceedStock: '目前商品库存仅剩[num]件',
				exceedLimit: '该商品为限购商品，只允许购买[num]件'
			}
			// 增加宝贝数量按钮
			$('.add').not('.disable').click(function(e) {
				var self = $(this),
					input = self.prev(),
					limit = input.attr('data-limit'),
					oriVal = input.val(),
					id = self.parents('tr:first').attr('id').split('_')[1],

					remain = parseInt(input.attr('data-max')),
					max = Math.min(remain, MAX_AMOUNT),
					// msg = (remain > MAX_AMOUNT ? '' : );
					msg = (remain > MAX_AMOUNT ? alert_txt.exceedMax : alert_txt.exceedStock.replace(/\[num\]/g, max));
				if (limit) {
					msg = alert_txt.exceedLimit.replace(/\[num\]/g, limit)
				}

				input.val(Math.min(Number(input.val()), max));

				goods.add(input, msg, max);

				goods._checkBtn(input);
				if (input.val() !== oriVal) {
					emitter.trigger('goods_change');
					emitter.trigger('goods_num_change', {
						id: id,
						num: input.val(),
						recompute: false
					});
				};

			});
			// 减少宝贝数量按钮
			$('.minus').not('.disable').click(function(e) {
				var self = $(this),
					id = self.parents('tr:first').attr('id').split('_')[1],
					input = self.next(),
					oriVal = input.val();
				if (parseInt(oriVal) < 2) {
					self.parents('tr').find('.del').click();
				} else {
					goods.minus(input, '数量不能小于1', MIN_AMOUNT);
					goods._checkBtn(input);
					if (input.val() !== oriVal) {
						emitter.trigger('goods_change');
						emitter.trigger('goods_num_change', {
							id: id,
							num: input.val(),
							recompute: false
						});
					};
				}

			});
			$('.amount').change(function() {
				var val = Number(this.value),
					max = Number(this.getAttribute('data-max')),
					id = $(this).parents('tr:first').attr('id').split('_')[1],
					oriVal = Number(this.getAttribute('data-ori')),
					limit = $(this).attr('data-limit');
				if (isNaN(val)) {
					this.value = oriVal;
					return;
				};
				if (parseInt(val) != val) {
					val = parseInt(val);
					$(this).val(val);
				}
				if (val < 1) {
					this.value = 1;
					new alert({
						width: 380,
						content: '数量不能小于1',
						discover: true
					})
				} else if (val > Math.min(max, MAX_AMOUNT)) {
					if (max > MAX_AMOUNT) {
						msg = alert_txt.exceedMax;
					} else {
						if (limit) {
							msg = alert_txt.exceedLimit.replace(/\[num\]/g, max);
						} else {
							msg = alert_txt.exceedStock.replace(/\[num\]/g, max);
						}
					}
					new alert({
						width: 380,
						content: msg,
						discover: true
					});
					this.value = Math.min(max, MAX_AMOUNT);
				};

				this.setAttribute('data-ori', this.value);
				goods._checkBtn($(this));
				if (Number(this.value) !== oriVal) {
					emitter.trigger('goods_change');
					emitter.trigger('goods_num_change', {
						id: id,
						num: this.value,
						recompute: false
					});
				};
			});
			// 删除宝贝链接
			$('.del').click(function() {
				var id = $(this).parents('tr:first').attr('id').split('_')[1];
				goods.del(id);
				/*
				var num = $('#total_num')
				num.html((num.text())-1)
				*/
			});
			// 选中/反选宝贝
			$('.select_goods').change(this.select);
		}
	};
	$('.amount').each(function(i, input) {
		goods._checkBtn($(input));
	});
	
	return goods;
});