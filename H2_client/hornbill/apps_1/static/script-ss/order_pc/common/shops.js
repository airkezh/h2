fml.define('order_pc/common/shops', ['jquery'], function(require, exports) {
	var $ = require('jquery'),
		emitter = $(document);
	var shops = {
		select: function(e, data) {
			/* 选中商铺逻辑 */
			var self = $(this),
				data = data || {},
				children = self.parents('tbody:first').next().find('.select_goods:enabled');
			/* 
				处理所有宝贝的选中情况
				选中宝贝时也会触发本事件，不需要再去处理
			*/
			if (data.reselectChildren !== false) {
				children.attr('checked', this.checked);
			};
			/*
				检查是否要勾选"全选"
				全选时会触发本事件，不需要再检查
			*/
			if (data.checkParent !== false) {
				if ($('.select_shop:enabled:not(:checked)').length !== 0) {
					$('.select_all').attr('checked', false);
				} else {
					$('.select_all').attr('checked', 'checked');
				}
			};
			/*
				计算总价
				全选，选中某个宝贝时也会触发本事件，会在对应的函数中进行重新计算，这里不再计算避免重复调用
			*/
			if (data.recalculate !== false) {
				emitter.trigger('goods_change');
			};
		},
		addEvents: function() {
			$('.select_shop').change(shops.select);
		}
	};
	return shops;
});
