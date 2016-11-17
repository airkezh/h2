function eshop(){
	return this;
}

var controlFns = {
	index : function(p){
		this.eshop();
	},
	eshop : function(){
		var php = {
			'poster0' : '/cpc/get_cpc_eshop',
			'adm27' : '/adm/ad_Show?slot_id=27'
		};
		var mSelf = this;
		var page = this.readData('page',this.req.__get, 0)|0;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['page_guang'];
			data.pageTitle = 'eshop - 美丽说';
			//隐藏右侧活动的插件
			data.qqPush = 'qqPushHide';

			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			mSelf.render('eshop/eshop.html' , data);
		});
	}
};

exports.__create = controller.__create(eshop, controlFns);