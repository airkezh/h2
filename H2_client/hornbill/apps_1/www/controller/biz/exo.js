function exo() {
	return this;
}
var controlFns = {
	main: function(p){
		return this.redirectTo('/welcome', true)
		//手 Q 会改链接,把最后的空/ 去掉
		if (!p) return this.redirectTo('pc', true)

		var mSelf = this;
		var php = {
			'fuide' : '/customactivity/CustomActivity_fuider_pc_special?cid=927',
			'comein' : '/customactivity/CustomActivity_exo_join_info?act=get',
			'fight_num' : '/customactivity/CustomActivity_exo_fighting_info?act=get',
			'join_num' : '/customactivity/CustomActivity_exo_join_info?act=get',
			'join' : '/customactivity/CustomActivity_exo_join_info?act=set',
			'group' : '/customactivity/CustomActivity_exo_group_list', 
			//'group' : '/customactivity/CustomActivity_group_infos?group_ids=10919,14954325,10765,13266356,103310679',
			'exo_zhuanti_banner' : '/customactivity/CustomActivity_common_tool_single?id=exo_zhuanti_banner',
			'user_info' : '/customactivity/CustomActivity_user_point_info',
			'news' : '/customactivity/CustomActivity_common_tool_single?id=exo_zhuanti_news',
			'exchange' : '/customactivity/CustomActivity_common_tool_single?id=exo_mob_planet&cid=637',
			'exchange_status' : '/customactivity/CustomActivity_user_point_goods_status?id=exo_mob_planet&cid=637',
			'status' : '/customactivity/CustomActivity_common_tool_single?id=exo_mob_planet&cid=637',
			'new_banner' : '/customactivity/CustomActivity_common_tool_single?id=exo_zhuanti',
			'exo_img':'/customactivity/CustomActivity_common_tool_single?id=exo_pc'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var time = new Date();
			data.year = time.getFullYear();
			data.month = time.getMonth() + 1;
			data.day = time.getDate();
			data.pageTitle = 'exo';
			data.has_fought = data.fight_num && data.fight_num.code != 0;
			data.has_joined = data.join_num && data.join_num.code != 0;
			data.pageTitle = '美丽行星-EXO-M美丽说专属粉丝俱乐部 - 美丽说';
			data._CSSLinks = ['member/member','huodong/exo_zhuanti'];
			data.donot_show = mSelf.req.__get.donot_show;
			data.force_show = mSelf.req.__get.force_show; 
			data.force_show_anniversary = mSelf.req.__get.sshow;
			data.onlyShowGoTop = true;
			mSelf.render('biz/huodong/exo/main.html' , data);
		});
	},
	lottery: function(){
		var mSelf = this;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/exo_lottery'];
			data.pageTitle = '美丽行星-EXO-M美丽说专属粉丝俱乐部 - 美丽说';
			mSelf.render('biz/huodong/exo/lottery.html' , data);
		});
		
	},
	exo_concert:function(){
		var mSelf = this;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/exo_concert'];
			data.pageTitle = '2014美丽说EXO-M粉丝签名会开始抢票啦~ - 美丽说';
			mSelf.render('biz/huodong/exo/exo_concert.html' , data);
		});
		
	}
}
exports.__create = controller.__create(exo, controlFns);
