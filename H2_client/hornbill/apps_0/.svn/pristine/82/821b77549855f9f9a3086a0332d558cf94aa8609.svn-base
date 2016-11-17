function fashionHistroy(){
	return this;
}

var controlFns = {
	'index': function() {
		var php = {
			'reviewTop' : '/activity/Activity_fashion_review_top'+'?__get_r=1'
		};
		var ua = this.req.headers['user-agent'];
		var platform = false;
		if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
			platform = true;
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.isIphone = platform;
			data.pageTitle = '更多流行推荐';
			data._CSSLinks = ['fashionHistroy'];
			this.render('fashionHistroy.html', data);
		})
	},
	'aj': function(params){
		var php = {
			'fashionReview' : '/activity/Activity_fashion_review'
		};
		this.ajaxTo(php[params]);
	}
};

exports.__create = controller.__create(fashionHistroy, controlFns);