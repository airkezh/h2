function March_sale(){
	return this;
}
var controlFns = {
	main : function(){
		var type = this.readData('type',this.req.__get, 0)|0;
		var ac_id = '362';
		if(type == 2){
			ac_id = '364'
		}else if(type == 1){
			ac_id = '363'
		}else{
			ac_id = '362'
		}
		var php = {
			'March_sale_goods' : '/customactivity/CustomActivity_cosmetic_promote?ac_id='+ac_id,
			'miaosha' : '/customactivity/CustomActivity_cosmetic_promote_secondkill',
			'record' : '/customactivity/CustomActivity_cosmetic_promote_lottery_record',
			'promote_num' : '/customactivity/CustomActivity_cosmetic_promote_lottery_num'
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.userInfo.user_id > 0 ? data.isLogin = 1 : data.isLogin = 0;
			data.type = type;
			data.fluid = true;
			data._CSSLinks = ['huodong/March_sale'];
			data.pageTitle = '美妆狂欢节，不潮不buy！';
			data.secondNavHold = true;
			data.topbanner = false
			mSelf.render('biz/March_sale/activity_main.html' , data);
		});
	},
	rule : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.fluid = true;
			data._CSSLinks = ['huodong/March_sale'];
			data.pageTitle = '美妆狂欢节，优惠折扣享不停！';
			data.topbanner = false
			mSelf.render('biz/March_sale/rule.html' , data);
		});
	},
	apparel : function(){
		var cid = this.readData('cid',this.req.__get, 0)|0;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=march_apparel'
			,'couponData' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=0&type=pc'
			,'coupon_100' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=1&type=pc'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData){
				return mSelf.errorPage();
			}
			data.fluid = true;
			data.topbanner = false;
			data.logo_act = false;
			if(cid == 769){
				data.cur_time = new Date().getTime()/1000;
				data.start_time = 1397995200;
				data.end_time = 1398268800;
				if( data.cur_time < data.start_time ){
					data.status = 'nostart';
				}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
					data.status = 'saling';
				}else{ 
					data.status = 'end';	
				}			
			}
			data._CSSLinks = ['huodong/March_apparel_sale'];
			data.pageTitle = '春夏热销最潮服饰2折起';
			mSelf.render('biz/March_sale/March_apparel_sale.html' , data);
		});
	},
	apparel_detail : function(){
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=march_apparel_detail'
			,'couponData' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=0&type=pc'
			,'coupon_100' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=1&type=pc'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData){
				return mSelf.errorPage();
			}
			data.fluid = true;
			data.topbanner = false;

			data._CSSLinks = ['huodong/March_apparel_sale_detail'];
			data.pageTitle = '320春装狂欢节 现金券火热开抢 - 美丽说';
			mSelf.render('biz/March_sale/March_apparel_sale_detail.html' , data);
		});
	}
}
exports.__create = controller.__create(March_sale, controlFns);
