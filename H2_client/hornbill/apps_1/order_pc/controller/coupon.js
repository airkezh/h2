function coupon(){
	return this;
}
var controlFns = {
	index: function(){
		var mSelf = this;
		var tab = this.req.__get.tab || 'all',
			page = this.req.__get.page || '0',
			php = {
				'coupon':'doota::/coupon/coupon_home_list?status='+tab+'&page='+page
			};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo.user_id) return mSelf.redirectTo(data.DOMAIN.www+'/user/login' ,true);
			//console.log(mSelf.req.url);
			if(mSelf.req.url == '/coupon' || mSelf.req.url == '/coupon/') return mSelf.redirectTo(data.DOMAIN.order+'/coupon/?page=0&coupon_type=1&status=all' ,true);
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.coupon.totalNum;
			data.groupPg.current_page = page; 
			data.groupPg.page_size = data.coupon.page_size || 12;

			data._CSSLinks = ['order_pc/coupon/index'];
			data.pageTitle = '优惠券 - 美丽说';
			data.topbanner = false
			mSelf.render('coupon/index.html' , data);
		});
	},
	out : function(coupon_apply_code){
		var ua = this.req.headers['user-agent']
		if (ua) ua = ua.toLowerCase()
		if (ua && (ua.indexOf('iphone')>0 || ua.indexOf('android')>0 ) ){
			return this.redirectTo('http://m.meilishuo.com/coupon/out/'+coupon_apply_code)
		}
		var	php = {
			'coupon_get' : 'doota::/coupon/coupon_outspread_apply?coupon_apply_code='+coupon_apply_code
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['order_pc/coupon/out'];
			data.pageTitle = '优惠券领取 - 美丽说';
			this.render('coupon/out.html' , data);
		});
	}
};

exports.__create = controller.__create(coupon , controlFns);
