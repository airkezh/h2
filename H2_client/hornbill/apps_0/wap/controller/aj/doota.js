function doota(){
	return this;
}
var controlFns = {
	order : function(params){
		var php = {
			'list_info' : 'doota::/order/list_info'
			, 'close_multi' : 'doota::/order/close_multi'
			, 'order_close' : 'doota::/order/close'
			, 'second_menu' : '/person/second_menu'
		}
		this.ajaxTo(php[params])
	},

	cashier: function( params ) {
		var php = {
			'setChannel': 'mpay::/payaccess/setpaychannel',
			'pay': 'mpay::/payaccess/generatepayinfo'
		}
		this.ajaxTo( php[ params ] )
	}
}

exports.__create = controller.__create(doota , controlFns);
