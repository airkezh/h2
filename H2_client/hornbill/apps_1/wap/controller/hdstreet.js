function hdstreet(){
	return this;
}

var controlFns = {
	'index': function(sort) {
		var sort = this.readData('sort', this.req.__get, '') || '';
				// wapMod = self.loadModel('tools.js'),
		php  = {
			'hdshop': '/shop/shop_street?sort='+sort						// 获取店铺数据 接口
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.sort=sort;
			data.pageTitle = '每日精选店';
			data._CSSLinks = ['hdstreet/index'];
			this.render('hdstreet/index.html', data);
		});
	},
	'new': function(catelog_id) {
		// this.debugSnake({'target' : 'devlab1'});
		var php = {};
		var ua = this.req.headers['user-agent'];
		var platform = false;
		if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
			platform = true;
		}
		if(catelog_id){
			php['hdshop'] = '/shop/shop_street_v2?id='+catelog_id	
		}else{
			php['hdshop'] = '/shop/shop_street_v2'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.catelog_id = catelog_id;
			data.isIphone = platform;

			data.pageTitle = '设计师店';
			data._CSSLinks = ['hdstreet/new'];
			this.render('hdstreet/new.html', data);
		});
	}
};

exports.__create = controller.__create(hdstreet, controlFns);