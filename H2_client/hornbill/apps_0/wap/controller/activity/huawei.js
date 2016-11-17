function huawei(){
	return this;
}
var controlFns = {
	'index' : function(){
		var mSelf = this;
		var php  = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_huawei'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;

			data.use_rem_screen = '640_meta';
			data.pageTitle = '华为渠道优惠券';
			data.headTag = 'huawei';
			data._CSSLinks = ['activity/huawei'];
			mSelf.render('activity/huawei.html', data);
		});
	},
	'yingyongbao' : function(){
		var mSelf = this;
		var php  = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_huawei&cid=16775'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;

			data.use_rem_screen = '640_meta';
			data.pageTitle = '应用宝优惠券';
			data.headTag = 'yingyongbao';
			data._CSSLinks = ['activity/huawei'];
			mSelf.render('activity/yingyongbao.html', data);
		});
	},

	coupon : function (params){
		var php = {
			'coupon' : '/user/Send_coupon_for_huawei'
			, 'yingyongbao' : '/user/Send_coupon_for_yingyongbao'
		}

		this.ajaxTo(php[params])
	}
}

exports.__create = controller.__create(huawei , controlFns);
