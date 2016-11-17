function beauty(){
	return this;
}

var controlFns = {
	mz520 : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sales_520'
		};
		var nav_index = this.readData('nav_index', this.req.__get, 0);
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.nav_index = nav_index;
			data.hideGoTop = true;
			data.pageTitle = data.pageData.page.pageTitle || '美妆大促';
			data._CSSLinks = ['biz/beauty/mz520'];
			mSelf.render('biz/beauty/mz520.html', data);
		});
	},
	salesPro : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sales_pro'
		};
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.hdtrc = hdtrc;
			data._CSSLinks = ['huodong/beauty_sales_pro'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sales_pro.html', data);
		});
	},
	salesProMain : function(){
		var mSelf = this;

		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sales_proMain'
		};
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.hdtrc = hdtrc;
			data.hideGoTop = true;
			data._CSSLinks = ['huodong/beauty_sales_pro_main'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sales_pro_main.html', data);
		});
	},
	sale : function(){
		var mSelf = this;
		this.req.__get.tab = this.req.__get.tab || 'mask';
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale',
			'list' : '/promote/activity_item_list_916',
			'seckill_num' : '/cosmetic/Cosmetic_820_miao_goods'
		};
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		var name = this.readData('tab', this.req.__get, '');

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.hdtrc = hdtrc.split('_type')[0] || '';
			data.name = name;
			data._CSSLinks = ['huodong/beauty_sale'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale.html', data);
		});
	},
	saleDay : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale_day'
		};
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.hdtrc = hdtrc;
			data._CSSLinks = ['huodong/beauty_sale11'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/sale_day.html', data);
		});
	},
	saleDec : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale11_m&cid=4331'
		};
		var acid = this.readData('acid', this.req.__get, 4347);
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.acid = acid;
			data.hdtrc = hdtrc;
			data._CSSLinks = ['huodong/beauty_sale11'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale12.html', data);
		});
	},
	saleDecMain : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale011&cid=4513',
			'goods' : '/promote/Activity_item_list_huodong?contentid=4357&tab=分会场&huodong_code=bs_1212'
		};
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.hdtrc = hdtrc;
			data._CSSLinks = ['huodong/beauty_sale012'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale012.html', data);
		});
	},
	saleNov : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale11_m'
		};
		var acid = this.readData('acid', this.req.__get, 3167);
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.acid = acid;
			data.hdtrc = hdtrc;
			data._CSSLinks = ['huodong/beauty_sale11'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale11.html', data);
		});
	},
	saleNovMain : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale011',
			'goods' : '/promote/activity_item_list_1111?contentid=3421&tab=分会场'
		};
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.hdtrc = hdtrc;
			data._CSSLinks = ['huodong/beauty_sale011'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale011.html', data);
		});
	},
	sale820 : function(name){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_820',
			'list' : '/customactivity/CustomActivity_wap_spring_carnival_list?page_size=100',
			'seckill_num' : '/cosmetic/Cosmetic_820_miao_goods'
		};
		var hdtrc = this.readData('hdtrc', this.req.__get, '');

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.hdtrc = hdtrc;
			data.name = name;
			data._CSSLinks = ['huodong/beauty_sale820'];
			data.pageTitle = '美妆820大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale820.html', data);
		});
	}
}
 exports.__create = controller.__create(beauty, controlFns);
