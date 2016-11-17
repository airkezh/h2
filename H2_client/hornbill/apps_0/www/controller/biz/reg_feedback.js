function reg_feedback(){
	return this;
}

var controlFns = {
	newyear : function(){
		var device = base.loadModel('wap/tools.js').uaos(this.req);
		if (device.phone){
			return this.redirectTo('http://m.meilishuo.com/biz/reg_feedback/act_coupons/?cid=3783')
		}
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=pc_reg_feedback'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData) return this.errorPage();
			data._CSSLinks = ['huodong/reg_feedback'];
			data.pageTitle = data.pageData.page_title;
			mSelf.render('biz/reg_feedback.html' , data);
		});
	}
}
 exports.__create = controller.__create(reg_feedback, controlFns);
