function beauty(){
	return this;
}
var controlFns = {
	mz520 : function(){
		var mSelf = this;
		var locationUrl = "http://" + this.req.headers.host + this.req.url;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sales_520'
		};
		var wapMod = base.loadModel('wap/tools.js');
		var nav_index = this.readData('nav_index', this.req.__get, 0);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			var params = {
				'title' : {
					'weixin' : '520 就是要爱美丽说！',
					'weixin_timeline' : '美丽说520就是爱 快来放纵一夏！',
					'default' : '美丽说520就是爱 快来放纵一夏！'
				},
				'text' : {
					'weixin' : '美丽说520就是爱，新装6折，让自己放纵一夏！',
					'weixin_timeline' : '美丽说520就是爱，新装6折，让自己放纵一夏！',
					'weibo' : '520 就是要爱美丽说！',
					'txweibo' : '520 就是要爱美丽说！',
					'default' : '美丽说520就是爱，新装6折，让自己放纵一夏！'
				},
				'pic' : {
					'weixin' : 'http://d05.res.meilishuo.net/img/_o/a2/90/67925a3819005b6561852197aa3f_500_680.cg.jpg',
					'weixin_timeline' : 'http://d05.res.meilishuo.net/img/_o/a2/90/67925a3819005b6561852197aa3f_500_680.cg.jpg',
					'default' : 'http://d05.res.meilishuo.net/img/_o/a2/90/67925a3819005b6561852197aa3f_500_680.cg.jpg'
				},
				'url' : locationUrl + '&isFromShare=true'
			};
			if (!data.os.iphone ||  wapMod.isNewest(this.req , '6.2.0') ) params.shareImg = true
			data.share = wapMod.shareTo(mSelf.req , params);

			data.nav_index = nav_index;
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
		var acid = this.readData('cid', this.req.__get, '');
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.acid = acid;
			data.hdtrc = hdtrc;
			data._CSSLinks = ['biz/beauty/beauty_sales_pro'];
			data.pageTitle = data.pageData.page.pageTitle || '美妆大促';
			mSelf.render('biz/beauty/beauty_sales_pro.html', data);
		});
	},
	salesProMain : function(){
		var mSelf = this;

		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sales_proMain_m'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['biz/beauty/beauty_sales_pro_main'];
			data.pageTitle = '美妆大促';
			mSelf.render('biz/beauty/beauty_sales_pro_main.html', data);
		});
	},
	sale : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale_m',
			'list' : '/promote/activity_item_list_916?tab=mask',
			'seckill_num' : '/cosmetic/Cosmetic_820_miao_goods'
		};

		var r = this.readData('r', this.req.__get, '');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.r = r;
			data._CSSLinks = ['biz/beauty/beauty_sale'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale.html', data);
		});
	},
	saleDay : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale_day'
		};
		var acid = this.readData('cid', this.req.__get, '');
		var hdtrc = this.readData('hdtrc', this.req.__get, '');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.acid = acid;
			data.hdtrc = hdtrc;
			data._CSSLinks = ['biz/beauty/beauty_sale11'];
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
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.acid = acid;
			data.hdtrc = hdtrc;
			data._CSSLinks = ['biz/beauty/beauty_sale11'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale12.html', data);
		});
	},
	saleDecMain : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale011_m&cid=4481',
			'goods' : '/promote/Activity_item_list_huodong?contentid=4357&tab=分会场&huodong_code=bs_1212'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['biz/beauty/beauty_sale012'];
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
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.acid = acid;
			data.hdtrc = hdtrc;
			data._CSSLinks = ['biz/beauty/beauty_sale11'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale11.html', data);
		});
	},
	saleNovMain : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_sale011_m',
			'goods' : '/promote/activity_item_list_1111?contentid=3421&tab=分会场'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['biz/beauty/beauty_sale011'];
			data.pageTitle = '美妆大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale011.html', data);
		});
	},
	sale820 : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=bs_820_m',
			'list' : '/customactivity/CustomActivity_wap_spring_carnival_list?page_size=100&type=mob&pid=40469',
			'seckill_num' : '/cosmetic/Cosmetic_820_miao_goods'
		};

		var r = this.readData('r', this.req.__get, '');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.r = r;
			data._CSSLinks = ['biz/beauty/beauty_sale820'];
			data.pageTitle = '美妆820大促 - 美丽说';
			mSelf.render('biz/beauty/beauty_sale820.html', data);
		});
	}
}
exports.__create = controller.__create(beauty , controlFns);