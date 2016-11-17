fml.define('wap/app/doota/cart/goods',['wap/zepto/touch', 'wap/app/doota/shopping_carts'],function(require , exports){
	var shopping_carts = require('wap/app/doota/shopping_carts')
	var emitter = $(document)
	var goods = {
		buffer:[],
		updateTimer:null,
		updateBuffer: function(data){
			var data = data || {},id = data.id;

			if (!id) return;

			for (var i=0; i < goods.buffer.length; i++) {
				if(goods.buffer[i].id === id){
					goods.buffer[i].num = data.num;
					return ;
				}
			};
			
			goods.buffer.push({
				id: data.id,
				num: data.num
			});
		},
		updateStock: function(id,stock){
			$('#goods_'+id+' .amount').attr('data-max',stock);
		},
		updateNum: function(data){
			var data = data || {};
			goods.updateBuffer(data);
			
			if (data.force) {
				goods._update(data.cb);
				return ;
			};
			
			clearTimeout(goods.updateTimer);
			goods.updateTimer = setTimeout(function(){
				goods._update();
			},1e3);
		},
		_update: function(func){
			if (typeof func !== 'function') {
				func = function(){};
			};
			if (goods.buffer.length === 0) {
				func();
				return ;
			};
			var sid = $(goods.buffer).map(function(i,item){
				return [item.id,item.num].join('_');
			}).toArray().join(',');
			$.ajax({
				url:'/cart/update/',
				type:'post',
				data:{
					param: sid
				},
				dataType:'json',
				success: function(data){
					for (var i=0; i < data.info.length; i++) {
						goods.updateStock(data.info[i].sid,data.info[i].stock);
					};
					func();
				}
			});
			goods.buffer = [];
		},
		select: function(e,data){
			/* 选中某个商品，检查购物车中该商铺下是否有没选中的宝贝，如果是，将该店铺前的checkbox勾上 */
			var con = $(this).parents('.order_goods_list'),
			
			unselected = con.find('input[type=checkbox]:enabled:not(:checked)'),
			
			shopSelector = con.prev().find('.select_shop'),
			
			data = data || {};

			(unselected.length === 0) ? shopSelector.prop('checked', 'checked') : shopSelector.prop('checked', false)

			shopSelector.trigger('change',{recalculate:false,reselectChildren:false});
			// 选中店铺、全选、删除宝贝时重新计算总价的函数会在处理完所有逻辑后自动调用，所以在这里强制不重算，避免重复调用
			data.recalculate !== false && emitter.trigger('goods_change');
		},
		del: function(ids,msg,successMsg){
			/* 从购物车中删除宝贝，无多余逻辑 */
			if (!(ids instanceof Array)) {
				ids = [ids];
			};
			var func = function(){
				var con = $('#goods_' + ids.join(',#goods_'));
				$.ajax({
					url:'/cart/del/',
					data:"sid="+ids.join(','),
					type:'post',
					success: function(){
						alert(successMsg)
						shopping_carts.clearCartsNumCache()

						goods.remove.call(con);
						window.setTimeout(function(){
							shopping_carts.upShoppintCartsNum($('.goods').length)
						},1000)

					},
					error: function(){
						alert('删除失败')
					}
				});
			},
			successMsg = successMsg || '已为您删除了选择的商品';
			if (msg !== false) {
				msg = msg || '您是否要从购物车中移除所选的商品？'
				var c = confirm(msg)
				if(c){
					func()		
				}
			}else{
				func();
			}
		},
		remove: function(){
			/* 删除宝贝后的回调：*/
			var con = this;
			con.each(function(i,item){
				/* 遍历所有被删掉的宝贝： */
				var _con = $(item)

				if(_con.siblings().length)
					_con.remove()
				else
					_con.parents('.cart_list').remove()
					
			});
			if($('.order_list_list').children().length == 0){
				$('.none').show()
				$('#float_ctrl').hide()
				$('#removeSelected').hide()
			}

			/* PS:删除宝贝后店铺是否选中的逻辑会在change事件中处理，在这个函数中不用管 */
			emitter.trigger('goods_change');
		},
		add: function(input, msg, max){
			var val = parseInt(input.val()),
			// 判断max是不是数字，如果不是，默认无上限
			max = isNaN(Number(max)) ? Infinity : max;
			if (max <= val) {
				alert(msg)
				return;
			};
			input.val(val + 1);
		},
		minus: function(input, msg, min){
			var val = parseInt(input.val()),
			// 怕段min是不是数字，如果不是，默认无下限
			min = isNaN(Number(min)) ? -Infinity : min;
			if (min >= val) {
				alert(msg)
				return;
			};
			input.val(val - 1);
		},
		_checkBtn: function(input){
			var val = Number(input.val()),
			max = Math.min(Number(input.attr('data-max')),10);

			if (val === max) {
				input.next().addClass('disabled');
			}else{
				input.next().removeClass('disabled');
			}
			if(val === 1) {
				input.prev().addClass('disabled');
			}else{
				input.prev().removeClass('disabled');
			}
		},
		addEvents: function(alert_txt){
			
			var MIN_AMOUNT = 1;//货物数量最小值
			var MAX_AMOUNT = 100;//货物数量最大值
			alert_txt = alert_txt || {
				exceedMax: '一件商品最多一次购买100件哦~',
				exceedStock: '目前商品库存仅剩[num]件'
			}
			// 增加宝贝数量按钮
			$('.add').not('.disable').on('tap', function(e){
				var self = $(this),
				input = self.prev(),
				oriVal = input.val(),
				id = self.parents('li').attr('id').split('_')[1],

				remain = parseInt(input.attr('data-max')),
				max = Math.min(remain,MAX_AMOUNT),
				// msg = (remain > MAX_AMOUNT ? '' : );
				msg = (remain > MAX_AMOUNT ? alert_txt.exceedMax : alert_txt.exceedStock.replace(/\[num\]/g,max));
				
				input.val(Math.min(Number(input.val()),max));
				
				goods.add(input, msg, max);

				goods._checkBtn(input);
				if (input.val() !== oriVal) {
					emitter.trigger('goods_change');
					emitter.trigger('goods_num_change',{id:id,num:input.val(),recompute:false});
				};
				
			});
			// 减少宝贝数量按钮
			$('.minus').not('.disable').on('tap', function(e){
				var self = $(this),
				id = self.parents('li').attr('id').split('_')[1],
				input = self.next(),
				oriVal = input.val();

				goods.minus(input, '数量不能小于1', MIN_AMOUNT);
				goods._checkBtn(input);
				if (input.val() !== oriVal) {
					emitter.trigger('goods_change');
					emitter.trigger('goods_num_change',{id:id,num:input.val(),recompute:false});
				};
			});
			$('.amount').change(function(){
				var val = Number(this.value),max = Number(this.getAttribute('data-max')),
				id = $(this).parents('li').attr('id').split('_')[1],
				oriVal = Number(this.getAttribute('data-ori'));
				if (isNaN(val)) {
					this.value = oriVal;
					return ;
				};
				if (val < 1) {
					this.value = 1;
					new alert({
						width:380,
						content:'数量不能小于1',
						discover:true
					})
				}else if (val > Math.min(max,10)) {
					if (max > 10) {
						msg = alert_txt.exceedMax;
					}else{
						msg = alert_txt.exceedStock.replace(/\[num\]/g,max);
					}
					new alert({
						width:380,
						content:msg,
						discover:true
					});
					this.value = Math.min(max,10);
				};

				this.setAttribute('data-ori',this.value);
				goods._checkBtn($(this));
				if (Number(this.value) !== oriVal) {
					emitter.trigger('goods_change');
					emitter.trigger('goods_num_change',{id:id,num:this.value,recompute:false});
				};
			});
			// 删除宝贝链接
			$('.del').on('tap', function(){
				var id = $(this).parents('li').attr('id').split('_')[1];
				goods.del(id);
			});
			// 选中/反选宝贝
			$('.select_goods').change(this.select);
		}
	};
	$('.amount').each(function(i,input){
		goods._checkBtn($(input));
	});
	return goods;
});
