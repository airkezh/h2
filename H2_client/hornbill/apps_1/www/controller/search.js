function search(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var searchKey = this.readData('searchKey',this.req.__get, '').trim(),
			filter = this.readData('filter',this.req.__get, 'goods'),
			page = this.readData('page',this.req.__get, 0);

		try{
			searchKey = decodeURIComponent(searchKey)
		}catch(e){
		}
		var pageTitle = {'goods' : '宝贝', 'user' : '用户', 'magazine' : '杂志','shop' : '商家'};
		var php = {}, mSelf = this;
		if(filter == 'user_nickname') filter = 'user';
		if(filter !== 'user' && filter !== 'goods' && filter !== 'magazine' && filter!== 'shop') filter = 'goods';
		this.req.__get.filter = filter;
		this.req.__get.word_name = searchKey;
		this.req.__get.searchKey = searchKey;
		this.req.__get.searchType = parseInt(this.readData('searchType')) ||1

		if(searchKey != '')
			//this.debugSnake( { target: 'pmlab1' } )
			php = {
				'search_user_totalnum' : '/user/search_totalnum',
				'search_magazine_totalnum' : '/group/search_poster_num',
				'search_goods_totalnum' : '/goods/search_totalnum',
				'search_shop_totalnum' : '/shop/search_totalnum'
			};
		if (searchKey != '' && filter == 'goods')
			php['p4p'] = '/pfp/pfp_hot?key_id=' + encodeURIComponent(searchKey) + '&tp=4'

		//for adm
		php['adm35'] = '/adm/ad_Show?slot_id=35';
		php['adm37'] = '/adm/ad_Show?slot_id=37';
		//
		php['bdZhiShu'] = '/dict/OptimizeBaidu'

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//先处理下php接口超时没数据的问题
			if (!data.search_user_totalnum) data.search_user_totalnum = {}

			data.search_user_totalnum.showNum = data.search_user_totalnum.showNum || 0;
//			console.log(data.p4p)
			delete mSelf.req.__get.word_name; 
			data.totalNum = { 'goods' : 0 ,'user' : 0, 'magazine' : 0, 'shop' : 0};
			if(searchKey != ''){
				data.totalNum.goods = data['search_goods_totalnum'].totalNum
				data.totalNum.magazine = data['search_magazine_totalnum'].totalNum
				data.totalNum.user = data['search_user_totalnum'].totalNum
				data.totalNum.shop=data['search_shop_totalnum'].totalNum
			}
			data._CSSLinks = ['search'];
			data.pageTitle = (searchKey == '' ? '' : searchKey + ' - ') + pageTitle[filter] + '搜索 － 美丽说';
			data.fluid = true;
			data.groupPg = {}; 
			data.groupPg.page_size = 220;
			data.groupPg.total_num = data.totalNum[filter];	
			data.groupPg.current_page = page; 
			mSelf.render('search/search.html' , data);
		});
	},
	'getPosters' : function(args){
		var searchKey = this.readData('searchKey',this.req.__get, '').trim(),
			filter = this.readData('filter',this.req.__get, 'goods'),
			frame = this.readData('frame',this.req.__get, 0);
		try{
			searchKey = decodeURIComponent(searchKey)
		}catch(e){
		}
		var mSelf = this, php = {};
		var result = {
				'user' : '/user/search_user',
				'magazine' : '/group/search_poster',
				'goods' : '/goods/search_poster',
				'shop' : '/shop/search_shop'	
			},
			recommend = {
				'user' : '/user/search_recommend',
				'magazine' : '/group/search_recommend',
				'goods' : '/goods/search_attr_nine',
				'shop' : '/shop/search_recommend'
			};
		if(filter == 'user_nickname') filter = 'user';
		if(filter !== 'user' && filter !== 'goods' && filter !== 'magazine' && filter !== 'shop') filter = 'goods';

		this.req.__get.searchKey = searchKey;
		this.req.__get.word_name = searchKey;
		this.req.__get.filter = filter;

		if(searchKey != ''){
			if(args == 'result') mSelf.ajaxTo(result[filter]);
			else if(args == 'recommend') mSelf.ajaxTo(recommend[filter]);
		}
	}
}
exports.__create = controller.__create(search , controlFns);
