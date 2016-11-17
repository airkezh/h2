function sale(){
	return this;
}
function isMagFavor(mSelf) {
	var modApp = base.loadModel('mls/application.js');
	var isNew = modApp.isNewUser(mSelf.req, mSelf.res);
	var browser = modApp.getBrowser(mSelf.req);
	var notSafari = !(browser.safari || browser.chrome);
	return isNew && notSafari;
}
var controlFns = {
	beautySale : function(){
		/*
		*  top_id : 头图后台cid
		*  beauty_id : 美妆频道特卖id
		*  sidebar_id : fix侧栏竖导航后台cid
		*  mz_id : 美妆热卖商品分类模块后台cid
		*/
		var top_id = this.readData('top_id', this.req.__get, 0) | 0;
		var sidebar_id = this.readData('sidebar_id', this.req.__get, 0) | 0;
		var mz_id = this.readData('mz_id', this.req.__get, 0) | 0;
		var beauty_id = this.readData('beauty_id', this.req.__get, 0); 
		var beautyId = beauty_id.toString().trim().split('_');
		var php = {
			'sale_tophead' : '/customactivity/CustomActivity_common_tool_singleNew?id=sale_tophead&cid='+top_id,
			'sale_sidebar' : '/customactivity/CustomActivity_common_tool_singleNew?id=sale_sidebar&cid='+sidebar_id,
			'beauty_sale_goods_section' : '/customactivity/CustomActivity_common_tool_singleNew?id=beauty_sale_goods_section&cid='+mz_id,
			'coupons': '/customactivity/CustomActivity_spring_carnival_coupon'
		};
		for(var i=0 ; i < beautyId.length ; i++){
			php['temai'+i] = '/promote/activity_item_list_v3?ac_id='+beautyId[i]	
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			return mSelf.errorPage();
			data.temai_arr = [];
			for(var i=0 ; i < beautyId.length ; i++){
				data.temai_arr.push(data['temai'+i]);
				delete data['temai'+i];	
			}	
			//去掉gotop
			data.hideGoTop = true;
			//hack 优惠券漂浮
			data.reg_feedback = false;
			//活动状态判断
			data.cur_time = new Date().getTime()/1000;
			data.start_time = Date.parse(data.sale_tophead.start_time)/1000;
			data.end_time = Date.parse(data.sale_tophead.end_time)/1000;
			if( data.cur_time < data.start_time ){
				data.status = 'nostart';
			}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
				data.status = 'saling';
			}else{ 
				data.status = 'end';    
			}
			data._CSSLinks = ['huodong/mz520'];
			data.pageTitle = data.sale_tophead.page_title;
			mSelf.render('biz/sale/beautySale520.html' , data);
		});
	},
	mz420 : function(){
		var php = {
			'temai1' : '/promote/activity_item_list_v3?ac_id=523',	
			'temai2' : '/promote/activity_item_list_v3?ac_id=525',	
			'temai3' : '/promote/activity_item_list_v3?ac_id=527',	
			'temai4' : '/promote/activity_item_list_v3?ac_id=529',
			'couponData' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=0&type=pc',
			'coupon_100' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=1&type=pc',
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=march_apparel&cid=769'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//去掉gotop
			data.welcome = true;
			//hack 优惠券漂浮
			data.reg_feedback = false;

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
			data._CSSLinks = ['huodong/sale420'];
			data.pageTitle = '421春夏最IN美妆';
			mSelf.render('biz/sale420/mz420_main.html' , data);
		});
	},
	act916:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});
		if (!name || !Number(name)) {
			name = 40689;
		}
		var word = this.readData('word',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		var nav_word = this.readData('word',this.req.__get, 40689);
		// if(!word && !name) return this.errorPage(); 
		this.req.__get.frame = 0;
		if (name)
			this.req.__get[isBrand ? 'word_name':'word'] = name;
		var mSelf = this;
		var php = {	
			'attr_top' : '/goods/Attribute_top_ten'		// 左侧人气排行		
			,'new_coupons' : '/customactivity/CustomActivity_common_promote_venue?type=pc'   //优惠券
			,'page_total' : '/goods/attribute_totalnum?frame=0&word_id='+ nav_word +'&word='+nav_word	//瀑布流
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//判断瀑布流接口
			if(!data.page_total){
				data.page_total = {"totalNum" : 500}
			}
			if(!data.attr_top){
				data.attr_top = {};
			}
			data.attr_title_keywords={
			    "word_name": "全部",
			    "word_id": "40689"
			}
			// 判断优惠券
			var picurl="http://i.meilishuo.net/css/images/biz/salePrice/";
			data.imgs = {
				2:picurl,
				3:picurl,
				4:picurl
			}
			if(!data.new_coupons){
				data.new_coupons = {};
			}
			data.key = data.new_coupons.key;
			data.coupons = data.new_coupons.coupon;
			if(!data.coupons){
                data.coupons = {
                    2 : {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}},
                    3 : {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}},
                    4 : {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}}
                }  
			}
			data.isMagFavor = magFavor;
			// true 宽屏 
			data.fluid = false;
			// 获取分页总数
			data.groupPg = {}; 
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.page_total.totalNum;
			data.groupPg.current_page = page; 
			data.word_name = name;
			// 获取榜单标识
			data.k = parseInt(mSelf.req.__get.k);		

			//倒计时
			var end_time = '2014/09/20 00:00:00';
			var start_time = '2014/09/16 00:00:00';
			data.cur_time = new Date();
			data.start_time = new Date(start_time);
			data.end_time = new Date(end_time);
			if( data.cur_time < data.start_time ){
				data.tips = "nostart";
				data.countdown_text = '距离衣橱升级还有';
				data.countdown_time = data.start_time;
			}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
				data.tips = "ing";
				data.countdown_text = '距离活动结束还有';
				data.countdown_time = data.end_time;
			}else{ 
				data.tips = "end";
				data.countdown_text = '活动已结束';
			}

			for(var i in data.coupons){
				var coupon = data.coupons[i];
				if(i > 1){
					switch (coupon.can_use){
						//可以使用
						case 0: 				
							if(!coupon.left_amount){  //数据为空，说明活动未开始
								data.imgs[i] += i+'10time.jpg';
							}else{
								data.imgs[i] += i+'ing.jpg';
								data.coupons[i].use = 'starting';
							}
						break;
						//已抢光
						case 1:
							var t=new Date(coupon.next.begin);
							var time=t.getHours();
							var nowH=new Date().getHours();
							if( nowH >= 22 && nowH < 24){
								data.imgs[i] += i+"tomorrow.jpg";
							}else{
								data.imgs[i] += i+time+"time.jpg";
							}
						break;
						// 已领过
						case 2:
							var d=new Date();
							if(d.getDate() < 16 ){
								data.imgs[i] += i+'again' + i +'.jpg';
							}else {
								data.imgs[i] += i+'active.jpg';
							};
						break;
						// 区别新老用户
						case -2:
							var d=new Date();
							if(d.getDate() < 16 ){
								data.imgs[i] += i+'again.jpg';
							}else {
								data.imgs[i] += i+'active.jpg';
							};
						break;
						// case 3:
						// 	data.imgs[i] += "otherno.jpg";
						// break;
					}
				}
			}

			data.reg_feedback = false;
			data.tplName = 'attr';
			data.isShow = true;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/act916'];
			data.pageTitle = '916 衣橱更新季';
			this.render('biz/huodong/act916.html' , data);
		});
	},
	pay916:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/pay916'];
			data.pageTitle = '916大促微信专享优惠';
			this.render('biz/huodong/pay916.html' , data);
		});
	},
	prepare:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare'];
			data.pageTitle = '双十一筹货汇报';
			this.render('biz/huodong/prepare.html' , data);
		});
	},
	prepare01:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare01'];
			data.pageTitle = '2014新款入冬必败大件';
			this.render('biz/huodong/prepare01.html' , data);
		});
	},
	prepare02:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare02'];
			data.pageTitle = '2014新款入冬必败优质打底';
			this.render('biz/huodong/prepare02.html' , data);
		});
	},
	prepare03:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare03'];
			data.pageTitle = '2014新款入冬必败韩国彩妆';
			this.render('biz/huodong/prepare03.html' , data);
		});
	},
	prepare04:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare04'];
			data.pageTitle = '2014新款入冬必败鞋子';
			this.render('biz/huodong/prepare04.html' , data);
		});
	},
	prepare05:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare05'];
			data.pageTitle = '2014新款入冬必败美裙';
			this.render('biz/huodong/prepare05.html' , data);
		});
	},
	prepare06:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare06'];
			data.pageTitle = '2014新款入冬必败日本COSME美妆';
			this.render('biz/huodong/prepare06.html' , data);
		});
	},
	prepare07:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare07'];
			data.pageTitle = '2014新款入冬必败包包';
			this.render('biz/huodong/prepare07.html' , data);
		});
	},
	prepare08:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare08'];
			data.pageTitle = '2014新款入冬必败下装';
			this.render('biz/huodong/prepare08.html' , data);
		});
	},
	prepare09:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare09'];
			data.pageTitle = '2014新款入冬必败洗护';
			this.render('biz/huodong/prepare09.html' , data);
		});
	},
	prepare10:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare10'];
			data.pageTitle = '2014新款入冬必败宅装备';
			this.render('biz/huodong/prepare10.html' , data);
		});
	},
	prepare11:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare11'];
			data.pageTitle = '2014新款入冬必败懒人套装';
			this.render('biz/huodong/prepare11.html' , data);
		});
	},
	prepare12:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/prepare12'];
			data.pageTitle = '2014新款入冬必败保暖小物';
			this.render('biz/huodong/prepare12.html' , data);
		});
	},
	act_list11:function(name,isBrand){
		var cid = this.readData('cid', this.req.__get, 0) | 0;
		var pid = this.readData('pid',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		var hdtrc = this.readData('hdtrc',this.req.__get, 0)|0;
		var mSelf = this;
		var php = {	
			'userInfo' : '/user/headinfo'
			,'act_config' : '/customactivity/CustomActivity_common_tool_singleNew?id=act_common'
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if( !data.poster0 ){
				data.poster0 = {}
			}
			if(!data.act_config){
				data.act_config = {}
			}
			// data.word_id
			data.isMagFavor = magFavor;
			// true 宽屏 
			data.fluid = false;
			// data.cid=cid;
			data.apparel_alert =false
			// 获取分页总数
			data.groupPg = {}; 
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page; 
			data.word_name = name;
			data.cate_list =data.act_config.cate_list
			data.reg_feedback = false;
			data.tplName = 'attr';
			// data.frm = '?frm=attr_regroup';
			data.isShow = true;
			data.pid = pid;
			data.cid = cid;
			data.area = mSelf.req.__get.area || 0;
			data.hdtrc = mSelf.req.__get.hdtrc;
			data.nHdtrc = data.hdtrc.split('_');
			data.reg = /\d+/;
			data.newHdtrc =  data.nHdtrc[1].replace(data.reg,'');
			data.newHdtrcT = data.nHdtrc[0] + "_" + data.newHdtrc;

			data.pageNum = page;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/act618'];
			data.pageTitle = data.act_config.title || '美丽说-活动专场';

			this.render('biz/huodong/act_list11.html' , data);
		});
	},
	act11:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});

		var mSelf = this;
		var php = {	
			'new_coupons' : '/customactivity/CustomActivity_coupon_venue?type=pc&name=encore_11'   //优惠券
			,'featured_area11' : '/customactivity/CustomActivity_common_featured_area?actid=19'	//精选会场
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// 判断优惠券
			var picurl="http://i.meilishuo.net/css/images/biz/salePrice/";
			data.imgs = {
				0:picurl,
				1:picurl,
				2:picurl
			}
			if(!data.new_coupons){
				data.new_coupons = {};
			}
			if( !data.featured_area11 ){
				var featured_area11 = {};
				featured_area11.code = 0;
				featured_area11.data = {};
			}
			data.coupons = data.new_coupons.coupon;
			if(!data.coupons){
                data.coupons = [
                    {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}},
                    {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}},
                    {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}}
                ]  
			}
			for(var i = 0;i < data.coupons.length;i++){
				data.couponType = data.coupons[i].threshold + ":" + data.coupons[i].credit + ":" + data.coupons[i].id;
				var coupon = data.coupons[i];
				switch (coupon.can_use){
					//可以使用
					case 0: 				
						if(!coupon.left_amount){  //数据为空，说明活动未开始
							data.imgs[ i ] += '8time_11.png';
						}else{
							data.imgs[ i ] += 'ing_11.png';
							data.coupons[i].use = 'starting';
						}
					break;
					//已抢光
					case 1:
						var t = new Date(coupon.next.begin);
						var time=t.getHours();
						var nowH=new Date().getHours();
						if( nowH >= 21 && nowH < 24){
							data.imgs[ i ] += "tomorrow_11.png";
						}else{
							data.imgs[ i ] += time + "time_11.png";
						}
					break;
					// 已领过
					case 2:
						var d=new Date();
						if(d.getDate() < 11 ){
							data.imgs[ i ] +='again_11.png';
						}else {
							data.imgs[ i ] +='active_11.png';
						};
					break;
				}
			}
			//倒计时
			var end_time = '2014/11/12 00:00:00';
			var start_time = '2014/11/11 00:00:00';
			data.cur_time = new Date(data.new_coupons.timestamp);
			data.start_time = new Date(start_time);
			data.end_time = new Date(end_time);
			if( data.cur_time < data.start_time ){
				data.tips = "nostart";
				data.countdown_text = '距离11.11还有';
				data.countdown_time = data.start_time;
			}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
				data.tips = "ing";
				data.countdown_text = '距离11.11结束还有';
				data.countdown_time = data.end_time;
			}else{ 
				data.tips = "end";
				data.countdown_text = '活动已结束';
			}
			data.reg_feedback = false;
			data.tplName = 'attr';
			data.isShow = true;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/act11'];
			data.pageTitle = '11.11女生专属版 败家嘉年华';
			this.render('biz/huodong/act11.html' , data);
		});
	},
	tips11:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/tips11'];
			data.pageTitle = '卖场人数太多排队中';
			this.render('biz/huodong/tips11.html' , data);
		});
	}

}
exports.__create = controller.__create(sale, controlFns);
