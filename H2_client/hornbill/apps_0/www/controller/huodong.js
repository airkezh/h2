function huodong() {
	    return this;
}
var controlFns = {
	index : function(p){
		if ( ['ibeauty'].indexOf(p) > -1) this[p]()
		if (p == 16169578) this.magDetail(p)
		if (p == 'vacation') this.vacation();
		if (p == 'maya') this.maya();
		if (p == 'meizhuang') this.meizhuang();
		if (p == 'meibaolianapr01') this.meibaolianapr01();
		if (p == 'yuxi') this.yuxi();
		if (p == 'gana') this.gana();
		if (p == 'sloggi') this.sloggi();
		if (p == 'kleenex') this.kleenex();
		if (p == 'btzdnwn') this.btzdnwn();
		if (p == 'guimiyue') this.guimiyue();
		if (p == 'yuemuzhiyuan') this.yuemuzhiyuan();
		if (p == 'exo') this.exo();
		if (p == 'biduke') this.biduke();
		if (p == 'baiduExtension') this.baiduExtension();
	},
	aupres : function(){
		var aId = 415;
		var php = {
				'users_apply' : '/welfare/welfare_activity_avatar?activity_id=' + aId,
				'wl_info' : '/welfare/welfare_activity_head?activity_id=' + aId,
				'wf_girl' : '/person/user_info?user_id=34143831',
				'is_sign' : '/customactivity/CustomActivity_oubolai_signin'
			};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.wl_info) return mSelf.errorPage();
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host;

			data._CSSLinks = ['huodong/aupres_415', 'welfare'];
			data.pageTitle = '欧珀莱臻白多效拯救雾霾肌肤活动';
			mSelf.render('huodong/aupres_415.html' , data);
		});
	},
	aupres2 : function(){
		var page = this.readData('page', this.req.__get, 0) | 0;
		var topic_id = 27;
		var php = {
				'is_sign' : '/customactivity/CustomActivity_oubolai_cansignin',
				'lunbo' : '/customactivity/CustomActivity_common_tool_single?id=pic_link_group&cid=909',
				'topic_list' : '/wapbiz/magicbox_topiclist?id='+topic_id
			};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//讨论区
			data.beauty_id = topic_id;
			data.beautyTag = 'beautybox';
			//分页
			data.groupPg = {};
		    data.groupPg.total_num = data.topic_list.totalNum;
		    data.groupPg.current_page = page;
		    data.groupPg.page_size = 20;
			data._CSSLinks = ['huodong/aupres_424'];
			data.pageTitle = '欧珀莱臻白多效拯救雾霾肌肤活动';
			mSelf.render('huodong/aupres_424.html' , data);
		});
	},
	aupres3 : function(){
		var page = this.readData('page', this.req.__get, 0) | 0;
		var topic_id = 27;
		var php = {
			'is_sign' : '/customactivity/CustomActivity_oubolai_cansignin',
			'lunbo' : '/customactivity/CustomActivity_common_tool_single?id=pic_link_group&cid=909',
			'winner_list' : '/customactivity/CustomActivity_common_tool_single?id=winner_list&cid=965',
			"is_draw" : "/customactivity/CustomActivity_oubolai_canlottery",
			'topic_list' : '/wapbiz/magicbox_topiclist?id='+topic_id

		},
		mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//讨论区
			data.beauty_id = topic_id;
			data.beautyTag = 'beautybox';
			//分页
			data.groupPg = {};
		    data.groupPg.total_num = data.topic_list.totalNum;
		    data.groupPg.current_page = page;
		    data.groupPg.page_size = 20;
			data._CSSLinks = ['huodong/aupres_51'];
			data.pageTitle = '欧珀莱臻白多效拯救雾霾肌肤活动';
			mSelf.render('huodong/aupres_51.html' , data);
		});
	},
	'exo' : function(){
		var php = {
			"exo_img" : "/customactivity/CustomActivity_common_tool_single?id=exo_pc"
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.exo_img) return this.errorPage();
			data._CSSLinks = ['huodong/exo'];
			data.pageTitle = data.exo_img.pagetitle;
			mSelf.render('huodong/exo.html' , data);
		});
	},
	'hotgoods' : function(){
		var php = {
			//"exo_img" : "/customactivity/CustomActivity_common_tool_single?id=exo_pc"
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//if(!data.exo_img) return this.errorPage();
			data._CSSLinks = ['activity/hotgoods'];
			data.pageTitle = '这么火的单品你竟然没有？';
			mSelf.render('huodong/hotgoods.html' , data);
		});
	},
	'yuemuzhiyuan' : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/yuemuzhiyuan'];
			data.pageTitle = '悦木之源';
			mSelf.render('huodong/yuemuzhiyuan.html' , data);
		});
	},
	ibeauty : function(){
		var mSelf = this;
		var php = {}
		this.setDefaultData(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			data.fluid = true
			data.pageTitle	= '美丽说-悦己美妆大赏投票'
			mSelf.render('huodong/ibeauty.html' , data)
			})
	},
	magDetail:function(magid){
		if (magid != 16169578)
			return this.errorPage();
		var mSelf = this;
		var page = this.readData('page' ,this.res.__get ,0);
		var php = {
			'beedit':'/group/add_editor?group_id=' + magid,
			'totalNum' : '/group/group_poster_number?group_id=' + magid,
			'group_header' : '/group/group_header?group_id=' + magid
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
				if (data.group_header.show_collection)
					data.isMagFavor_mag = true;
				if (data.group_header.header_show_collection)		//#2856 请将这个杂志的头图增加点击后的收藏功能
					data.header_show_collection = 1;
				if (! data.group_header.group_info) return mSelf.errorPage();
				if(data.group_header.group_info.show_poster == 0  && mSelf.readData('poster') != 1) return mSelf.redirectTo('/group/' + magid + '?poster=0&elite=0');
				data.lang = {window:{login:'登录后，关注杂志，每天看到最新分享！'}};
				data._CSSLinks = ['group_con'];
				data.headTag = 'magazine';
				data.magid = magid;
				data.fluid = true;
				data.pageTitle = '【多图】'+ data.group_header.group_info.name +'杂志 - 美丽说';
				data.keywords = '美丽说,杂志,图片,购物分享,淘宝网购物';
				data.meta_description = '美丽说杂志是风格的小世界，欧美、甜美、森女、朋克，应有尽有！兴趣相投的MM聚焦在这里分享时尚生活，创办属于自己的个性杂志';
				//获取分页总数
				data.groupPg = {};
				data.groupPg.total_num = data.totalNum.totalNum;
				data.groupPg.current_page = page;
				mSelf.render('activity/meibaolian.html' , data);
		});
	},
	'meizhuang' : function(args){
		var php = {
			'getuser' : '/bvote/get_user_list'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.meizhuang_end = true;
			data._CSSLinks = ['huodong/meizhuang'];
			data.pageTitle = '2012 美丽说爱美赏评选盛典';
			mSelf.render('huodong/meizhuang.html' , data);
		});
	},
	'vacation' : function(args){
		var php = {
			'vacationData' : '/group/activity_group_nd'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/vacation'];
			data.pageTitle = '美丽说 出游装备分享活动页';
			mSelf.render('huodong/vacation.html' , data);
		});
	},
	'maya' : function(args){
		var page = this.readData('page',this.req.__get, 0)|0;
		this.req.__get.frame = 0;
		var php = {
			'huodongGroup' : '/huodong/group_view',
			'huodongTwitter' : '/huodong/words_list',
			'user_groups' : '/group/user_groups'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/maya'];
			data.pageTitle = '美丽说 末日前的美好心愿';
			data.groupPg = {};
			data.groupPg.total_num = data.huodongTwitter.page_total;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 1;
			mSelf.render('huodong/maya.html' , data);
		});
	},
	'spring' : function(args){
		var mSelf = this;
		var php = {
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/spring2013'];
			data.pageTitle = '美丽说 我要美美回家过年！';
			if(args == 'inner') data.isinner = true;
			mSelf.render('huodong/spring2013.html' , data);
		});
	},
	'origins' : function(args){
		var page = this.readData('page' ,this.res.__get ,0)
		var php = {
			'origins_getnum' : '/customactivity/Origins_party?op=r',
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/origins'];
			data.pageTitle = '悦木之源·植物成分“对对碰”，对号入座赢大奖';
			mSelf.render('huodong/origins.html' , data);
		});
	},
	'meibaolianapr01' : function(args){
		var page = this.readData('page' ,this.res.__get ,0)
		var php = {
			'summerbb_group' : '/huodong/MaybellineBBCream_group_view'
			, 'summerbb_talk' : '/huodong/MaybellineBBCream_comment'
//			, 'summerbb_talk' : '/welfare/welfare_activity_list?activity_id=' + 205
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/summerbb'];
			data.pageTitle = '美宝莲BB霜';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.summerbb_group.totalNum;
			data.groupPg.page_size = 40;
			data.groupPg.current_page = page;
			mSelf.render('huodong/summerbb.html' , data);
		});
	},
	'garnier' : function(args){
		var page = this.readData('page' ,this.res.__get ,0)
		var php = {
			'garnier_group' : '/huodong/Garnier_group_view'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/garnier'];
			data.pageTitle = '卡尼尔';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.garnier_group.totalNum;
			data.groupPg.page_size = 40;
			data.groupPg.current_page = page;
			mSelf.render('huodong/garnier.html' , data);
		});
	},
	'dangdang' : function(){
		var page = this.readData('page' ,this.res.__get ,0);
		var php = {
			'totalNum' : '/commerceapp/Commerce_post_size'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/dangdang'];
			data.pageTitle = '当当网惹火行动 释放你的欲望清单';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page;
			mSelf.render('huodong/dangdang.html' , data);
		});
	},
	'shangpin' : function(){
		var page = this.readData('page' ,this.res.__get ,0);
		var php = {
			'totalNum' : '/commerceapp/Commerce_post_size?type=shangpin'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/dangdang'];
			data.pageTitle = '上品style，穿的精彩，买的精明';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page;
			mSelf.render('huodong/shangpin.html' , data);
		});
	},
	'ms' : function(){
		var page = this.readData('page' ,this.res.__get ,0);
		var tag = this.readData('tag' ,this.res.__get ,0);
		var php = {
			'totalNum' : '/commerceapp/Commerce_post_size?type=ms_'+tag
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/dangdang'];
			data.pageTitle = 'M&S马莎百搭大赛';
			data.tag = tag;
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 120;
			mSelf.render('huodong/ms.html' , data);
		});
	},
	'ms1' : function(){
		var page = this.readData('page' ,this.res.__get ,0);
		var php = {
			'totalNum' : '/commerceapp/Commerce_post_size'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/dangdang'];
			data.pageTitle = 'M&S马莎百搭大赛';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 120;
			mSelf.render('huodong/ms1.html' , data);
		});
	},
	'buick201314' : function(){
		var nowt = new Date;
		if (nowt > new Date('2013/2/20'))
			return this.errorPage();
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/dangdang'];
			data.pageTitle = '别克，爱你一生一世';
			mSelf.render('huodong/buick.html' , data);
		});
	},
	'converse' : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '匡威-玩味超炫色';
			mSelf.render('huodong/converse.html' , data);
		});
	},
	'origins_marry' : function(){
		var php = {
				'users_apply' : '/welfare/welfare_activity_avatar?activity_id=349', //349
				'wl_info' : '/welfare/welfare_activity_head?activity_id=349',
				'wf_girl' : '/person/user_info?user_id=34143831'
			};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.wl_info) return mSelf.errorPage();
            data.user_list = data.wl_info.userInfo;
            data.wl_header = data.wl_info.info;
            data.wl_header.host = mSelf.req.headers.host;//sina share
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/origins_marry' , 'welfare'];
			data.pageTitle = 'give origins 圣诞狂欢特献';
			mSelf.render('huodong/origins_marry.html' , data);
		});
	},
	'gana' : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '第66届戛纳电影节美丽说现场直击';
			mSelf.render('huodong/gana.html' , data);
		});
	},
	'sloggi' : function(){
		var php = {
			'joinNum' : '/customactivity/CustomActivity_sloggi?op=r'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '向左走？向右走？爱上你的选择！';
			mSelf.render('huodong/sloggi.html' , data);
		});
	},
	'kleenex' : function(){
		var php = {
				'users_apply' : '/welfare/welfare_activity_avatar?activity_id=287',
				'wl_info' : '/welfare/welfare_activity_head?activity_id=287',
				'wf_girl' : '/person/user_info?user_id=34143831'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.wl_info) return mSelf.errorPage();
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host;
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity' , 'welfare'];
			data.pageTitle = '舒洁湿厕纸 洁癖好老湿';
			mSelf.render('huodong/kleenex.html' , data);
		});
	},
	'aimeishangq2' : function(params){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '爱美赏Q2研究报告专题页面';
			if(params == '2'){
				mSelf.render('huodong/aimeishang/part2.html' , data);
			}else if(params == '3'){
				mSelf.render('huodong/aimeishang/part3.html' , data);
			}else{
				mSelf.render('huodong/aimeishang/part1.html' , data);
			}
		});
	},
	'btzdnwn' : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '美丽说《被偷走的那五年》专题页面';
			mSelf.render('huodong/btzdnwn.html' , data);
		});
	},
	'guimiyue' : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '闺蜜月来袭';
			mSelf.render('huodong/guimiyue.html' , data);
		});
	},
	'yuxi' : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '定制彩虹瓶  满足你量肤定制的愿望';
			mSelf.render('huodong/yuxi.html' , data);
		});
	},
	'nydiscount' : function(){
		var page = this.readData('page' ,this.res.__get ,0);
		var tag = this.readData('tag' ,this.res.__get ,0);
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '新年狂欢购 精彩过假期';
			data.tag = tag;
			mSelf.render('huodong/nyear_discount.html' , data);
		});
	},
	'esteelauder2':function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '雅诗兰黛ANR对抗臭氧，增强战斗力！';
			mSelf.render('huodong/esteelauder2.html' , data);
		});
	},
	'orbis':function(){
		var php = {
				'users_apply' : '/welfare/welfare_activity_avatar?activity_id=217', //207
				'wl_info' : '/welfare/welfare_activity_head?activity_id=217',
				'wf_girl' : '/person/user_info?user_id=34143831'
			};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.wl_info) return mSelf.errorPage();
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host;//sina share
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity' , 'welfare'];
			data.pageTitle = '剪掉彩妆，还原净妆style';
			mSelf.render('huodong/orbis.html' , data);
		});
	},
	'drawLots' : function(){
		var ua = this.req.headers['user-agent'].toLowerCase()
		if (ua.indexOf('iphone')>0 || ua.indexOf('android')>0 )
			return this.redirectTo('http://wap.meilishuo.com/wapSlight/show_spring_page', true)


		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '美丽说神准运势预测';
			mSelf.render('huodong/drawLots.html' , data);
		});
	},
	'silver' : function(){
		return this.errorPage()
		var php = {
			'oreal_activity' : '/media/oreal_activity',
			'oreal_userlist' : '/media/oreal_userlist'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/choujiang'];
			data.pageTitle = '欧莱雅肌底系列新登场';
			mSelf.render('huodong/choujiang.html' , data);
		});
	},
	'chunjie' : function(args){
		var php = {
			'hb_list' : '/huodong/Spring_hongbao_list',
			'hb_clist' : '/huodong/Spring_circle_list',
			'is_join' : '/huodong/Spring_check_join',
			'luck_girls' : '/huodong/Spring_user_list'
		}, mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.noBasecss = true;
			data._CSSLinks = ['spring'];
			data.pageTitle = '美丽说 春节活动！';
			if(args == 'inner') data.isinner = true;
			mSelf.render('huodong/spring.html' , data);
		});
	},
	'girlday' : function(){
		var group_id = '22897939';
		var page = this.readData('page' ,this.res.__get ,0);
		this.req.__get.group_id = group_id;
		this.req.__get.frame = 0;
		var php = {
			'totalNum' : '/group/group_poster_number'
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.groupId = group_id;
			data.pageTitle = '美丽说 美丽女生节';
			data._CSSLinks = ['huodong/dangdang'];
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 160;
			//分页是否有小花
			data.PGStyle_Flower = {};
			data.PGStyle_Flower = true;
			mSelf.render('huodong/girlday.html', data);
		})
	},
	'3years' : function(){
		var group_id = '23772223';
		var page = this.readData('page' ,this.res.__get ,0);
		this.req.__get.group_id = group_id;
		this.req.__get.frame = 0;
		var php = {
			'totalNum' : '/group/group_poster_number'
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.groupId = group_id;
			data.pageTitle = '美丽说三周年';
			data._CSSLinks = ['huodong/dangdang'];
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 160;
			//分页是否有小花
			data.PGStyle_Flower = {};
			data.PGStyle_Flower = true;
			mSelf.render('huodong/3years.html', data);
		})
	},
	'star' : function(){
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '兰蔻大明星的美睫计划 - 美丽说';
			mSelf.render('huodong/star.html', data);
		})
	},
	'music' : function(){
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '草莓音乐节 - 美丽说';
			data._CSSLinks = ['huodong/music'];
			mSelf.render('huodong/music.html', data);
		})
	},
	'lancome-vsn' : function(){
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '兰蔻高清精华 - 美丽说';
			mSelf.render('huodong/lancome-vsn.html', data);
		})
	},
	'macaron' : function(){
		var php = {
			'pink' : '/customactivity/CustomActivity_tuesday?color=pink&actName=macarons',
			'green' : '/customactivity/CustomActivity_tuesday?color=green&actName=macarons',
			'yellow' : '/customactivity/CustomActivity_tuesday?color=yellow&actName=macarons',
			'purple' : '/customactivity/CustomActivity_tuesday?color=purple&actName=macarons',
			'blue' : '/customactivity/CustomActivity_tuesday?color=blue&actName=macarons',
			'logo' : '/customactivity/CustomActivity_tuesday_img?actName=macarons'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '马卡龙色强势来袭 - 美丽说';
			data._CSSLinks = ['huodong/macaron'];
			//base.var_dump(data.pink, false, 5);
			//base.var_dump(data.logo, false, 5);
			mSelf.render('huodong/macaron.html', data);
		})
	},
	'heiren' : function(){
		var php = {

		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// if(!data.wl_info) return mSelf.errorPage();
			// data.user_list = data.wl_info.userInfo;
			// data.wl_header = data.wl_info.info;
			// data.wl_header.host = mSelf.req.headers.host;
			//true 宽屏
			// data.fluid = true;
			// data._CSSLinks = ['huodong/comm_activity' , 'welfare'];
			data.pageTitle = '黑人牙膏专研亮白';
			mSelf.render('huodong/heiren.html' , data);
		});
	},
	'baiduExtension' : function(){
		var php = {
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '圣诞游戏';
			data._CSSLinks = ['huodong/baiduExtension'];
			mSelf.render('huodong/baiduExtension.html' , data);
		});
	},
	'paopao' : function(){
		var php = {
			
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.topbanner = false;
			data.pageTitle = '天天爱消除';
			data._CSSLinks = ['huodong/paopao'];
			mSelf.render('huodong/paopao.html' , data);
		});
	},
	free_pc: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/free_pc'];
			data.pageTitle = 'Q萌泰迪 飞你莫属';
			this.render('huodong/free_pc.html', data);
		});
	}
}

exports.__create = controller.__create(huodong, controlFns);
