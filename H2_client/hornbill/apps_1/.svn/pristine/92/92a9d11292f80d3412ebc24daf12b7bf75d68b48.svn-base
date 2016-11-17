function cart(){
	return this;
}

var controlFns = {
	index: function(params){
		// console.log(require('querystring').parse.toString());
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var self = this;
		this.listenOver(function(data){
			data.showSaleSideBar = true;
			data.topbanner = false
			data.noHomeBtn = true;
			data.SaleChannel = true;
			data._CSSLinks = ['doota/cart'];
			data.pageTitle = '我的购物车 - 美丽说';
			self.render('doota/cart.html' , data);
		});
	},
	check: function(params){
		var cartInfo = mokeData.cartInfo;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		var self = this;
		this.listenOver(function(data){
			data.cartInfo = mokeData.cartInfo;
			data.showSaleSideBar = true;
			data.topbanner = false
			self.render('cart/aaa.html' , data);
		});
	}
};

exports.__create = controller.__create(cart , controlFns);
