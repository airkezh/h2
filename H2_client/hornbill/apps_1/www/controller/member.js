function member(){
	return this;
}

var controlFns = {
	index : function(args){
		if(args == 'exchange') this.exchange()
		else if(args == 'list') this.list()
		else this.exchange()
	},
	exchange : function(){
		var php={
			//拉去活动产品及兑换状态
			'exchange_status' : '/customactivity/CustomActivity_user_point_goods_status?id=member_exchange&cid=303',
			//首次领取状态 
			'hasGet_status' : '/customactivity/CustomActivity_user_point_status',
			//会员基本信息
			'user_info' : '/customactivity/CustomActivity_user_point_info',
			//兑换操作
			'exchange_add' : '/customactivity/CustomActivity_user_point_exchange_add',
			// 换购活动接口(所有商品/配置信息)
			'act_info' : '/customactivity/CustomActivity_common_tool_single?id=member_exchange&cid=303&preview=true'
		};
		var frm = this.readData('frm',this.req.__get, ''); 
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		// if(!data.userInfo.user_id) return mSelf.redirectTo('/user/login' ,true);
			data.pageTitle = '会员中心 - 美丽说';
			data.headTag = 'member';
			data._CSSLinks = ['member/member'];
			mSelf.render('member/member.html' , data);
		});
	},

	list : function(){
		var php = {
			// 积分记录
			'point_list' : '/customactivity/CustomActivity_user_point_list?page_size=10',
			//会员基本信息
			'user_info' : '/customactivity/CustomActivity_user_point_info'
		};
		var page = this.readData('page',this.req.__get, 0)|0;
		var frm = this.readData('frm', this.req.__get, '');
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.userInfo.user_id) return mSelf.redirectTo('/member/member' ,true);
			data.groupPg = {};
			data.groupPg.total_num = data.point_list.pages.total_num;
			data.groupPg.page_size = data.point_list.page_size || 10;
			data.groupPg.current_page = page;	

			data.pageTitle = '会员积分记录 - 美丽说';
			data.headTag = 'member';
			data._CSSLinks = ['member/member'];
			mSelf.render('member/list.html' , data);
		});
	}
}
exports.__create = controller.__create(member , controlFns);
