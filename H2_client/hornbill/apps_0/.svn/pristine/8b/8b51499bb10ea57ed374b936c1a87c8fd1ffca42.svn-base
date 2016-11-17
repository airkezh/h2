function aj(){
	return this;
}

var controlFns = {
	order : function(params){
		var php = {
			'create' : 'midian::/order/create'
			, 'test_pay' : 'midian::/order/test_pay'
		}
		this.ajaxTo(php[params]);
	},
	goods : function(params){
		var php = {
			'list' : 'midian::/goods/get_list'
		}
		this.ajaxTo(php[params]);
	},
	bigger : function(params){
		var php = {
			'create' : 'midian::/bigger/create'
		}
		this.ajaxTo(php[params]);
	},
	bigger_com : function(params){
		var php = {
			'comment' : 'midian::/bigger_comment/create'
		}
		this.ajaxTo(php[params]);
	},
	orderList : function(params){
		var php = {
			'list' : 'midian::/order/get_list'
		}
		this.ajaxTo(php[params]);
	}

}
exports.__create = controller.__create(aj , controlFns);









