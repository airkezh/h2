function complain(){
	return this;	
}
var controlFns = {
	list: function(){
		var mSelf = this;
		var page = this.readData('page',this.req.__get, 0)|0;
		var php  = {
			'feedback_list':'doota::/order/feedback_list'
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	base.var_dump(data.address_select, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login' ,false ,{"r": "/complain/"});		
				return;	
			}
			data.groupPg = {};
			data.groupPg.total_num = data.feedback_list.total_num;
			data.groupPg.page_size = 30;
			data.groupPg.current_page = page;	

			data._CSSLinks = ['order_pc/complain/complain_list'];
			data.pageTitle = '我的投诉 - 美丽说';
			data.topbanner = false;
			mSelf.render('complain/complain_list.html' , data);
		});
	},
	index: function(){
		var bat_order_id = this.req.__get.bat_order_id;
		if (!bat_order_id) {
			return this.errorPage();
		};
		var php = {
			'feedback':'doota::/order/feedback'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo(data.DOMAIN.www+'/user/login' ,false ,{"r": "/complain/"});		
				return;
			}
			data._CSSLinks = ['order_pc/complain/complain_detail'];
			data.topbanner = false
			data.pageTitle = '投诉详情 - 美丽说';
			mSelf.render('complain/complain_detail.html',data);
		});
	},
	close:function(){
		this.ajaxTo('doota::/order/feedback_finish');
	},
	cancel:function (){
		this.ajaxTo('doota::/order/feedback_cancel');
	}
};
exports.__create = controller.__create(complain , controlFns);
