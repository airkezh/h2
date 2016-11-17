function exo(){
	return this;
}
var controlFns = {
	'test' :function(){
		this.res.end('xxx')
	},
	hot : function(){
		var mSelf = this;
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/exo/hot/')+'&bg='+encodeURIComponent('/activity/exo/hot/')+'&bg2='+encodeURIComponent('http://meilishuo.com/biz/huodong/exo/');
		var php = {
			"exo_img" : "/customactivity/CustomActivity_common_tool_single?id=exo_mob"
			//"shortURL" : "/url/shorturl?url="+encodeURIComponent(shareURL)
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//share
			var params = {
				'title' : {
					'weixin' : data.exo_img.weixin_tit,
					'weixin_timeline' : data.exo_img.weixin_tit,
					'default' : data.exo_img.qzone_tit
				},
				'text' : {
					'weixin' : data.exo_img.weixin_text,	
					'weixin_timeline' : data.exo_img.weixin_text,
					'default' : data.exo_img.qzone_text
				},
				'pic' : {
					'weixin' : data.exo_img.weixin_pic,	
					'weixin_timeline' : data.exo_img.weixin_pic,
					'default' : data.exo_img.qzone_pic
				},
				//'url' : (data.shortURL && data.shortURL.url) || shareURL
				'url' : shareURL
			};
			data.share = wapMod.shareTo(mSelf.req , params);
			data._CSSLinks = ["activity/exo"];
			mSelf.render("activity/exo.html" , data);
		});
	}
	,planet : function(){
		var mSelf = this;
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/exo/planet/')+'&bg='+encodeURIComponent('/activity/exo/planet/')+'&bg2='+encodeURIComponent('http://meilishuo.com/biz/huodong/exo/');
		var php = {
			'fuide':'/customactivity/CustomActivity_fuider_pc_special?cid=973',
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=exo_mob_planet',
			'user_info' : '/customactivity/CustomActivity_user_point_info?type=wap',
			'fighting_num' : '/customactivity/CustomActivity_exo_fighting_infomob?act=get',
			'join':'/customactivity/CustomActivity_exo_join_infomob?act=get',
			'group' : '/customactivity/CustomActivity_exo_group_listmob',
			'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL),
			'exchange_status' : '/customactivity/CustomActivity_user_point_goods_status?id=exo_mob_planet&cid=637'
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//share
			var params = {
				'title' : {
					'weixin' : data.pageData.weixin_tit,
					'weixin_timeline' : data.pageData.weixin_tit,
					'default' : data.pageData.qzone_tit
				},
				'text' : {
					'weixin' : data.pageData.weixin_text,
					'weixin_timeline' : data.pageData.weixin_text,
					'default' : data.pageData.qzone_text
				},
				'pic' : {
					'weixin' : data.pageData.weixin_pic,
					'weixin_timeline' : data.pageData.weixin_pic,
					'default' : data.pageData.qzone_pic
				},
				'url' : (data.shortURL && data.shortURL.url) || shareURL
				// 'url' : shareURL
			};
			data.has_fought = data.fighting_num && data.fighting_num.code != 0;
			data.has_joined = data.join && data.join.code != 0;
			data.share = wapMod.shareTo(mSelf.req , params);
			data.force_show = mSelf.req.__get.sshow;
			data._CSSLinks = ["activity/planet"];
			mSelf.render("activity/exo/planet.html" , data);
		});
	},
    ticket : function(user_id) {
        //this.debugSnake({target : 'devlab3'});
        var php = {
            'posters' : '/customactivity/CustomActivity_exo_user_poster_puzzle',
            "mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.isNewest = wapMod.isNewest(mSelf.req, '4.1.0');
            data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
            /*var params = data.cfg.share;
            params.text = 'EXO-M来了！美丽说EXO-M粉丝签名会7月28日即将在北京举行，快来下载美丽说APP抢门票吧！';
            params.title = '美丽说EXO-M签名会来了！~';
            params.url = "http://m.meilishuo.com/activity/exo/ticket/?fromShare";
            params.pic= {
                    'default' : "http://i.meilishuo.net/css/images/wap/activity/exo_ticket/s.jpg"
            }*/
            var t = '美丽说EXO-M签名会来了！~';
            var p = "http://i.meilishuo.net/css/images/wap/activity/exo_ticket/s.jpg";
            var sp = "http://i.meilishuo.net/css/images/wap/activity/exo_ticket/ss.jpg"
            var c = "EXO-M来了！美丽说EXO-M粉丝签名会7月28日即将在北京举行，快来下载美丽说APP抢门票吧！";
            var params = {
                'title' : {
                    'weixin' : t,
                    'weixin_timeline' : t,
                    'default' : t
                },
                'text' : {
                    'weixin' : c,
                    'weixin_timeline' : c,
                    'default' : c
                },
                'pic' : {
                    'weixin' : sp,
                    'weixin_timeline' : sp,
                    'default' : p
                },
                'url' : "http://m.meilishuo.com/activity/exo/ticket/?fromShare"
                // 'url' : shareURL
            };
            data.share = wapMod.shareTo(mSelf.req , params);
            data.rand = Math.min(parseInt(Math.random()*6),5);
            data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
            data.pageTitle = '美丽说EXO-M签名会';
            data._CSSLinks = ['activity/exo_ticket'];
            mSelf.render('activity/exo/ticket.html', data);
        });


    },
    'cart' : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=exo_cart'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.pageTitle = '美丽说EXO-M小卡';
			data.headTag = '美丽说EXO-M小卡';
			data._CSSLinks = ['activity/exo_cart'];
			mSelf.render('activity/exo/cart.html' , data);
		});
	},
	'userInfo' : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=exo_cart'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.pageTitle = '美丽说EXO-M小卡';
			data.headTag = '美丽说EXO-M小卡';
			data._CSSLinks = ['activity/exo_cart'];
			mSelf.render('activity/exo/userInfo.html' , data);
		});
	}
};
exports.__create = controller.__create(exo , controlFns); 
