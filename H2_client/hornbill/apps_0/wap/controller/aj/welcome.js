function welcome(){ return this }

var controlFns = {
	getGoods : function (params){
		var php = {
			'feature' : '/twitter/Twitter_guess?__get_r=1',
			'new' : '/twitter/Twitter_fashion?__get_r=1'
		}

		this.ajaxTo(php[params])
	}
}

exports.__create = controller.__create(welcome , controlFns);
