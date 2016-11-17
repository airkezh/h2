function aj(){
	return this;
}
var controlFns = {
	doota : function(params){
		var php = {
			'address_add' : 'doota::/address/addr_add?source=4-0.0.1'
			, 'address_delete' : 'doota::/address/addr_delete'
			, 'address_select' : 'doota::/address/addr_select'
			, 'address_validate' : 'doota::/address/addr_validate'
			, 'address_default' : 'doota::/address/addr_default'
			, 'order_close' : 'doota::/order/close'
			, 'order_recv' : 'doota::/order/recv_confirm'
			, 'cart_number' : 'doota::/cart/number'
			, 'shop_info' : 'doota::/shop/shop_list'
			, 'refund_apply' : 'doota::/wap/refund/refund_apply'
			, 'express' : 'doota::/wap/refund/refund_express'
			, 'appeal_initiate' : 'doota::/wap/appeal/initiate'
			, 'orderNum' : 'doota::/order/goods_order_number'
			, 'refund_edit' : 'doota::/wap/refund/refund_edit'
			, 'refund_cancel' : 'doota::/wap/refund/refund_cancel'
			, 'refund_reapply' : 'doota::/wap/refund/refund_reapply'
		}
		this.ajaxTo(php[params])
	}
}
exports.__create = controller.__create(aj , controlFns);
