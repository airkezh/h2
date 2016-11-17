function aj(){
	return this;
}

var controlFns = {
	order : function(params){
		var php = {
			'create' : 'meidian::/order/create'
			, 'test_pay' : 'meidian::/order/test_pay'
		}
		this.ajaxTo(php[params]);
	},
	goods : function(params){
		var php = {
			'list' : 'meidian::/goods/get_list'
		}
		this.ajaxTo(php[params]);
	},
	bigger : function(params){
		var php = {
			'create' : 'meidian::/bigger/create'
		}
		this.ajaxTo(php[params]);
	},
	bigger_com : function(params){
		var php = {
			'comment' : 'meidian::/bigger_comment/create'
		}
		this.ajaxTo(php[params]);
	},
	orderList : function(params){
		var php = {
			'list' : 'meidian::/order/get_list'
		}
		this.ajaxTo(php[params]);
	}

}
exports.__create = controller.__create(aj , controlFns);









