function share_qzone(){
	return this;
}
var controlFns = {
	index : function(tid){
		if (!tid) return this.errorPage()
		var mSelf = this;
		this.req.__get.tid = tid;

		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'goods_info' : '/goods/share_main?o_otype=qzone',
			'goods_group' : '/goods/share_group',
			'poster0' : '/qzone/shopping_goods'
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.goods_info || data.goods_info.show404) return mSelf.errorPage()
			data.pageTitle = data.goods_info.ginfo.title +' - 美丽说';
			data._CSSLinks = ['share_qzone'];
			// true 宽屏 
			data.fluid = true;
			data.qzone =1;
			mSelf.render('twitter/share_qzone.html' , data);	
		});	
	},
	detail : function(){
		this.render('twitter/detail_qzone.html' , {});	
		
		}
}
exports.__create = controller.__create(share_qzone , controlFns);
