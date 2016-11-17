function reg_feedback(){
	return this;
}
var controlFns = {
	'page' : function(args){
		var php = {
			'reg_feedback' : '/customactivity/CustomActivity_common_tool_single?id=m_reg_feedback'
			,'reg_status' : '/note/register_apply_coupon_status'
		}
		, mSelf = this

		if(args.indexOf('old') >= 0){
			php['reg_feedback_old'] = '/note/coupon_float_tips'
		}

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			if(!data.reg_feedback) return this.errorPage();
			var i = 0;
			for (var i = 0; i < data.reg_feedback.length; i++) {
				if(data.reg_feedback[i].pagetype.code == args){
					data.content = data.reg_feedback[i];
					break;
				}
			};
			data.reload = this.readData('reload',this.req.__get, 0);
			data.headTag = args;
			data.pageTitle = '新春回馈-美丽说';
			data._CSSLinks = ['biz/reg_feedback'];
			mSelf.render('biz/reg_feedback.html' , data);
		});
	},
	'act_coupons' : function (){
		//var cid = this.req.__get.cid;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_reg_feedback'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.pageData) return this.errorPage();
			data.pageTitle = data.pageData.page_title;
			data._CSSLinks = ['biz/act_coupons'];
			this.render('biz/act_coupons.html' , data);
		});
	}
}
exports.__create = controller.__create(reg_feedback , controlFns);
